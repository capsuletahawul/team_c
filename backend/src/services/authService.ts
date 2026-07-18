import bcrypt from 'bcrypt';
import { RegisterInput } from '../validation/authValidation';

// 🌟 ملاحظة: هنا بنستورد الإنترفيس اللي خويك (Person 1) بيسويه
// إذا لسه ما سوا الملف، اطلب منه يسوي الفولدر والملف ويكتب الإنترفيس بس عشان ما يطلع لك خط أحمر
import { userRepository } from '../repositories/userRepository';

export const authService = {
  /**
   * تسجيل مستخدم جديد وتعميد هويته أمنياً
   */
  async register(input: RegisterInput) {
    // 1. التحقق من عدم تكرار البريد الإلكتروني في النظام
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      return {
        success: false,
        error: 'البريد الإلكتروني مسجل مسبقاً في النظام / Email already registered'
      };
    }

    // 2. تشفير كلمة المرور بـ 10 جولات (Salt Rounds) لحمايتها سيبرانياً
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // 3. تجهيز كائن المستخدم النظيف لإرساله لقاعدة البيانات/الموك
    const newUser = await userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword, // نرسل الهاش المشفر فقط
      role: input.role
    });

    // 4. إرجاع النتيجة بنجاح بدون إرسال الباسورد للواجهة
    return {
      success: true,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    };
  }
};