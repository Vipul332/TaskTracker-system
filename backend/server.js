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

// Connect to MongoDB
connectDB();

// ==========================
// 🔐 SECURITY MIDDLEWARE
// ==========================
app.use(helmet());

// ==========================
// 🌐 CORS FIX (FINAL VERSION)
// ==========================
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman / curl
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.some((allowedOrigin) =>
          origin === allowedOrigin ||
          origin.startsWith(allowedOrigin)
        ) ||
        origin.startsWith("http://localhost");

      if (isAllowed) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(null, false);
    },
    credentials: true,
  })
);

// ==========================
// 🧠 BODY PARSERS
// ==========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================
// 📝 LOGGING
// ==========================
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ==========================
// 🚦 RATE LIMITING
// ==========================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// ==========================
// ❤️ HEALTH CHECK ROUTE
// ==========================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
  });
});

// ==========================
// 📌 API ROUTES
// ==========================
app.use('/api/tasks', taskRoutes);

// ==========================
// ❌ ERROR HANDLERS
// ==========================
app.use(notFound);
app.use(errorHandler);

// ==========================
// 🚀 START SERVER
// ==========================
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});

// ==========================
// ⚠️ GRACEFUL SHUTDOWN
// ==========================
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});