# 📄 **Sommaire** – AI-Powered PDF Summarizer (MERN Stack) 🤖📚

**Sommaire** transforms long PDF documents into clean, structured, viral-style summaries with emoji key highlights, section-by-section reels, and an interactive reading deck.

Built as a modern, production-ready **MERN stack** application (MongoDB, Express, React, Node.js) with Google Gemini AI, LangChain, Cloudinary, and custom JWT authentication.

---

## 🏗️ Architecture & Technology Stack

### **Frontend (`client/`)**
- **React.js 18** with **Vite** build tooling
- **React Router DOM v6** (client-side routing, protected routes)
- **Tailwind CSS** (responsive layouts, custom animations like `animate-gradient-x`)
- **Shadcn UI** components (`Button`, `Card`, `Badge`, `Dialog`, `Input`, `Sonner`)
- **Lucide React** icons
- **Axios** with credentials and unified response interceptor
- **React Context API** (`AuthContext`) for global authentication state
- **Zod** for client-side file and form validation
- **Sonner** for toast notifications

### **Backend (`server/`)**
- **Node.js** & **Express.js** (MVC architecture, ES modules)
- **MongoDB** & **Mongoose** (User, PdfSummary, and Payment schemas)
- **JWT Authentication** stored in secure **HTTP-only cookies**
- **bcrypt.js** for one-way password hashing (with pre-save salt and comparison hooks)
- **Cloudinary** for secure PDF file storage
- **Google Gemini API** (`@google/genai`) with emoji-rich structured prompting
- **pdf-parse** & **LangChain** for reliable PDF text extraction
- **Multer** memory storage for file validation and stream processing
- **Centralized Error Handling** (`ApiError`, `errorHandler`)
- **Input Validation** using **Zod** middleware

---

## 📂 Project Structure

```text
sommaire/
├── client/                     # React + Vite Frontend
│   ├── public/                 # Static assets (file-logo.svg, etc.)
│   ├── src/
│   │   ├── api/                # Axios API clients (auth, summaries, payments)
│   │   ├── components/
│   │   │   ├── common/         # BgGradient, Header, Footer, NavLink
│   │   │   ├── home/           # HeroSection, DemoSection, HowItWorks, Pricing, CTA
│   │   │   ├── summaries/      # SummaryViewer, ContentSection, ProgressBar, etc.
│   │   │   ├── ui/             # Button, Card, Badge, Dialog, Input, Sonner
│   │   │   └── upload/         # UploadForm, UploadFormInput, UploadHeader
│   │   ├── context/            # AuthContext (login, register, logout, me)
│   │   ├── pages/              # Home, SignIn, SignUp, Dashboard, Upload, SummaryDetail
│   │   ├── utils/              # parseSection, parsePoint, formatFileName, cn
│   │   ├── App.jsx             # Routes & route protection
│   │   ├── index.css           # Tailwind base & custom styles
│   │   └── main.jsx            # Entry point
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # MongoDB, Cloudinary, Gemini connections
│   │   ├── controllers/        # auth, user, summary, payment controllers
│   │   ├── middleware/         # auth, upload, validator, error middleware
│   │   ├── models/             # Mongoose schemas: User, PdfSummary, Payment
│   │   ├── routes/             # REST endpoints (/auth, /users, /summaries, /payments)
│   │   ├── services/           # auth, pdf, gemini, cloudinary services
│   │   ├── utils/              # ApiResponse, ApiError, formatUtils, prompts
│   │   ├── validators/         # Zod schemas (auth, summary)
│   │   ├── app.js              # Express app setup, CORS, Helmet, routes
│   │   └── server.js           # Server bootstrap & port listener
│   ├── tests/                  # Integration & unit tests with in-memory MongoDB
│   ├── .env.example
│   └── package.json
│
├── package.json                # Root package orchestrator
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB** (local MongoDB instance or MongoDB Atlas cluster URI)
- **Cloudinary Account** (cloud name, API key, API secret)
- **Google Gemini API Key** (from Google AI Studio)

### 2. Environment Variables Setup

#### Backend (`server/.env`):
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
Fill in your credentials:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/sommaire
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

#### Frontend (`client/.env`):
Copy `client/.env.example` to `client/.env`:
```bash
cp client/.env.example client/.env
```
```env
VITE_API_BASE_URL=/api
```

---

## 🏃 Running the Application

### Install Dependencies:
From the root directory:
```bash
npm run install:all
```
*(or run `npm install` in root, `npm install --legacy-peer-deps` in `server`, and `npm install` in `client`)*

### Start Both Client & Server Concurrently:
```bash
npm run dev
```
- **Frontend** runs at: `http://localhost:5173`
- **Backend API** runs at: `http://localhost:5000`

### Individual Commands:
- `npm run dev:server` - Starts Express server with nodemon
- `npm run dev:client` - Starts Vite dev server
- `npm run test` - Runs backend tests
- `npm run build` - Builds production bundle of React frontend

---

## 🧪 Testing

The backend includes an automated test suite powered by Node's native test runner, `supertest`, and `mongodb-memory-server` (requiring no external database setup to test):

```bash
npm run test
```
**Test coverage includes:**
- Server health check (`GET /api/health`)
- User registration, password hashing, duplicate prevention
- User login with credentials validation
- JWT generation and HTTP-only cookie setting
- Authenticated user retrieval (`GET /api/auth/me`)
- Summary creation and retrieval
- Cross-user isolation (verifying users cannot view or delete other users' summaries)
- Payment plans and integration status reporting

---

## 💳 Payment Integration Architecture

The application contains pre-configured pricing tiers (`Free`, `Basic`, `Pro`) with full backend support:
- A dedicated Mongoose `Payment` model and controller (`GET /api/payments/plans`, `GET /api/payments/status`).
- Ready for one-click Stripe webhook integration and checkout session endpoints.

---

## 🔒 Security Best Practices

- **Zero Plain-Text Passwords**: Passwords hashed with `bcryptjs` and 10 salt rounds.
- **HTTP-Only Cookies**: JWT authentication tokens are protected against XSS attacks.
- **CORS Protection**: Whitelisted origin with credentials support.
- **Strict Authorization**: All summary access and deletions verify ownership (`summary.userId === req.user._id`).
- **File Validation**: MIME-type and size limitations (max 20MB, PDF only).
- **No Client Secrets**: Cloudinary secret and Gemini API keys remain strictly on the backend.
