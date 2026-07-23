// src/routes/studentRoutes.ts
//
// Maps URL + method -> controller function. All routes here require a
// valid JWT belonging to a Student account (requireAuth + requireRole).

import { Router } from "express";
import { studentController } from "../controllers/studentController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth, requireRole("Student"));

router.get("/courses/purchased", studentController.getPurchasedCourses);
router.put("/profile/update", studentController.updateProfile);

export default router;
