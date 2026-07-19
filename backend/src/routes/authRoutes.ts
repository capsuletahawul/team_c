// src/routes/authRoutes.ts
//
// Maps URL + method -> controller function. Nothing else lives here
// (Handbook Section 04.3 — Routes must never contain logic).
//
// This is the architecture scaffold: the router is created and exported so
// server.ts has something real to mount. Endpoint definitions
// (router.post('/register', ...), router.post('/login', ...)) belong to
// whoever builds authController.ts / authValidation.ts — add them here.

import { Router } from "express";

const router = Router();

// router.post("/register", authLimiter, authController.register);
// router.post("/login", authLimiter, authController.login);

export default router;