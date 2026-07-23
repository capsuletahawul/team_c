
import { z } from 'zod';

// سكيما فحص بيانات التسجيل حسب شروط الكتيب
export const registerSchema = z.object({
  name: z.string()
    .min(3, { message: 'الاسم يجب أن لا يقل عن 3 حروف / Name must be at least 3 characters' }),
  
  email: z.string()
    .email({ message: 'صيغة البريد الإلكتروني غير صحيحة / Invalid email format' }),
  
  password: z.string()
    .min(8, { message: 'كلمة المرور يجب أن لا تقل عن 8 خانات / Password must be at least 8 characters' }),
    
  role: z.enum(['Student', 'Trainer', 'Company'], {
    error: () => 'يجب اختيار رتبة صحيحة / Role must be Student, Trainer, or Company'
  })
});

// تايب مستنتج تلقائياً لتسهيل استخدامه في الكونترولر والخدمات
export type RegisterInput = z.infer<typeof registerSchema>;