// src/repositories/memoryUserRepository.ts
//
// Week 3 implementation of UserRepository (Handbook Section 05.3).
// Data lives as a plain array in this process's RAM: it exists while the
// server is running and is wiped on every restart (nodemon reload, Railway
// redeploy, laptop sleep). That's expected behavior this week, not a bug —
// see Handbook Section 05.3 / FAQ.
//
// This file must implement UserRepository exactly as defined in
// userRepository.ts. In Week 4, prismaUserRepository.ts will implement the
// same interface against PostgreSQL, and services/authService.ts won't need
// to change at all.

import { randomUUID } from "crypto";
import type { User, NewUser, UserRepository } from "./userRepository.js";

// The in-memory "table". Never exported — this is the ONE place in the
// codebase allowed to touch it directly.
const users: User[] = [];

export const memoryUserRepository: UserRepository = {
  async findByEmail(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    return user ?? null;
  },

  async findById(id) {
    const user = users.find((u) => u.id === id);
    return user ?? null;
  },

  async emailExists(email) {
    const normalizedEmail = email.toLowerCase().trim();
    return users.some((u) => u.email.toLowerCase() === normalizedEmail);
  },

  async create(newUser: NewUser) {
    const user: User = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...newUser,
    };
    users.push(user);
    return user;
  },
};