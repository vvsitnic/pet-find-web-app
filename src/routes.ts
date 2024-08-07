/**
 * An array of routes that are accessibleto the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/application/pets-nearby',
  '/application/pets-on-map',
];

/**
 * An array of dynamic routes that are accessibleto the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicDynamicRoutes = ['/application/pet'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/signup', '/auth/error'];

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
export const DEFAULT_REDIRECT = '/application/settings';
