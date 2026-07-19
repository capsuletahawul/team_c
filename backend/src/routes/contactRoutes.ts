// src/routes/contactRoutes.ts
//
// Maps URL + method -> controller function. Nothing else lives here.

import { Router } from "express";
import { contactController } from "../controllers/contactController.js";

const router = Router();

router.post("/", contactController.submitContact);

export default router;