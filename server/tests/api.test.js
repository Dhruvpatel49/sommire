import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { User } from '../src/models/user.model.js';
import { PdfSummary } from '../src/models/pdfSummary.model.js';

let mongoServer;

describe('Sommaire Express API Tests', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connectDB(uri);
  });

  after(async () => {
    await disconnectDB();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  describe('Health Endpoint', () => {
    it('GET /api/health should return status 200 and healthy message', async () => {
      const res = await request(app).get('/api/health');
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.status, 'healthy');
    });
  });

  describe('Authentication Flow', () => {
    let authCookie = '';
    const testUser = {
      fullName: 'Demo User',
      email: 'demo@example.com',
      password: 'StrongPassword123!',
    };

    it('POST /api/auth/register should register a user and set HTTP-only cookie', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.user.email, testUser.email);
      assert.equal(res.body.data.user.fullName, testUser.fullName);
      assert.ok(res.body.data.token);

      // Verify HTTP-only cookie
      const cookies = res.headers['set-cookie'];
      assert.ok(cookies);
      assert.match(cookies[0], /token=/);
      assert.match(cookies[0], /HttpOnly/i);

      authCookie = cookies[0];
    });

    it('POST /api/auth/register should reject duplicate email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
      assert.match(res.body.message, /already exists/i);
    });

    it('POST /api/auth/login should authenticate user with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.user.email, testUser.email);
    });

    it('POST /api/auth/login should reject invalid password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword!',
        });

      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });

    it('GET /api/auth/me should return current user when authenticated with cookie', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Cookie', authCookie);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.user.email, testUser.email);
    });

    it('GET /api/auth/me should reject unauthenticated request', async () => {
      const res = await request(app).get('/api/auth/me');
      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
  });

  describe('Summaries API & Ownership Protection', () => {
    let user1Cookie = '';
    let user2Cookie = '';
    let user1SummaryId = '';

    before(async () => {
      // Register user 1
      const res1 = await request(app).post('/api/auth/register').send({
        fullName: 'User One',
        email: 'user1@example.com',
        password: 'Password123!',
      });
      user1Cookie = res1.headers['set-cookie'][0];

      // Register user 2
      const res2 = await request(app).post('/api/auth/register').send({
        fullName: 'User Two',
        email: 'user2@example.com',
        password: 'Password123!',
      });
      user2Cookie = res2.headers['set-cookie'][0];
    });

    it('POST /api/summaries/store should store a summary for the authenticated user', async () => {
      const res = await request(app)
        .post('/api/summaries/store')
        .set('Cookie', user1Cookie)
        .send({
          fileUrl: 'https://res.cloudinary.com/demo/sample.pdf',
          summary: '# 📄 Test Summary\n\n. 🌟 First point\n. 📌 Second point',
          title: 'Sample PDF Document',
          fileName: 'sample.pdf',
        });

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.ok(res.body.data.id);
      user1SummaryId = res.body.data.id;
    });

    it('GET /api/summaries should return user 1 summaries', async () => {
      const res = await request(app)
        .get('/api/summaries')
        .set('Cookie', user1Cookie);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.length, 1);
      assert.equal(res.body.data[0].id, user1SummaryId);
    });

    it('GET /api/summaries for user 2 should NOT see user 1 summaries', async () => {
      const res = await request(app)
        .get('/api/summaries')
        .set('Cookie', user2Cookie);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.length, 0);
    });

    it('GET /api/summaries/:id should allow user 1 to view their own summary', async () => {
      const res = await request(app)
        .get(`/api/summaries/${user1SummaryId}`)
        .set('Cookie', user1Cookie);

      assert.equal(res.status, 200);
      assert.equal(res.body.data.id, user1SummaryId);
    });

    it('GET /api/summaries/:id should FORBID user 2 from viewing user 1 summary', async () => {
      const res = await request(app)
        .get(`/api/summaries/${user1SummaryId}`)
        .set('Cookie', user2Cookie);

      assert.equal(res.status, 403);
      assert.equal(res.body.success, false);
    });

    it('DELETE /api/summaries/:id should FORBID user 2 from deleting user 1 summary', async () => {
      const res = await request(app)
        .delete(`/api/summaries/${user1SummaryId}`)
        .set('Cookie', user2Cookie);

      assert.equal(res.status, 403);
    });

    it('DELETE /api/summaries/:id should allow user 1 to delete their summary', async () => {
      const res = await request(app)
        .delete(`/api/summaries/${user1SummaryId}`)
        .set('Cookie', user1Cookie);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);

      // Verify it is gone
      const checkRes = await request(app)
        .get(`/api/summaries/${user1SummaryId}`)
        .set('Cookie', user1Cookie);
      assert.equal(checkRes.status, 404);
    });
  });

  describe('Payments & Plans', () => {
    it('GET /api/payments/plans should return plan list with Free, Basic, Pro', async () => {
      const res = await request(app).get('/api/payments/plans');
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.length, 3);
      assert.equal(res.body.data[0].id, 'free');
    });

    it('GET /api/payments/status should report payment integration status', async () => {
      const res = await request(app).get('/api/payments/status');
      assert.equal(res.status, 200);
      assert.ok(res.body.data.message);
    });
  });
});
