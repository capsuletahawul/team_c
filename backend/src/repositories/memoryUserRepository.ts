import { randomUUID } from 'crypto';
import type { User, CreateUserInput, IUserRepository } from './userRepository.ts';

// مصفوفة في الذاكرة تلعب دور قاعدة البيانات مؤقتاً
const users: User[] = [];

export const memoryUserRepository: IUserRepository = {
  async findByEmail(email) {
    return users.find((user) => user.email === email);
  },

  async create(data) {
    const newUser: User = {
      id: randomUUID(),
      ...data
    };
    users.push(newUser);
    return newUser;
  }
};
