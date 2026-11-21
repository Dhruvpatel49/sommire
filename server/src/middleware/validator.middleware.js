import { ApiError } from '../utils/apiError.js';

export const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return next(new ApiError(400, 'Validation Error', errorMessages));
    }
    req.validatedBody = result.data;
    next();
  } catch (error) {
    next(error);
  }
};
