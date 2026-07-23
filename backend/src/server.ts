// src/server.ts
//
// This is the only file that knows the app is "starting up." Its job is
// narrow: create the Express app, apply global middleware, mount every
// router under its base path, and start listening. No business logic,
// no route handlers, no data access — those belong to their own layers.

import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// ---------------------------------------------------------------------
// Global middleware
// ---------------------------------------------------------------------


// CORS: allow only the configured frontend origin — never a wildcard when
// credentials (auth tokens) are involved (Handbook Section 12.3).
// 1. Enable CORS for your Vite frontend URL
app.use(cors({
  origin: "http://localhost:5173", // Allows your React app to talk to Express
  credentials: true,
}));

// 2. Parse JSON body payload
app.use(express.json());

// 3. Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

app.listen(5000, () => {
  console.log("Server listening on http://localhost:5000");
});

// ---------------------------------------------------------------------
// Health check — required by the Postman test table (Handbook Section 11)
// ---------------------------------------------------------------------
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// ---------------------------------------------------------------------
// Route registration — every feature area mounts under its own base path
// ---------------------------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// ---------------------------------------------------------------------
// 404 handler — anything that reached here matched no route above
// ---------------------------------------------------------------------
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "not_found" });
});

// ---------------------------------------------------------------------
// Centralized error handler — must be registered LAST, with 4 params,
// for Express to recognize it as an error handler.
// ---------------------------------------------------------------------
const errorHandler: express.ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, error: "internal_server_error" });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});