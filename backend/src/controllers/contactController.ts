// src/controllers/contactController.ts
import { Request, Response } from 'express';
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  subject: z.string().min(3, { message: 'Subject is required' }),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' })
});

export const contactController = {
 async submitContact(req: Request, res: Response) {
    try {
      // TODO: Connect to contact service / database logic
      return res.status(200).json({
        success: true,
        message: 'تم استلام رسالتك بنجاح / Message received successfully'
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