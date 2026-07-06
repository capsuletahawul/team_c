/**
 * Contact.jsx
 * The main Contact Us page for the Capsule Tahawul platform.
 * Includes full Navbar with Logo, Links, and dynamic Language switcher.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

// ============================================
// NAVBAR TRANSLATIONS
// ============================================
const translations = {
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      bootcamps: 'Bootcamps',
      companies: 'Companies',
      about: 'About Us',
      contact: 'Contact'
    },
    langBtn: 'AR'
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      courses: 'الدورات',
      bootcamps: 'المعسكرات',
      companies: 'الشركات',
      about: 'من نحن',
      contact: 'تواصل معنا'
    },
    langBtn: 'EN'
  }
};

export default function Contact() {
  const { lang } = useTheme();
  const t = translations[lang];
  const isRTL = lang === 'ar';

  return (
    <div className="min-h-screen bg-capsule-bg flex flex-col font-sans transition-colors duration-300">
      
      {/* ============================================
          MAIN NAVBAR
          Includes Logo, Navigation, and Action buttons
          ============================================ */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-grow pb-16">
        <ContactHero lang={lang} />
        <ContactInfo lang={lang} />
        <div className="mt-8">
          <ContactForm lang={lang} />
        </div>
      </main>
    </div>
  );
}