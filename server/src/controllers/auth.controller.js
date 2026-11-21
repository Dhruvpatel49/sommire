import { ApiResponse } from '../utils/apiResponse.js';
import {
  registerUser,
  loginUser,
  setAuthCookie,
  clearAuthCookie,
} from '../services/auth.service.js';

export async function register(req, res, next) {
  try {
    const { fullName, email, password } = req.body;
    const { user, token } = await registerUser({ fullName, email, password });

    setAuthCookie(res, token);

    return ApiResponse.created(
      res,
      { user, token },
      'Registration successful'
    );
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });

    setAuthCookie(res, token);

    return ApiResponse.success(
      res,
      { user, token },
      'Login successful'
    );
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    clearAuthCookie(res);
    return ApiResponse.success(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    return ApiResponse.success(
      res,
      { user: req.user },
      'Current user retrieved'
    );
  } catch (error) {
    next(error);
  }
}
