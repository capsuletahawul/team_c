import { Request, Response } from 'express';
import { registerSchema } from '../validation/authValidation';
import { authService } from '../services/authService';

export const authController = {
  /**
   * معالجة طلب تسجيل حساب جديد
   */
  async register(req: Request, res: Response) {
    try {
      // 1. التحقق من صحة البيانات القادمة من الواجهة باستخدام Zod
      const validationResult = registerSchema.safeParse(req.body);
      
      // إذا الفحص فشل، نرسل فوراً 400 Bad Request مع تفاصيل الخطأ (ممنوع نرسل 200)
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          error: 'خطأ في التحقق من البيانات / Validation Error',
          details: validationResult.error.flatten().fieldErrors
        });
      }

      // 2. تمرير البيانات المفحوصة والجاهزة إلى طبقة الـ Service
      const result = await authService.register(validationResult.data);

      // 3. إذا كان الإيميل مكرر أو فشل اللوجيك، نرسل 400 Bad Request
      if (!result.success) {
        return res.status(400).json(result);
      }

      // 4. في حالة النجاح التام، نرسل 201 Created صريحة حسب معايير الكتيب
      return res.status(201).json(result);

    } catch (err: unknown) {
      // حماية السيرفر في حال حدوث خطأ غير متوقع وإرسال 500
      const errorMessage = err instanceof Error ? err.message : 'Server Error';
      return res.status(500).json({
        success: false,
        error: `خطأ داخلي في الخادم: ${errorMessage}`
      });
    }
  }
};