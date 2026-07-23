import { z } from "zod";

// =========================
// Create Course Validation
// =========================

export const createCourseSchema = z.object({
  title: z.string().trim().min(3, {
    message: "عنوان الدورة يجب أن لا يقل عن 3 أحرف / Course title must be at least 3 characters",
  }),

  category: z.enum(
    ["Cybersecurity", "Software Engineering", "Artificial Intelligence", "Cloud Computing"],
    {
      error: () => "يجب اختيار تصنيف صحيح / A valid category must be selected",
    }
  ),

  level: z.enum(["beginner", "intermediate", "advanced"], {
    error: () => "يجب اختيار مستوى صحيح / A valid level must be selected",
  }),

  price: z.coerce.number().positive({
    message: "السعر يجب أن يكون رقماً موجباً / Price must be a positive number",
  }),

  durationWeeks: z.coerce.number().int().positive({
    message: "مدة الدورة غير صحيحة / Invalid course duration",
  }),

  maxStudents: z.coerce.number().int().positive({
    message: "الحد الأقصى للطلاب غير صحيح / Invalid max students value",
  }),

  videoDurationMinutes: z.coerce.number().int().positive({
    message: "مدة الفيديو غير صحيحة / Invalid video duration",
  }),

  description: z.string().trim().min(10, {
    message: "الوصف يجب أن لا يقل عن 10 أحرف / Description must be at least 10 characters",
  }),

  requirementsNotes: z.string().trim().min(20, {
    message: "المتطلبات يجب أن لا تقل عن 20 حرفاً / Requirements must be at least 20 characters",
  }),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;

// =========================
// Update Profile Validation
// =========================

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(2, {
    message: "الاسم يجب أن لا يقل عن حرفين / Name must be at least 2 characters",
  }).optional(),

  specialization: z.string().trim().max(120, {
    message: "التخصص طويل جداً / Specialization is too long",
  }).optional(),

  bio: z.string().trim().max(1000, {
    message: "النبذة طويلة جداً / Bio is too long",
  }).optional(),

  experienceVal: z.coerce.number().min(0, {
    message: "سنوات الخبرة غير صحيحة / Invalid experience value",
  }).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
