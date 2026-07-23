export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'Student' | 'Trainer' | 'Company' | 'Admin';
}

export type CreateUserInput = Omit<User, 'id'>;

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: CreateUserInput): Promise<User>;
  updateName(id: string, name: string): Promise<User | undefined>;
}

export { memoryUserRepository as userRepository } from './memoryUserRepository.js';
