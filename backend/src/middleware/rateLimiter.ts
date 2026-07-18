import rateLimit from 'express-rate-limit';

// يحدد عدد محاولات الدخول/التسجيل المسموحة لكل IP خلال 15 دقيقة (Handbook Section 07.7)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 10, // 10 محاولات لكل IP خلال هذه النافذة
  message: { success: false, error: 'too_many_attempts' }
});

// حد عام أخف لباقي نقاط النهاية (API) لحمايتها من إساءة الاستخدام
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'too_many_requests' }
});
