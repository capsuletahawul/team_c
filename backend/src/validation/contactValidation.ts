import { z } from 'zod';

// سكيما فحص بيانات نموذج التواصل
export const contactSchema = z.object({
  fullName: z.string()
    .min(3, { message: 'الاسم يجب أن لا يقل عن 3 حروف / Name must be at least 3 characters' }),

  email: z.string()
    .email({ message: 'صيغة البريد الإلكتروني غير صحيحة / Invalid email format' }),

  phone: z.string()
    .min(8, { message: 'رقم الجوال غير صحيح / Invalid phone number' }),

  message: z.string()
    .min(10, { message: 'الرسالة يجب أن لا تقل عن 10 أحرف / Message must be at least 10 characters' })
});

// تايب مستنتج تلقائياً لتسهيل استخدامه في الكونترولر والخدمات
export type ContactInput = z.infer<typeof contactSchema>;
