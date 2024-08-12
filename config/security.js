import authenticationJWT from '../middlewares/authentication.js';

// Routes that bypass authentication
const openRoutes = ['/users/signup', '/users/login'];

// Function to check if a route is open
const isRouteOpen = (path) => openRoutes.includes(path);

// Middleware to apply authentication only to protected routes
const securityFilter = (req, res, next) => {
    if (isRouteOpen(req.path)) {
        // If route is open, bypass auth
        return next();
    }
    // Otherwise, apply auth middleware
    return authenticationJWT(req, res, next);
};

// Apply security filter to all routes
export default securityFilter;


