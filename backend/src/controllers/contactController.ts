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
  async submitContactForm(req: Request, res: Response) {
    try {
      const validation = contactSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          details: validation.error.flatten().fieldErrors
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: validation.data
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Server Error';
      return res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }
};