// src/repositories/memoryContactRepository.ts
//
// In-memory implementation of ContactRepository — plain array in RAM, same
// pattern as memoryUserRepository.ts. Submissions are lost on server
// restart; that's expected for the in-memory stage, not a bug to fix now.

import { randomUUID } from "crypto";
import type {
  ContactSubmission,
  NewContactSubmission,
  ContactRepository,
} from "./contactRepository.js";

// The in-memory "table". Never exported — only this repository touches it.
const submissions: ContactSubmission[] = [];

export const memoryContactRepository: ContactRepository = {
  async create(submission: NewContactSubmission) {
    const record: ContactSubmission = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...submission,
    };
    submissions.push(record);
    return record;
  },

  async findAll() {
    // Newest first, without mutating the underlying array.
    return [...submissions].reverse();
  },

  async findById(id) {
    const record = submissions.find((s) => s.id === id);
    return record ?? null;
  },
};
