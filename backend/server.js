import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================
// DB CONNECTION
// ==========================
connectDB();

// ==========================
// SECURITY
// ==========================
app.use(helmet());

// ==========================
// 🔥 SIMPLE & RELIABLE CORS FIX
// ==========================
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman / server-to-server
      if (!origin) return callback(null, true);

      // Normalize origin (REMOVE trailing slash issue)
      const normalizedOrigin = origin.replace(/\/$/, "");

      const isAllowed = allowedOrigins.some((allowed) =>
        normalizedOrigin === allowed ||
        normalizedOrigin.startsWith(allowed)
      );

      if (isAllowed) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// ==========================
// BODY PARSER
// ==========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================
// LOGGING
// ==========================
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ==========================
// RATE LIMITING
// ==========================
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
  })
);

// ==========================
// HEALTH CHECK
// ==========================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
  });
});

// ==========================
// ROUTES
// ==========================
app.use('/api/tasks', taskRoutes);

// ==========================
// ERROR HANDLERS
// ==========================
app.use(notFound);
app.use(errorHandler);

// ==========================
// START SERVER
// ==========================
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});

// ==========================
// GLOBAL ERROR HANDLING
// ==========================
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});