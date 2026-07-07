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
// NEW STATIC DATA FOR INTEGRATION (Course Details, Trainer Details, Contact)
// ============================================================================

export const courseHeroData = {
  en: {
    category: 'Advanced Tech & Artificial Intelligence',
    title: 'Full-Stack Generative AI & Digital Transformation Bootcamp',
    subtitle: 'Master building scalable AI applications, fine-tuning LLMs, and leading enterprise-level digital transformations using cutting-edge modern frameworks.',
    rating: '4.9 (1,240 global reviews)',
    meta: { updated: 'Last updated 06/2026', level: 'Intermediate to Advanced', language: 'Arabic / English' }
  },
  ar: {
    category: 'التقنيات المتقدمة والذكاء الاصطناعي',
    title: 'معسكر مطور الذكاء الاصطناعي التوليدي المتكامل والتحول الرقمي',
    subtitle: 'أتقن بناء تطبيقات الذكاء الاصطناعي القابلة للتوسع، وضبط النماذج اللغوية الكبيرة (LLMs)، وقيادة التحول الرقمي للشركات باستخدام أحدث الإطارات التقنية.',
    rating: '4.9 (1,240 تقييم عالمي)',
    meta: { updated: 'آخر تحديث 06/2026', level: 'متوسط إلى متقدم', language: 'العربية / الإنجليزية' }
  }
};

export const curriculumData = {
  en: {
    title: 'Bootcamp Curriculum',
    subtitle: 'Explore the structured operational roadmap designed to take you from foundational engineering to high-tier enterprise architecture.',
    expandAll: 'Expand All', collapseAll: 'Collapse All', lessons: 'Lessons',
    modules: [
      {
        id: 1, week: 'Week 1 - 2', title: 'Deep-Dive Into LLM Architectures & Foundations', duration: '20 Hours',
        topics: [
          { type: 'video', name: 'Introduction to Transformers & Attention Mechanisms', duration: '45 mins' },
          { type: 'code', name: 'Hands-on: Building Tokenizers from Scratch', duration: '2 hours' },
          { type: 'doc', name: 'Reading: Corporate AI Compliance & Open-Source vs Proprietary', duration: '15 mins' }
        ]
      },
      {
        id: 2, week: 'Week 3 - 5', title: 'Advanced Production-Grade RAG Systems', duration: '35 Hours',
        topics: [
          { type: 'video', name: 'Vector Databases, Embeddings, & Chunking Tactical Strategies', duration: '60 mins' },
          { type: 'code', name: 'Lab: Hybrid Search Pipelines (Dense + Sparse Retrieval)', duration: '4 hours' },
          { type: 'code', name: 'Project: Implementing Re-ranking & Query Expansion', duration: '6 hours' }
        ]
      },
      {
        id: 3, week: 'Week 6 - 8', title: 'Multi-Agent Systems & Autonomous Pipelines', duration: '40 Hours',
        topics: [
          { type: 'video', name: 'Orchestration Frameworks: LangGraph, AutoGen, & CrewAI', duration: '90 mins' },
          { type: 'code', name: 'Lab: Memory Management & State Control in Long-Running Agents', duration: '5 hours' },
          { type: 'code', name: 'Capstone: Enterprise Multi-Agent Deployment via Docker', duration: '12 hours' }
        ]
      }
    ]
  },
  ar: {
    title: 'المنهج وخطة المعسكر المتقدمة',
    subtitle: 'استكشف خارطة الطريق الهيكلية والعملية المصممة لنقلك من الأساسيات البرمجية إلى هندسة الأنظمة الضخمة للشركات.',
    expandAll: 'توسيع الكل', collapseAll: 'إغلاق الكل', lessons: 'دروس',
    modules: [
      {
        id: 1, week: 'الأسبوع 1 - 2', title: 'الغوص العميق في بنيات النماذج اللغوية الكبيرة (LLMs)', duration: '20 ساعة',
        topics: [
          { type: 'video', name: 'مقدمة في نماذج الـ Transformers وآليات الانتباه (Attention)', duration: '45 دقيقة' },
          { type: 'code', name: 'تطبيق عملي: بناء الـ Tokenizers البرمجية من الصفر', duration: 'ساعتين' },
          { type: 'doc', name: 'قراءة موجهة: حوكمة الذكاء الاصطناعي والمفتوح مقابل المغلق', duration: '15 دقيقة' }
        ]
      },
      {
        id: 2, week: 'الأسبوع 3 - 5', title: 'أنظمة استرجاع المعلومات المعززة بالتوليد (RAG) للإنتاج الحقيقي', duration: '35 ساعة',
        topics: [
          { type: 'video', name: 'قواعد البيانات المتجهة (Vector DBs) واستراتيجيات تقسيم النصوص', duration: '60 دقيقة' },
          { type: 'code', name: 'معمل عملي: بناء خطوط البحث الهجين (Hybrid Search Pipelines)', duration: '4 ساعات' },
          { type: 'code', name: 'مشروع: تنفيذ أنظمة إعادة الترتيب (Re-ranking) وتوسيع الاستعلام', duration: '6 ساعات' }
        ]
      },
      {
        id: 3, week: 'الأسبوع 6 - 8', title: 'الأنظمة متعددة الوكلاء (Multi-Agent Systems) والتدفقات المستقلة', duration: '40 ساعة',
        topics: [
          { type: 'video', name: 'إطارات الإدارة والربط: LangGraph، AutoGen، و CrewAI', duration: '90 دقيقة' },
          { type: 'code', name: 'معمل: إدارة الذاكرة والتحكم في الحالات (State Control) للوكلاء البرمجيين', duration: '5 ساعات' },
          { type: 'مشروع التخرج: نشر وكلاء الذكاء الاصطناعي للشركات عبر Docker', duration: '12 ساعة' }
        ]
      }
    ]
  }
};

export const instructorData = {
  en: {
    sectionTitle: 'Meet Your Instructor', name: 'Dr. Rayan Al-Qahtani', role: 'Chief AI Architect & Digital Transformation Advisor',
    bio: 'With over 15 years of industry experience, Dr. Rayan has directed core enterprise AI system deployments across elite cloud technology hubs in Silicon Valley and Saudi Arabia.',
    stats: { rating: '4.9 Instructor Rating', students: '18,500+ Students', courses: '7 Deep-Tech Bootcamps' },
    skills: ['LLMOps Architecture', 'Fine-Tuning Expert', 'Cloud Security', 'Corporate Strategy']
  },
  ar: {
    sectionTitle: 'تعرّف على موجّه المعسكر', name: 'د. ريان القحطاني', role: 'كبير مهندسي الذكاء الاصطناعي ومستشار التحول الرقمي',
    bio: 'على مدى أكثر من 15 عاماً من الخبرة العملية، قاد الدكتور ريان مشاريع كبرى لنشر أنظمة الذكاء الاصطناعي في نخبة من مراكز الحوسبة السحابية في وادي السيليكون والمملكة العربية السعودية.',
    stats: { rating: '4.9 تقييم المدرب', students: '+18,500 طالب وطالبة', courses: '7 معسكرات تقنية عميقة' },
    skills: ['هندسة الـ LLMOps', 'ضبط النماذج الرقمية', 'أمن الحوسبة السحابية', 'الاستراتيجية الرقمية']
  }
};

export const overviewData = {
  en: {
    title: 'What You Will Master',
    description: 'This elite bootcamp bridges advanced software architecture with generative artificial intelligence, providing hands-on pipelines to upgrade your technical engineering capabilities completely.',
    outcomes: [
      'Architect and deploy end-to-end cloud-native Generative AI applications.',
      'Fine-tune open-source Large Language Models (LLMs) on private enterprise datasets.',
      'Build advanced Retrieval-Augmented Generation (RAG) knowledge intelligence architectures.',
      'Implement multi-agent autonomous workflows using modern AI orchestration tools.',
      'Optimize AI training pipelines for maximum performance and cost efficiency.',
      'Lead tactical enterprise digital transformations with safe corporate AI compliance.'
    ]
  },
  ar: {
    title: 'ما الذي ستتقنه في هذا المعسكر',
    description: 'يجمع هذا المعسكر النخبي بين هندسة البرمجيات المتقدمة والذكاء الاصطناعي التوليدي، مما يوفر لك خطوط إنتاج وتطبيق برمجية حية لترقية قدراتك التقنية والهندسية بالكامل.',
    outcomes: [
      'بناء وتطوير تطبيقات الذكاء الاصطناعي التوليدي السحابية من الصفر وحتى الإنتاج.',
      'ضبط وتعديل النماذج اللغوية الكبيرة (LLMs) مفتوحة المصدر على بيانات الشركات الخاصة.',
      'تأسيس بنية متقدمة لأنظمة استرجاع المعلومات المعززة بالتوليد (RAG) الذكية.',
      'تنفيذ تدفقات عمل برمجية ذاتية القيادة ومتعددة الوكلاء (Multi-Agent Systems).',
      'تحسين خطوط معالجة وتدريب نماذج الذكاء الاصطناعي لأعلى كفاءة وأقل تكلفة حوسبية.',
      'قيادة استراتيجيات التحول الرقمي بامتثال أمني وحوكمة تقنية صارمة للشركات.'
    ]
  }
};

export const requirementsData = {
  en: {
    title: 'Bootcamp Prerequisites',
    subtitle: 'Please review the technical background and hardware requirements needed to ensure an optimal learning experience.',
    items: [
      { id: 'tech', title: 'Technical Background', desc: 'Intermediate knowledge of JavaScript/Python and basic familiarity with modern web architectures and APIs.', type: 'code' },
      { id: 'hardware', title: 'Hardware Setup', desc: 'A laptop (Mac/Windows/Linux) with at least 8GB RAM (16GB recommended) and stable internet connection.', type: 'cpu' },
      { id: 'mindset', title: 'Commitment & Mindset', desc: 'Readiness to invest 10-15 hours per week for building engineering tasks, coding challenges, and interactive team review sessions.', type: 'shield' }
    ]
  },
  ar: {
    title: 'المتطلبات المسبقة للانضمام',
    subtitle: 'يرجى مراجعة الخلفية التقنية والمواصفات اللازمة لضمان تحقيق أقصى استفادة ممكنة من غرف المعمل والتطبيق المتقدم.',
    items: [
      { id: 'tech', title: 'الخلفية التقنية المطلوبة', desc: 'معرفة متوسطة بلغة JavaScript أو Python، وفهم أساسي لكيفية التعامل مع واجهات برمجة التطبيقات (APIs).', type: 'code' },
      { id: 'hardware', title: 'مواصفات جهاز الكمبيوتر', desc: 'جهاز كمبيوتر بذاكرة عشوائية لا تقل عن 8 جيجابايت (يفضل 16 جيجابايت)، مع اتصال إنترنت مستقر للمختبرات عن بعد.', type: 'cpu' },
      { id: 'mindset', title: 'الالتزام الذهني والوقتي', desc: 'الاستعداد المكامل لتخصيص 10 إلى 15 ساعة أسبوعياً لحل التحديات البرمجية وبناء المشاريع وجلسات التوجيه الجماعية.', type: 'shield' }
    ]
  }
};

export const enrollmentData = {
  en: {
    price: '$499', originalPrice: '$899', discount: '45% OFF', title: 'Ready to Transform?',
    features: ['8 Weeks Intensive', 'Live Mentorship', 'Job Guarantee Support', 'Lifetime Access'],
    btnText: 'Secure Your Spot', timer: 'Enrollment closes in: 04:12:45'
  },
  ar: {
    price: '1,899 ر.س', originalPrice: '3,499 ر.س', discount: 'خصم 45%', title: 'جاهز لبدء رحلة التحول؟',
    features: ['8 أسابيع تدريب مكثف', 'جلسات توجيه مباشرة', 'دعم التوظيف الاحترافي', 'وصول دائم للمحتوى'],
    btnText: 'احجز مقعدك الآن', timer: 'ينتهي التسجيل خلال: 04:12:45'
  }
};

export const navTranslations = {
  en: { nav: { home: 'Home', courses: 'Courses', bootcamps: 'Bootcamps', companies: 'Companies', about: 'About Us', contact: 'Contact' }, langBtn: 'AR' },
  ar: { nav: { home: 'الرئيسية', courses: 'الدورات', bootcamps: 'المعسكرات', companies: 'الشركات', about: 'من نحن', contact: 'تواصل معنا' }, langBtn: 'EN' }
};

export const contactPageData = {
  en: { title: 'Get in Touch', subtitle: 'We are here to help you deploy your digital shift. Reach out anytime.', formName: 'Your Name', formEmail: 'Email Address', formPhone: 'Phone Number', formMessage: 'Message Description', submitBtn: 'Send Message' },
  ar: { title: 'تواصل معنا الآن', subtitle: 'نحن هنا لمساعدتك في قيادة تحولك الرقمي وبناء مسيرتك التقنية.', formName: 'الاسم الكامل', formEmail: 'البريد الإلكتروني', formPhone: 'رقم الجوال', formMessage: 'تفاصيل الرسالة', submitBtn: 'إرسال الرسالة' }
};




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

// ==========================================
// TRAINER PROFILE MOCK ENDPOINTS
// ==========================================

export const getTrainerProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          name: "أ. أحمد القحطاني",
          specialty: "تطوير الويب",
          email: "ahmed@capsule.sa",
          phone: "0551234567",
          experience: "8",
          bio: "مدرب معتمد في React و JavaScript وتطوير تطبيقات الويب الحديثة. أهدف إلى سد الفجوة بين التعليم الأكاديمي وسوق العمل.",
          avatarLetter: "A",
          stats: {
            coursesCount: 6,
            studentsCount: 320,
            rating: 4.9
          },
          courses: [
            { id: 1, name: "React Bootcamp", students: 120, status: "published" },
            { id: 2, name: "JavaScript Advanced", students: 85, status: "published" },
            { id: 3, name: "Next.js Fundamentals", students: 0, status: "underReview" }
          ],
          reviews: [
            { id: 1, name: "خالد س.", date: "2026-06-15", rating: 5, comment: "مدرب ممتاز، يشرح المفاهيم المعقدة بطريقة بسيطة وعملية." },
            { id: 2, name: "نورة ف.", date: "2026-06-10", rating: 4, comment: "المعسكر كان رائعاً، لكن الرتم كان سريعاً بعض الشيء في النهاية." }
          ]
        }
      });
    }, 800); // Simulate network delay
  });
};

export const updateTrainerProfile = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a successful update response
      resolve({ success: true, data: formData });
    }, 800);
  });
};