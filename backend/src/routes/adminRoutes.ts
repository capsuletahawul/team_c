// src/routes/adminRoutes.ts
//
// Maps URL + method -> controller function. All routes here require a
// valid JWT belonging to an Admin account (requireAuth + requireRole).

import { Router } from "express";
import { adminController } from "../controllers/adminController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth, requireRole("Admin"));

router.get("/courses", adminController.getCourses);
router.put("/courses/:id/approve", adminController.approveCourse);
router.put("/courses/:id/reject", adminController.rejectCourse);

export default router;
