import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ==========================================
// 1. PUBLIC PAGES (Guests)
// ==========================================
import LandingPage from './pages/LandingPage.jsx';
import CoursesOverview from './pages/CoursesOverview.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import TrainerDetails from './pages/TrainerDetails.jsx';
import Contact from './pages/Contact.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';

// ==========================================
// 2. LOGGED IN PAGES
// ==========================================
import StudentDashboard from './pages/StudentDashboard.jsx';
import StudentProfile from './pages/StudentProfile.jsx';
import TrainerDashboard from './pages/TrainerDashboard.jsx';
import TrainerProfile from './pages/TrainerProfile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import CoursesApproval from './pages/CoursesApproval.jsx';
import BusinessContractForm from './pages/BusinessContractForm.jsx';

// ==========================================
// 3. DEVELOPER TOOLS
// ==========================================
import DevHub from './pages/DevHub.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* DEVELOPER HUB (Go to localhost:xxxx/hub to see the menu) */}
        <Route path="/hub" element={<DevHub />} />

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<CoursesOverview />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/trainer/:trainerId" element={<TrainerDetails />} />
        
        {/* AUTH & CONTACT */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* STUDENT ROUTES */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        {/* TRAINER ROUTES */}
        <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
        <Route path="/trainer/profile" element={<TrainerProfile />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/approvals" element={<CoursesApproval />} />

        {/* COMPANY ROUTES */}
        <Route path="/company/contract" element={<BusinessContractForm />} />

        {/* FALLBACK ROUTE: Catch-all for typos */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}