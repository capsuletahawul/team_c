import { Request, Response, NextFunction } from 'express';

// خطأ مخصص يحمل كود الحالة (status code) المناسب له، يُستخدم عبر الخدمات/الكونترولرز
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

// يُستدعى لما ما فيه أي Route يطابق الطلب — لازم يكون آخر شي قبل errorHandler في server.ts
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    error: `المسار غير موجود / Route not found: ${req.method} ${req.originalUrl}`
  });
}

// معالج الأخطاء المركزي — لازم يكون آخر middleware مسجل في server.ts (4 معاملات إلزامية عشان إكسبرس يتعرف عليه كـ error handler)
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : 'خطأ داخلي في الخادم / Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message
  });
}
