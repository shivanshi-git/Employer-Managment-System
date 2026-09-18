import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import employeesRouter from "./routes/employeeRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import payslipRouter from "./routes/payslipsRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import requestLogger from "./middleware/requestLogger.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express()
const PORT = process.env.PORT || 4000;

// ── Security Middleware ──────────────────────────────────────
// Helmet sets secure HTTP headers (XSS, clickjacking, etc.)
app.use(helmet())

// Global rate limiter — 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,   // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
})
app.use(globalLimiter)

// ── Core Middleware ──────────────────────────────────────────
app.use(cors())
app.use(express.json())
app.use(multer().none())

// Structured JSON request logger
app.use(requestLogger)

// ── Routes ───────────────────────────────────────────────────
app.get("/", (req, res)=> res.send("Server is running"));

// Health check endpoint — used by Docker, load balancers, and monitoring tools
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" }[dbState] || "unknown";

  res.status(dbState === 1 ? 200 : 503).json({
    status: dbState === 1 ? "ok" : "degraded",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    db: dbStatus,
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  });
});
app.use("/api/auth", authRouter)
app.use("/api/employees", employeesRouter)
app.use("/api/profile", profileRouter)
app.use("/api/attendance", attendanceRouter)
app.use("/api/leave", leaveRouter)
app.use("/api/payslips", payslipRouter)
app.use("/api/dashboard", dashboardRouter)

app.use("/api/inngest", serve({ client: inngest, functions }));

await connectDB()
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))