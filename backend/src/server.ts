// src/server.ts

import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// ---------------------------------------------------------------------
// Global middleware
// ---------------------------------------------------------------------

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use((req, _res, next) => {
  console.log(req.method, req.url);
  next();
});
// ---------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// ---------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// ---------------------------------------------------------------------
// 404 handler
// ---------------------------------------------------------------------
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "not_found",
  });
});

// ---------------------------------------------------------------------
// Error handler
// ---------------------------------------------------------------------

const errorHandler: express.ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  console.error(err);

  res.status(500).json({
    success: false,
    error: "internal_server_error",
  });
};

app.use(errorHandler);

// ---------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------
console.log("=== SERVER STARTED ===");
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});