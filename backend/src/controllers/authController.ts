import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../validation/authValidation.js';
import { authService } from '../services/authService.js';

export const authController = {
  /**
   * معالجة طلب تسجيل حساب جديد
   */
  async register(req: Request, res: Response) {
    try {
      const validationResult = registerSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          error: 'خطأ في التحقق من البيانات / Validation Error',
          details: validationResult.error.flatten().fieldErrors
        });
      }

      const result = await authService.register(validationResult.data);

      if (!result.success) {
        return res.status(400).json(result);
      }

      return res.status(201).json(result);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Server Error';
      return res.status(500).json({
        success: false,
        error: `خطأ داخلي في الخادم: ${errorMessage}`
      });
    }
  },

  /**
   * معالجة طلب تسجيل الدخول
   */
  async login(req: Request, res: Response) {
    try {
      const validationResult = loginSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          error: 'خطأ في التحقق من البيانات / Validation Error',
          details: validationResult.error.flatten().fieldErrors
        });
      }

      const result = await authService.login(validationResult.data);

      if (!result.success) {
        return res.status(401).json(result);
      }

      return res.status(200).json(result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Server Error';
      return res.status(500).json({
        success: false,
        error: `خطأ داخلي في الخادم: ${errorMessage}`
      });
    }
  },

  /**
   * جلب بيانات المستخدم الحالي (Protected Endpoint)
   */
  async me(req: Request, res: Response) {
    try {
      return res.status(200).json({
        success: true,
        user: (req as any).user || null
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Server Error';
      return res.status(500).json({
        success: false,
        error: `خطأ داخلي في الخادم: ${errorMessage}`
      });
    }
  }
};