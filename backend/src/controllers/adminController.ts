import { Request, Response } from "express";

import { trainerRepository, TrainerCourse } from "../repositories/trainerRepository.js";
import { userRepository } from "../repositories/userRepository.js";

// يحول حالة الدورة الداخلية إلى حالة الموافقة اللي تفهمها صفحة الأدمن
function toApprovalStatus(status: TrainerCourse["status"]): "pending" | "approved" | "rejected" {
  if (status === "rejected") return "rejected";
  if (status === "coming_soon") return "pending";
  return "approved"; // available / pending_deletion — كورس سبق اعتماده
}

export const adminController = {
  /**
   * List all courses across every trainer, for approval review
   */
  async getCourses(_req: Request, res: Response) {
    try {
      const courses = await trainerRepository.listAllCourses();

      const enriched = await Promise.all(
        courses.map(async (course) => {
          const trainer = await userRepository.findById(course.trainerId);
          return {
            id: course.id,
            title: course.title,
            trainer: trainer?.name || "",
            category: course.category,
            durationVal: course.durationWeeks,
            status: toApprovalStatus(course.status),
          };
        })
      );

      return res.status(200).json({ success: true, data: { courses: enriched } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "internal_server_error" });
    }
  },

  /**
   * Approve a pending course
   */
  async approveCourse(req: Request, res: Response) {
    try {
      const courseId = Number(req.params.id);
      const course = await trainerRepository.approveCourse(courseId);

      if (!course) {
        return res.status(404).json({ success: false, error: "course_not_found" });
      }

      return res.status(200).json({ success: true, course });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "internal_server_error" });
    }
  },

  /**
   * Reject a pending course
   */
  async rejectCourse(req: Request, res: Response) {
    try {
      const courseId = Number(req.params.id);
      const course = await trainerRepository.rejectCourse(courseId);

      if (!course) {
        return res.status(404).json({ success: false, error: "course_not_found" });
      }

      return res.status(200).json({ success: true, course });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "internal_server_error" });
    }
  },
};
