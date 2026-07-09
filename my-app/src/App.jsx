import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

import LandingPage from './LandingPage.jsx';
import StudentDashboard from './StudentDashboard.jsx';
import StudentProfile from './StudentProfile.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import BusinessContractForm from './BusinessContractForm.jsx';
import TrainerDetails from './TrainerDetails.jsx';
import TrainerProfile from './TrainerProfile.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import TrainerDashboard from './TrainerDashboard.jsx';
import SignInSignUpApproval from './CoursesApproval.jsx';
import CoursesOverview from './CoursesOverview.jsx';
import StudentCoursesOverview from './StudentCoursesOverview.jsx';
import Contact from './pages/Contact.jsx';

// --- Small wrappers for pages that expect navigation callbacks as props ---

function LandingRoute() {
  const navigate = useNavigate();
  return (
    <LandingPage
      onNavigateToRegister={() => navigate('/sign-up')}
      onNavigateToLogin={() => navigate('/sign-in')}
      onNavigateToTrainerOnboarding={() => navigate('/sign-up')}
      onNavigateToCompanyOnboarding={() => navigate('/business-contract')}
    />
  );
}

function StudentDashboardRoute() {
  const navigate = useNavigate();
  return <StudentDashboard onNavigateToProfile={() => navigate('/student-profile')} />;
}

function StudentProfileRoute() {
  const navigate = useNavigate();
  return <StudentProfile onBack={() => navigate('/student-dashboard')} />;
}

function SignInRoute() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('ar');
  return (
    <SignIn
      lang={lang}
      onToggleLang={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))}
      onGoToSignUp={() => navigate('/sign-up')}
    />
  );
}

function SignUpRoute() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('ar');
  return (
    <SignUp
      lang={lang}
      onToggleLang={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))}
      onGoToSignIn={() => navigate('/sign-in')}
    />
  );
}

// Quick dev-only index so every page in the repo is reachable and
// nothing is orphaned. Feel free to delete this once real nav exists.
function DevIndex() {
  const links = [
    ['/', 'Landing Page'],
    ['/sign-in', 'Sign In'],
    ['/sign-up', 'Sign Up'],
    ['/student-dashboard', 'Student Dashboard'],
    ['/student-profile', 'Student Profile'],
    ['/trainer-details', 'Trainer Details'],
    ['/trainer-profile', 'Trainer Profile (standalone)'],
    ['/trainer-dashboard', 'Trainer Dashboard'],
    ['/admin-dashboard', 'Admin Dashboard'],
    ['/courses-approval', 'Courses Approval'],
    ['/courses-overview', 'Courses Overview'],
    ['/business-contract', 'Business Contract Form'],
    ['/contact', 'Contact'],
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
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/dev" element={<DevIndex />} />
        <Route path="/sign-in" element={<SignInRoute />} />
        <Route path="/sign-up" element={<SignUpRoute />} />
        <Route path="/student-dashboard" element={<StudentDashboardRoute />} />
        <Route path="/student-profile" element={<StudentProfileRoute />} />
        <Route path="/trainer-details" element={<TrainerDetails />} />
        <Route path="/trainer-profile" element={<TrainerProfile />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/courses-approval" element={<SignInSignUpApproval />} />
        <Route path="/courses-overview" element={<CoursesOverview />} />
        <Route path="/student-courses-overview" element={<StudentCoursesOverview />} />
        <Route path="/business-contract" element={<BusinessContractForm />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
