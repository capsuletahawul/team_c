import { Request, Response } from "express";

import { updateStudentProfileSchema } from "../validation/studentValidation.js";
import { userRepository } from "../repositories/userRepository.js";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";

export const studentController = {
  /**
   * Purchased Courses (no enrollment system yet — returns an empty list,
   * same pattern used by trainerController.getStudentsProgress)
   */
  async getPurchasedCourses(_req: Request, res: Response) {
    return res.status(200).json([]);
  },

  /**
   * Update Profile
   */
  async updateProfile(req: Request, res: Response) {
    try {
      const validation = updateStudentProfileSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: validation.error.flatten().fieldErrors,
        });
      }

      const authUser = (req as AuthenticatedRequest).user!;
      const { fullName, avatar } = validation.data;

      const updated = await userRepository.updateProfile(authUser.userId, {
        name: fullName,
        avatar,
      });

      if (!updated) {
        return res.status(404).json({ success: false, error: "user_not_found" });
      }

      return res.status(200).json({
        success: true,
        data: {
          id: updated.id,
          fullName: updated.name,
          email: updated.email,
          role: updated.role,
          avatar: updated.avatar,
          joinedAt: updated.createdAt,
          completedCourses: 0,
          activeCourses: 0,
          companyAffiliation: "",
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "internal_server_error" });
    }
  },
};
