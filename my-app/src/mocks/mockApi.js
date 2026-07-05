/**
 * Capsule Tahawul Mock API Layer
 * Location: src/mocks/mockApi.js
 * 
 * This file simulates a backend database and server processing environment.
 * Every response strictly adheres to the mandated bootcamp envelope format.
 */

// Helper utility to simulate server network latency
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// ============================================================================
// SIMULATED IN-MEMORY DATABASE (State persists while browser tab is open)
// ============================================================================

let mockCourses = [
  { id: 15, title: "React Bootcamp Deep Dive", category: "Web Development", price: 250, duration: "32 Hours", rating: 4.8, status: "available", students: 1240, thumbnail: "react-bootcamp.jpg", prerequisites: ["HTML", "CSS", "JavaScript"] },
  { id: 16, title: "AI & Machine Learning Fundamentals", category: "Artificial Intelligence", price: 0, duration: "12 Hours", rating: 4.9, status: "available", students: 850, thumbnail: "ai-funds.jpg", prerequisites: ["Basic Python"] },
  { id: 17, title: "Cybersecurity Next-Gen Defense", category: "Cybersecurity", price: 499, duration: "40 Hours", rating: 0, status: "coming_soon", students: 0, thumbnail: "cyber.jpg", prerequisites: ["Basic Networking"] },
  { id: 18, title: "Cloud Native Infrastructure", category: "Cloud Computing", price: 199, duration: "24 Hours", rating: 4.5, status: "completed", students: 430, thumbnail: "cloud.jpg", prerequisites: ["Linux Basics"] }
];

let mockUser = {
  id: 18,
  fullName: "Alex Mercer",
  email: "alex.mercer@corporate.com",
  role: "Student",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  joinedAt: "2026-01-12",
  completedCourses: 1,
  activeCourses: 2,
  companyAffiliation: "ABC Technologies"
};

let mockEnrollments = [
  { courseId: 15, progress: 45, status: "In Progress" },
  { id: 16, progress: 100, status: "Completed" }
];

let mockNotifications = [
  { notificationId: 55, title: "Workspace Verified", message: "Your corporate onboarding validation is active! Explore your dashboard.", type: "Account", isRead: false, createdAt: "2026-07-03T14:00:00Z" }
];

let mockSupportTickets = [];
let mockB2BRequests = [];
let mockCourseDrafts = [];

// ============================================================================
// MODULE 1: AUTHENTICATION APIs (Feature 3)
// ============================================================================

export async function registerStudent(payload) {
  await delay(800);
  
  if (!payload.fullName || !payload.email || !payload.password || !payload.confirmPassword) {
    return {
      success: false,
      error: "validation_error",
      details: { global: "All required form fields must be populated before registration confirmation." }
    };
  }

  if (payload.fullName.length < 3) {
    return {
      success: false,
      error: "validation_error",
      details: { fullName: "Full name must be at least 3 characters long." }
    };
  }

  if (payload.password !== payload.confirmPassword) {
    return {
      success: false,
      error: "validation_error",
      details: { confirmPassword: "Passwords do not match." }
    };
  }

  return {
    success: true,
    message: "Student account created successfully.",
    data: { id: Math.floor(Math.random() * 1000), role: "Student", email: payload.email }
  };
}

export async function loginUser(payload) {
  await delay(600);

  if (!payload.email || !payload.password) {
    return {
      success: false,
      error: "validation_error",
      details: { auth: "Email and password fields are both required." }
    };
  }

  // Simulating successful auth log for presentation flow
  return {
    success: true,
    message: "Login successful.",
    data: { token: "MOCK_JWT_TOKEN_2026", userId: mockUser.id, role: mockUser.role, name: mockUser.fullName }
  };
}

// ============================================================================
// MODULE 2: PLATFORM OVERVIEW APIs (Feature 18)
// ============================================================================

export async function getPlatformOverview() {
  await delay(400);
  return {
    success: true,
    data: {
      platformName: "Capsule Tahawul",
      studentTrack: { title: "Learn & Accelerate", description: "Access free and premium engineering tracks with modular roadmaps." },
      trainerTrack: { title: "Monetize Expertise", description: "Author curriculum pipelines, check enrollment trajectory analytics, and earn structural payouts." },
      companyTrack: { title: "Upskill Your Workforce", description: "Orchestrate continuous corporate ecosystems via trackable bootcamps and custom hackathons." }
    }
  };
}

// ============================================================================
// MODULE 3: COURSE CATALOG APIs (Feature 1, Feature 2)
// ============================================================================

export async function getCourses(filters = {}) {
  await delay(500);
  let filtered = [...mockCourses];

  if (filters.category) {
    filtered = filtered.filter(c => c.category.toLowerCase() === filters.category.toLowerCase());
  }
  if (filters.search) {
    filtered = filtered.filter(c => c.title.toLowerCase().includes(filters.search.toLowerCase()));
  }

  return {
    success: true,
    data: { page: 1, totalPages: 1, courses: filtered }
  };
}

export async function getCourseDetails(courseId) {
  await delay(400);
  const course = mockCourses.find(c => c.id === parseInt(courseId));
  
  if (!course) {
    return {
      success: false,
      error: "course_not_found",
      details: { courseId: "The requested course key does not exist on the index." }
    };
  }

  return { success: true, data: course };
}

// ============================================================================
// MODULE 4: STUDENT DASHBOARD & PROFILE (Feature 4, Feature 6)
// ============================================================================

export async function getStudentProfile() {
  await delay(300);
  return { success: true, data: mockUser };
}

export async function updateStudentProfile(payload) {
  await delay(700);
  if (!payload.fullName || payload.fullName.length < 3) {
    return {
      success: false,
      error: "validation_error",
      details: { fullName: "Profile name update must contain at least 3 characters." }
    };
  }

  mockUser.fullName = payload.fullName;
  if (payload.avatar) mockUser.avatar = payload.avatar;

  return {
    success: true,
    message: "Profile updated successfully.",
    data: mockUser
  };
}

export async function getPurchasedCourses() {
  await delay(400);
  const trackingData = mockEnrollments.map(enrollment => {
    const original = mockCourses.find(c => c.id === enrollment.courseId) || {};
    return { ...original, ...enrollment };
  });
  return { success: true, data: trackingData };
}

export async function enrollInCourse(courseId) {
  await delay(600);
  const id = parseInt(courseId);
  
  if (mockEnrollments.some(e => e.courseId === id)) {
    return {
      success: false,
      error: "duplicate_enrollment",
      details: { courseId: "You are already actively enrolled inside this curriculum sequence." }
    };
  }

  mockEnrollments.push({ courseId: id, progress: 0, status: "In Progress" });
  return { success: true, message: "Enrollment tracking initialized on dashboard view successfully." };
}

// ============================================================================
// MODULE 5: LEARNING CONTENT & RESOURCES (Feature 7, Feature 8, Feature 9)
// ============================================================================

export async function getCourseModules(courseId) {
  await delay(400);
  return {
    success: true,
    data: [
      { moduleId: 301, title: "Module 1: Foundational Paradigm Layouts", status: "Completed", videoUrl: "https://stream.mock.io/v/301.mp4" },
      { moduleId: 302, title: "Module 2: Structural State Hooks Architecture", status: "Unlocked", videoUrl: "https://stream.mock.io/v/302.mp4", attachments: [{ fileName: "architecture-cheatsheet.pdf", downloadUrl: "#" }] },
      { moduleId: 303, title: "Module 3: Asynchronous Network Integrations", status: "Locked" }
    ]
  };
}

export async function submitQuiz(quizId, payload) {
  await delay(500);
  if (!payload.answers || payload.answers.length === 0) {
    return {
      success: false,
      error: "incomplete_answers",
      details: { quiz: "All interactive parameters must be populated before metric confirmation calculation." }
    };
  }

  return {
    success: true,
    data: { scoreTally: 100, passed: true, totalQuestions: payload.answers.length }
  };
}

// ============================================================================
// MODULE 6: COMMUNICATIONS & SUPPORT (Feature 10, Mandatory Contact Form Check)
// ============================================================================

export async function submitContactForm(data) {
  await delay(800);
  
  if (!data.name || data.name.length < 3) {
    return { success: false, error: "validation_error", details: { name: "Name must be at least 3 characters." } };
  }
  if (!data.email.includes("@")) {
    return { success: false, error: "validation_error", details: { email: "Provide a clean valid email syntax structure." } };
  }
  if (!data.phone || !data.phone.startsWith("05") || data.phone.length !== 10) {
    return {
      success: false,
      error: "validation_error",
      details: { phone: "Must start with 05 and contain exactly 10 programmatic digits." }
    };
  }
  if (!data.message || data.message.length < 20 || data.message.length > 500) {
    return { success: false, error: "validation_error", details: { message: "Message block must range between 20 and 500 parameters." } };
  }

  return { success: true, message: "Your message was received." };
}

export async function sendChatbotMessage(msgInput) {
  await delay(400);
  if (!msgInput) return { success: false, error: "empty_query", details: { chat: "Inquiry text cannot be empty." } };
  
  return {
    success: true,
    data: { replyBubble: "To review upcoming course guidelines or track parameters, navigate directly to your Course Catalogue module viewport." }
  };
}

// ============================================================================
// MODULE 7: WORKSPACE CREATORS & PARTNERS (Feature 11, 12, 13, 14, 15)
// ============================================================================

export async function submitTrainerApplication(payload) {
  await delay(700);
  if (!payload.linkedin || !payload.linkedin.startsWith("http")) {
    return { success: false, error: "validation_failed", details: { linkedin: "A valid working external link path is required." } };
  }
  return { success: true, message: "Application successfully submitted. Current state flagged as Pending Verification." };
}

export async function getTrainerAnalytics() {
  await delay(500);
  return {
    success: true,
    data: {
      totalPayoutCollected: 14250,
      activeEnrolledStudentsCount: 340,
      trajectoryGraphData: [
        { month: "May", enrollments: 110, earnings: 4500 },
        { month: "June", enrollments: 230, earnings: 9750 }
      ]
    }
  };
}

export async function submitB2BRequest(payload) {
  await delay(800);
  if (!payload.requirementsNotes || payload.requirementsNotes.length < 20) {
    return {
      success: false,
      error: "submission_error",
      details: { requirementsNotes: "Custom specification records must be at least 20 parameters long." }
    };
  }

  const ticketId = Math.floor(Math.random() * 9000) + 1000;
  mockB2BRequests.push({ ticketId, ...payload, status: "Pending Review" });
  
  return {
    success: true,
    message: "Organization-bound service ticket generated successfully.",
    data: { ticketId, status: "Pending Review" }
  };
}

// ============================================================================
// MODULE 8: SYSTEM NOTIFICATIONS & GLOBAL OPERATION CONTROL (Feature 16, 17)
// ============================================================================

export async function getNotifications() {
  await delay(300);
  return { success: true, data: mockNotifications };
}

export async function getAdminDashboardMetrics() {
  await delay(500);
  return {
    success: true,
    data: {
      activeUserLoginsToday: 1420,
      pendingReportFlagsCount: 3,
      serverResourceDistribution: "optimal",
      publishedCoursesCount: mockCourses.length
    }
  };
}
