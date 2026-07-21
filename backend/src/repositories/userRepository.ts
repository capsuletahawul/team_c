export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'Student' | 'Trainer' | 'Company';
}

export type CreateUserInput = Omit<User, 'id'>;

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserInput): Promise<User>;
}

export { memoryUserRepository as userRepository } from './memoryUserRepository.js';
