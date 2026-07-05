/**
 * ContactInfo.jsx
 * 
 * This component displays the contact information cards (Email, Location, Working Hours).
 * It uses responsive CSS Grid to display cards side-by-side on desktop and stacked on mobile.
 * Now integrated with the project's custom Tailwind Design System colors.
 */

// Importing icons from Heroicons
import { EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

// ============================================
// TRANSLATIONS OBJECT
// Stores text for both Arabic (RTL) and English (LTR)
// ============================================
const translations = {
  en: {
    emailTitle: 'Email Address',
    emailDesc: 'Send us an email anytime.',
    emailValue: 'capsuletahawul@gmail.com', 
    locationTitle: 'Our Location',
    locationDesc: 'Kingdom of Saudi Arabia',
    locationValue: 'Online Platform',
    hoursTitle: 'Working Hours',
    hoursDesc: 'Sunday to Thursday',
    hoursValue: '9:00 AM - 5:00 PM',
  },
  ar: {
    emailTitle: 'البريد الإلكتروني',
    emailDesc: 'راسلنا في أي وقت.',
    emailValue: 'capsuletahawul@gmail.com', 
    locationTitle: 'مقرنا',
    locationDesc: 'المملكة العربية السعودية',
    locationValue: 'منصة إلكترونية',
    hoursTitle: 'ساعات العمل',
    hoursDesc: 'الأحد إلى الخميس',
    hoursValue: '9:00 صباحاً - 5:00 مساءً',
  },
};

export default function ContactInfo({ lang = "en" }) {
  // Get current language text
  const t = translations[lang];
  
  // Set text direction based on the selected language
  const isRTL = lang === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  // ============================================
  // DATA ARRAY
  // We use an array to easily map through the info cards
  // This keeps the code clean and prevents duplication (DRY principle)
  // ============================================
  const contactDetails = [
    {
      id: 1,
      title: t.emailTitle,
      description: t.emailDesc,
      value: t.emailValue,
      icon: EnvelopeIcon,
      // Adding a specific link for email
      link: `mailto:${t.emailValue}`
    },
    {
      id: 2,
      title: t.locationTitle,
      description: t.locationDesc,
      value: t.locationValue,
      icon: MapPinIcon,
    },
    {
      id: 3,
      title: t.hoursTitle,
      description: t.hoursDesc,
      value: t.hoursValue,
      icon: ClockIcon,
    }
  ];

  return (
    // Main container using custom design system background
    <section 
      dir={direction} 
      className="w-full py-12 sm:py-16 bg-capsule-bg" 
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 
          Grid Container:
          - 1 column on mobile (grid-cols-1)
          - 3 columns on large screens (lg:grid-cols-3)
          - Gap between cards (gap-6)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Loop through the contactDetails array to render cards */}
          {contactDetails.map((item) => (
            <div 
              key={item.id}
              // Card styling using custom border color from design system
              className="bg-white rounded-2xl p-6 sm:p-8 border border-capsule-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Icon Container using custom design system colors */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-capsule-bg text-capsule-teal mb-6 group-hover:bg-capsule-teal group-hover:text-white transition-colors duration-300">
                <item.icon className="w-6 h-6" aria-hidden="true" />
              </div>

              {/* Text Content using custom design system typography colors */}
              <h3 className="text-xl font-bold text-capsule-navy mb-2">
                {item.title}
              </h3>
              
              <p className="text-[#706F6F] mb-4 text-sm sm:text-base">
                {item.description}
              </p>

              {/* Conditional rendering for clickable email link vs plain text */}
              {item.link ? (
                <a 
                  href={item.link} 
                  className="text-base font-semibold text-capsule-teal hover:text-capsule-darkGold transition-colors duration-200"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-base font-semibold text-capsule-navy">
                  {item.value}
                </p>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}