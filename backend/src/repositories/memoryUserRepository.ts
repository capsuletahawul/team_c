import { randomUUID } from 'crypto';
import type { User, CreateUserInput, IUserRepository } from './userRepository.ts';

// مصفوفة في الذاكرة تلعب دور قاعدة البيانات مؤقتاً
const users: User[] = [];

export const memoryUserRepository: IUserRepository = {
  async findByEmail(email) {
    return users.find((user) => user.email === email);
  },

  async findById(id) {
    return users.find((user) => user.id === id);
  },

  async create(data) {
    const newUser: User = {
      id: randomUUID(),
      ...data
    };
    users.push(newUser);
    return newUser;
  },

  async updateName(id, name) {
    const user = users.find((u) => u.id === id);
    if (user) user.name = name;
    return user;
  }
};
