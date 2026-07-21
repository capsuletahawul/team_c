import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterInput, LoginInput } from '../validation/authValidation.js';
import { userRepository } from '../repositories/userRepository.js';
import type { User } from '../repositories/userRepository.js';

// نفس السر المستخدم في authMiddleware للتحقق من التوكن — لازم يكون متطابق
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';

function signToken(user: User): string {
  return jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
  );
}

function toPublicUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

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

    // 4. إصدار توكن حقيقي فوراً حتى يكون المستخدم "مسجل دخول" مباشرة بعد التسجيل
    const token = signToken(newUser);

    return {
      success: true,
      token,
      user: toPublicUser(newUser)
    };
  },

  /**
   * التحقق من هوية المستخدم عند تسجيل الدخول وإصدار توكن حقيقي
   */
  async login(input: LoginInput) {
    // 1. البحث عن المستخدم عبر البريد الإلكتروني
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      return {
        success: false,
        error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة / Invalid email or password'
      };
    }

    // 2. مقارنة كلمة المرور المُدخلة بالهاش المخزّن
    const passwordMatches = await bcrypt.compare(input.password, user.password);
    if (!passwordMatches) {
      return {
        success: false,
        error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة / Invalid email or password'
      };
    }

    // 3. إصدار توكن حقيقي بعد التحقق الناجح
    const token = signToken(user);

    return {
      success: true,
      token,
      user: toPublicUser(user)
    };
  }
};