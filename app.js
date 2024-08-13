
import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
import cors from 'cors';
// import { body, validationResult } from 'express-validator';
// import passport from 'passport';
// import csrf from 'csurf';
// import session from 'express-session';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from "morgan";

import usersRouter from './routes/users.js';
import securityFilter from './config/security.js';


// Get the __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the security filter for all routes before defining them
app.use(securityFilter);

// Now define the routes
app.use('/users', usersRouter);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Apply security and logging middlewares
app.use(helmet()); // Protect against well-known vulnerabilities
app.use(cors()); // Enable CORS for all routes

// Enable HTTP request logging
app.use(morgan('dev')); // 'dev' provides concise output colored by response status

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;
