import React from 'react';

// Global Context
import { useLanguage } from './context/LanguageContext';

// 🌐 Shared Global Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// 🛠️ Modular Trainer Sub-components
import TrainerHero from './components/trainer/TrainerHero';
import TrainerProfile from './components/trainer/TrainerProfile';
import TrainerStats from './components/trainer/TrainerStats';
import TrainerCourses from './components/trainer/TrainerCourses';
import TrainerReviews from './components/trainer/TrainerReviews';
import ContactTrainerCard from './components/trainer/ContactTrainerCard';

export default function TrainerDetails() {
  // Global page language state
  const { t, lang } = useLanguage();

  return (
    <div 
      dir={t.dir} 
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased transition-all duration-300"
    >
      
      {/* 1. GLOBAL NAVBAR SYSTEM */}
      <Navbar activePage="companies" showAuthButtons={true} />

      {/* 2. MAIN STRUCTURED COMPONENT SYSTEM */}
      <main className="flex-grow">
        
        {/* Full-width Gradient Hero Cover Block */}
        <TrainerHero lang={lang} />

        {/* Central Component Grid Content Wrap */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-16 space-y-8">
          
          {/* Main Bio Card Information Block */}
          <TrainerProfile lang={lang} />

          {/* Quick Metrics Multi-Colored Grid Line */}
          <TrainerStats lang={lang} />

          {/* Core Embedded Technical Data Table */}
          <TrainerCourses lang={lang} />

          {/* Reviews & Interactive Rating Area */}
          <TrainerReviews lang={lang} />

          {/* Trainer Communications Component Card */}
          <ContactTrainerCard lang={lang} />

        </div>
      </main>

      {/* 3. CORPORATE FOOTER SYSTEM */}
      <Footer />

    </div>
  );
}