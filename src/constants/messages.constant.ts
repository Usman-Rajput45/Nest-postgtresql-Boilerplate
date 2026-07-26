export const MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'Login successful',
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_ALREADY_EXISTS: 'An account with this email already exists',
    UNAUTHORIZED: 'Authentication required',
    INVALID_TOKEN: 'Invalid or expired token',
  },
  USER: {
    PROFILE_RETRIEVED: 'Profile retrieved successfully',
    NOT_FOUND: 'User not found',
  },
  HEALTH: {
    OK: 'Service is healthy',
  },
  VALIDATION: {
    FAILED: 'Validation failed',
  },
  GENERIC: {
    INTERNAL_ERROR: 'An unexpected error occurred',
  },
} as const;
