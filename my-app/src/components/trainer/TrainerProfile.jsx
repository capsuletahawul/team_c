/**
 * TrainerProfile.jsx
 * 
 * Renders the primary profile card for the instructor.
 * Heavily optimized to match the visual layout of 94d3bcae-8419-4e07-afcb-3f6c826afd12.JPG.
 * 
 * Displays the trainer avatar, name, specialized track, email, phone number,
 * years of experience, and a custom biography with a stylized "Edit Profile" action button.
 */

import { EnvelopeIcon, PhoneIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

// ============================================
// BILINGUAL TRANSLATION DATA
// ============================================
const profileData = {
  en: {
    avatarLetter: 'A',
    name: 'Mr. Ahmed Al-Qahtani',
    specialty: 'Web Development',
    email: 'ahmed@capsule.sa',
    phone: '0551234567',
    experience: 'Experience: 8 Years',
    bio: 'Certified instructor in React, JavaScript, and modern web application development.',
    editBtn: 'Edit Profile'
  },
  ar: {
    avatarLetter: 'أ',
    name: 'أ. أحمد القحطاني',
    specialty: 'تطوير الويب',
    email: 'ahmed@capsule.sa',
    phone: '0551234567',
    experience: 'الخبرة: 8 سنوات',
    bio: 'مدرب معتمد في React و JavaScript وتطوير تطبيقات الويب الحديثة.',
    editBtn: 'تعديل الملف الشخصي'
  }
};

export default function TrainerProfile({ lang = 'ar' }) {
  const t = profileData[lang];
  const isRTL = lang === 'ar';

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 sm:p-10 transition-all duration-300"
    >
      {/* Container holding layout split: Text block and Avatar */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-10">
        
        {/* Left/Right Content Block: Text and Metadata Details */}
        <div className="flex-grow text-center md:text-start space-y-4 w-full md:order-1">
          
          {/* Trainer Name & Identity */}
          <div>
            <h2 className="text-2xl font-black text-[#0D4C54] tracking-tight">
              {t.name}
            </h2>
            <p className="text-base font-bold text-capsule-teal mt-1">
              {t.specialty}
            </p>
          </div>

          {/* Contact Details Grid (Email & Phone) */}
          <div className="flex flex-col items-center md:items-start gap-2.5 text-sm font-semibold text-slate-500">
            <div className="flex items-center gap-2 hover:text-[#0D4C54] transition-colors">
              <EnvelopeIcon className="w-4 h-4 text-slate-400 stroke-[2]" />
              <a href={`mailto:${t.email}`} className="tracking-wide">{t.email}</a>
            </div>
            
            <div className="flex items-center gap-2 hover:text-[#0D4C54] transition-colors">
              <PhoneIcon className="w-4 h-4 text-slate-400 stroke-[2]" />
              <a href={`tel:${t.phone}`} className="tracking-wide">{t.phone}</a>
            </div>
          </div>

          {/* Experience Badge Row */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 inline-flex">
            <BriefcaseIcon className="w-4 h-4 text-capsule-teal stroke-[2]" />
            <span>{t.experience}</span>
          </div>

          {/* Extended Technical Biography */}
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
            {t.bio}
          </p>

          {/* Primary Profile Action Button */}
          <div className="pt-4 flex justify-center md:justify-start">
            <button className="bg-[#387B84] hover:bg-[#2C6269] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-emerald-900/10 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
              {t.editBtn}
            </button>
          </div>

        </div>

        {/* Right/Left Content Block: Large Initial Circle Avatar */}
        <div className="flex-shrink-0 md:order-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#00A499] flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-md border-4 border-white select-none transform hover:scale-105 transition-transform duration-300">
            {t.avatarLetter}
          </div>
        </div>

      </div>
    </section>
  );
}