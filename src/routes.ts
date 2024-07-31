/**
 * An array of routes that are accessibleto the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/application/pets-nearby',
  '/application/pets-on-map',
  '/application/post-pet',
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/signup'];

/**
 * The prefix for api auth routes
 * Routes that start with this prefix are used for auth purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_REDIRECT = '/settings';
