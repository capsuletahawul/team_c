import { randomUUID } from 'crypto';
import type { User, CreateUserInput, IUserRepository } from './userRepository.ts';

// مصفوفة في الذاكرة تلعب دور قاعدة البيانات مؤقتاً
const users: User[] = [];

export const memoryUserRepository: IUserRepository = {
  async findByEmail(email) {
    // تعديل: دعم جلب حساب الأدمن الثابت مباشرة في حال تم البحث عنه بالبريد المحدد
    if (email === "capsuletahawul@gmail.com") {
      return {
        id: "admin-static-id",
        name: "Administrator",
        email: "capsuletahawul@gmail.com",
        password: "", // تم التحقق منه مسبقاً في الـ service/controller
        role: "Admin",
        avatar: "",
        createdAt: new Date().toISOString(),
      };
    }
    // نهاية تعديل حساب الأدمن الثابت

    return users.find((user) => user.email === email);
  },

  async findById(id) {
    // تعديل: دعم جلب حساب الأدمن الثابت في حال تم البحث عنه بالـ ID الخاص به
    if (id === "admin-static-id") {
      return {
        id: "admin-static-id",
        name: "Administrator",
        email: "capsuletahawul@gmail.com",
        password: "",
        role: "Admin",
        avatar: "",
        createdAt: new Date().toISOString(),
      };
    }
    // نهاية تعديل حساب الأدمن الثابت

    return users.find((user) => user.id === id);
  },

  async create(data) {
    const newUser: User = {
      id: randomUUID(),
      avatar: '',
      createdAt: new Date().toISOString(),
      ...data
    };
    users.push(newUser);
    return newUser;
  },

  async updateName(id, name) {
    const user = users.find((u) => u.id === id);
    if (user) user.name = name;
    return user;
  },

  async updateProfile(id, updates) {
    const user = users.find((u) => u.id === id);
    if (!user) return undefined;
    if (updates.name !== undefined) user.name = updates.name;
    if (updates.avatar !== undefined) user.avatar = updates.avatar;
    return user;
  }
};