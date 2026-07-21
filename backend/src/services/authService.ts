import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  RegisterInput,
  LoginInput,
} from "../validation/authValidation.js";

import { userRepository } from "../repositories/userRepository.js";

export const authService = {
  /**
   * Register
   */
  async register(input: RegisterInput) {
    const existingUser = await userRepository.findByEmail(input.email);

    if (existingUser) {
      return {
        success: false,
        error: "Email already registered",
      };
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newUser = await userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET || "fallback-secret-key",
      {
        expiresIn: "7d",
      }
    );

    return {
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  },

  /**
   * Login
   */
  async login(input: LoginInput) {
    // تعديل: التحقق من حساب الأدمن الثابت في الخدمة أيضاً لضمان إصدار التوكن الصحيح والصلاحيات
    if (
      input.email === "capsuletahawul@gmail.com" &&
      input.password === "Admin@5011"
    ) {
      const adminToken = jwt.sign(
        {
          userId: "admin-static-id",
          email: "capsuletahawul@gmail.com",
          role: "admin",
        },
        process.env.JWT_SECRET || "fallback-secret-key",
        {
          expiresIn: "7d",
        }
      );

      return {
        success: true,
        token: adminToken,
        user: {
          id: "admin-static-id",
          name: "Administrator",
          email: "capsuletahawul@gmail.com",
          role: "admin",
        },
      };
    }
    // نهاية تعديل حساب الأدمن الثابت

    const user = await userRepository.findByEmail(input.email);

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const passwordMatch = await bcrypt.compare(
      input.password,
      user.password
    );

    if (!passwordMatch) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "fallback-secret-key",
      {
        expiresIn: "7d",
      }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};