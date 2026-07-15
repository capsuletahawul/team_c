// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// استيراد الصفحات مع حذف امتدادات .jsx تماماً ليتعرف عليها الـ Compiler تلقائياً
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BusinessContractForm from './pages/BusinessContractForm';
import TrainerDetails from './pages/TrainerDetails';
import TrainerProfile from './pages/TrainerProfile';
import AdminDashboard from './pages/AdminDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import SignInSignUpApproval from './pages/CoursesApproval';
import CourseDetails from './pages/CourseDetails';
import CoursesOverview from "./pages/CoursesOverview";
import StudentCoursesOverview from './pages/StudentCoursesOverview';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import ForgotPassword from "./pages/ForgotPassword";
import CompanyDashboard from './pages/CompanyDashboard'; 
import PaymentPage from './pages/PaymentPage';

// --- Small wrappers for pages that expect navigation callbacks as props ---

const LandingRoute: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LandingPage
      onNavigateToRegister={() => navigate('/sign-up')}
      onNavigateToLogin={() => navigate('/sign-in')}
      onNavigateToTrainerOnboarding={() => navigate('/sign-up')}
      onNavigateToCompanyOnboarding={() => navigate('/business-contract')} 
    />
  );
};

const StudentDashboardRoute: React.FC = () => {
  const navigate = useNavigate();
  return <StudentDashboard onNavigateToProfile={() => navigate('/student-profile')} />;
};

const StudentProfileRoute: React.FC = () => {
  const navigate = useNavigate();
  return <StudentProfile onBack={() => navigate('/student-dashboard')} />;
};

const SignInRoute: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<string>('ar');
  return (
    <SignIn
      lang={lang}
      onToggleLang={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))}
      onGoToSignUp={() => navigate('/sign-up')}
    />
  );
};

const SignUpRoute: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<string>('ar');
  return (
    <SignUp
      lang={lang}
      onToggleLang={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))}
      onGoToSignIn={() => navigate('/sign-in')}
    />
  );
};

// Quick dev-only index so every page in the repo is reachable
const DevIndex: React.FC = () => {
  const links: Array<[string, string]> = [
    ['/', 'Landing Page'],
    ['/sign-in', 'Sign In'],
    ['/sign-up', 'Sign Up'],
    ['/student-dashboard', 'Student Dashboard'],
    ['/student-profile', 'Student Profile'],
    ['/company-dashboard', 'Company Dashboard 🏢'],
    ['/trainer-details', 'Trainer Details'],
    ['/trainer-profile', 'Trainer Profile (standalone)'],
    ['/trainer-dashboard', 'Trainer Dashboard'],
    ['/admin-dashboard', 'Admin Dashboard'],
    ['/courses-approval', 'Courses Approval'],
    ['/courses-overview', 'Courses Overview'],
    ['/course-details/1', 'Course Details'],
    ['/business-contract', 'Business Contract Form'],
    ['/contact', 'Contact'],
    ['/cart', 'Cart'],
    ['/payment', 'Payment Page 💳'],
  ];

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Dev Page Index</h1>
      <ul>
        {links.map(([href, label]) => (
          <li key={href}>
            <Link to={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  return (
    // 🚨 أزلنا الـ <BrowserRouter> من هنا لأننا نقلناه للـ main.tsx لحماية السياق بالكامل
    <Routes>
      <Route path="/" element={<LandingRoute />} />
      <Route path="/dev" element={<DevIndex />} />
      <Route path="/sign-in" element={<SignInRoute />} />
      <Route path="/sign-up" element={<SignUpRoute />} />
      <Route path="/student-dashboard" element={<StudentDashboardRoute />} />
      <Route path="/student-profile" element={<StudentProfileRoute />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/company-dashboard" element={<CompanyDashboard />} /> 
      <Route path="/trainer-details/:trainerId" element={<TrainerDetails />} />
      <Route path="/trainer-details" element={<TrainerDetails />} />
      <Route path="/trainer-profile" element={<TrainerProfile />} />
      <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/courses-approval" element={<SignInSignUpApproval />} />
      <Route path="/course-details/:id" element={<CourseDetails />} />
      <Route path="/courses-overview" element={<CoursesOverview />} />
      <Route path="/student-courses-overview" element={<StudentCoursesOverview />} />
      <Route path="/business-contract" element={<BusinessContractForm />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
};

export default App;