import { Request, Response } from "express";

import {
  registerSchema,
  loginSchema,
} from "../validation/authValidation.js";

import { authService } from "../services/authService.js";

export const authController = {
  /**
   * Register
   */
  async register(req: Request, res: Response) {
    try {
      const validation = registerSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: validation.error.flatten().fieldErrors,
        });
      }

      const result = await authService.register(validation.data);

      if (!result.success) {
        return res.status(400).json(result);
      }

      return res.status(201).json(result);
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  /**
   * Login
   */
  async login(req: Request, res: Response) {
    try {
      const validation = loginSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: validation.error.flatten().fieldErrors,
        });
      }

      const result = await authService.login(validation.data);

      if (!result.success) {
        return res.status(401).json(result);
      }

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  /**
   * Current User
   */
  async me(req: Request, res: Response) {
    try {
      return res.status(200).json({
        success: true,
        user: (req as any).user,
      });
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
};