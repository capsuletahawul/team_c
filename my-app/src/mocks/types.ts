// =========================
// API ENVELOPES
// =========================

// Represents a successful API response envelope
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

// Represents an error API response envelope
export interface ApiError {
  success: false;
  error: string;
  details?: Record<string, string>;
}

// Represents the unified API result envelope
export type ApiResult<T> = ApiSuccess<T> | ApiError;

// =========================
// COMMON MODELS
// =========================

// Represents the system user roles
export type UserRole = "Student" | "Trainer" | "Company" | "Admin";

// Represents the status of a user account
export type UserStatus = "active" | "suspended" | "pending";

// Represents the allowed payment methods
export type PaymentMethod = "credit_card" | "paypal" | "apple_pay" | "bank_transfer";

// Represents a single item inside the shopping cart
export interface CartItem {
  id: string;
  courseId: string;
  title: string;
  price: number;
  image?: string;
}

// Represents a student review on a course
export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

// =========================
// COURSE MODELS
// =========================

// Represents a course requirement or prerequisite
export interface Requirement {
  id: string;
  description: string;
}

// Represents a learning topic or lecture within a curriculum module
export interface Topic {
  id: string;
  title: string;
  duration: string;
  isFreePreview: boolean;
}

// Represents a module in the course curriculum
export interface CurriculumModule {
  id: string;
  title: string;
  topics: Topic[];
}

// Represents the complete curriculum structure of a course
export interface Curriculum {
  modules: CurriculumModule[];
}

// Represents an instructor's public profile summary on a course
export interface InstructorProfile {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  bio?: string;
  rating?: number;
  reviewsCount?: number;
  studentsCount?: number;
}

// Represents a course shown inside the platform
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  duration: string;
  lecturesCount: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  thumbnailUrl: string;
  isTrending?: boolean;
  isBestseller?: boolean;
  status?: "available" | "completed" | "coming_soon";
}

// Represents the full details of a course including its curriculum and prerequisites
export interface CourseDetails extends Course {
  instructor: InstructorProfile;
  requirements: Requirement[];
  curriculum: Curriculum;
  reviews: Review[];
  learningOutcomes: string[];
}

// Represents a learning path or track consisting of multiple courses
export interface Track {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  estimatedDuration: string;
}

// =========================
// USER MODELS
// =========================

// Represents a course purchased by a student with progress tracking
export interface PurchasedCourse {
  id: string;
  courseId: string;
  title: string;
  thumbnailUrl: string;
  progress: number;
  lastAccessed: string;
  status: "not_started" | "in_progress" | "completed";
}

// Represents a system notification sent to the user
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  createdAt: string;
  isRead: boolean;
}

// Represents the student user's profile and learning state
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "Student";
  enrolledCourses: PurchasedCourse[];
  notifications: Notification[];
  createdAt: string;
}

// Represents the payload sent when registering a new user
export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  companyName?: string;
  phone?: string;
}

// Represents the payload sent when logging in
export interface LoginPayload {
  email: string;
  password?: string;
}

// =========================
// TRAINER MODELS
// =========================

// Represents a course managed or taught by a trainer
export interface TrainerCourse {
  id: string;
  title: string;
  price: number;
  studentsEnrolled: number;
  rating: number;
  status: "draft" | "published" | "archived";
}

// Represents monthly breakdown statistics for trainer performance
export interface MonthlyAnalytics {
  month: string;
  revenue: number;
  enrollments: number;
}

// Represents performance and revenue analytics for a trainer
export interface TrainerAnalytics {
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  monthlyProgress: MonthlyAnalytics[];
}

// Represents the detailed profile of a registered trainer
export interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  title: string;
  bio: string;
  role: "Trainer";
  courses: TrainerCourse[];
  analytics: TrainerAnalytics;
}

// =========================
// DASHBOARD MODELS
// =========================

// Represents a student enrollment transaction or log
export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  enrolledAt: string;
  amountPaid: number;
}

// Represents global/platform overview statistics for a user/admin dashboard
export interface PlatformOverview {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  activeTracksCount: number;
}

// =========================
// CONTACT MODELS
// =========================

// Represents the contact form payload submitted by users
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Represents a B2B business request payload
export interface B2BRequest {
  id?: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  employeesCount: number;
  message?: string;
  status?: "pending" | "reviewed" | "approved" | "rejected";
}

// =========================
// ADMIN MODELS
// =========================

// Represents metrics shown inside the system administrator dashboard
export interface AdminDashboardMetrics {
  totalRevenue: number;
  totalStudentsCount: number;
  totalTrainersCount: number;
  pendingB2BRequestsCount: number;
  activeUsersToday: number;
}

// Represents a user profile as managed by system administrators
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
}
// =========================================
// MULTI-LANGUAGE / RAW DATA MODELS FOR TRANSLATION
// =========================================

export interface RawTopic {
  name?: string;
  nameAr?: string;
  nameEn?: string;
  duration?: string;
  durationAr?: string;
  durationEn?: string;
  type?: string;
}

export interface RawCurriculumModule {
  id: string | number;
  week?: string;
  weekAr?: string;
  weekEn?: string;
  title?: string;
  titleAr?: string;
  titleEn?: string;
  duration?: string;
  durationAr?: string;
  durationEn?: string;
  topics: RawTopic[];
}

export interface RawRequirementItem {
  id: string | number;
  type: string;
  title?: string;
  titleAr?: string;
  titleEn?: string;
  desc?: string;
  descAr?: string;
  descEn?: string;
}

export interface RawInstructorProfile {
  role?: string;
  roleAr?: string;
  roleEn?: string;
  bio?: string;
  bioAr?: string;
  bioEn?: string;
  avatarLabel?: string;
  ratingText?: string;
  ratingTextAr?: string;
  ratingTextEn?: string;
  studentsText?: string;
  studentsTextAr?: string;
  studentsTextEn?: string;
  skills?: string[];
  skillsAr?: string[];
  skillsEn?: string[];
}

export interface RawEnrollmentInfo {
  features?: string[];
  featuresAr?: string[];
  featuresEn?: string[];
  timer?: string;
  timerAr?: string;
  timerEn?: string;
}

export interface CourseRawData {
  id: string | number;
  title?: string;
  titleAr?: string;
  titleEn?: string;
  category?: string;
  categoryAr?: string;
  categoryEn?: string;
  description?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  subtitle?: string;
  subtitleAr?: string;
  subtitleEn?: string;
  instructor?: string;
  instructorAr?: string;
  instructorEn?: string;
  level?: string;
  levelAr?: string;
  levelEn?: string;
  language?: string;
  languageAr?: string;
  languageEn?: string;
  duration?: string;
  durationAr?: string;
  durationEn?: string;
  updated?: string;
  updatedAr?: string;
  updatedEn?: string;
  outcomes?: string[];
  outcomesAr?: string[];
  outcomesEn?: string[];
  rating?: number;
  price?: number;
  originalPrice?: number;
  discount?: string;
  students?: number;
  status?: string;
  instructorProfile?: RawInstructorProfile;
  requirements?: RawRequirementItem[];
  curriculum?: RawCurriculumModule[];
  enrollment?: RawEnrollmentInfo;
}

export interface TranslatedCourse {
  id: string | number;
  title: string;
  category: string;
  description: string;
  subtitle: string;
  instructor: string;
  level: string;
  language: string;
  duration: string;
  updated: string;
  outcomes: string[];
  rating?: number;
  price?: number;
  originalPrice?: number;
  discount?: string;
  students?: number;
  status?: string;
  instructorProfile: {
    role: string;
    bio: string;
    avatarLabel: string;
    ratingText: string;
    studentsText: string;
    skills: string[];
  } | null;
  requirements: {
    id: string | number;
    type: string;
    title: string;
    desc: string;
  }[];
  curriculum: {
    id: string | number;
    week: string;
    title: string;
    duration: string;
    topics: {
      name: string;
      duration: string;
      type?: string;
    }[];
  }[];
  enrollment: {
    features: string[];
    timer: string;
  } | null;
}