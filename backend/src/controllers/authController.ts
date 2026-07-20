// src/controllers/authController.ts
import { Request, Response } from 'express';
import { registerSchema } from '../validation/authValidation';
import { authService } from '../services/authService';

export const authController = {
  /**
   * معالجة طلب تسجيل حساب جديد (مهمتك الأصلية - Person 2)
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
      return res.status(500).json({ success: false, error: `Internal Server Error: ${errorMessage}` });
    }
  },

  /**
   * معالجة طلب تسجيل الدخول (هيكل مؤقت لـ Person 3)
   */
  async login(req: Request, res: Response) {
    try {
      // TODO: خويك (Person 3) بيكمل اللوجيك هنا بـ bcrypt.compare ويولد الـ JWT Token
      return res.status(200).json({
        success: true,
        message: 'تم استقبال طلب تسجيل الدخول بنجاح / Login route skeleton working',
        token: 'mock-jwt-token-placeholder'
      });
    } catch (err: unknown) {
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  },

  /**
   * جلب بيانات المستخدم الحالي عبر التوكن (هيكل مؤقت لـ Person 3)
   */
  async me(req: Request, res: Response) {
    try {
      // TODO: خويك بيفك التوكن هنا ويجيب بيانات الحساب الحالية من الـ MemoryRepository
      return res.status(200).json({
        success: true,
        user: {
          id: 'mock-id',
          name: 'mohamed ahmed',
          role: 'Student'
        }
      });
    } catch (err: unknown) {
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
};