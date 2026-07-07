import React, { useState, useEffect } from "react";

// Reusable Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingIndicator from "./components/LoadingIndicator";

// Global Context
import { useLanguage } from "./context/LanguageContext";

function TrainerProfile() {
  const { t, lang } = useLanguage();
  const l = t.trainerProfile;

  const [loading, setLoading] = useState(true);

  const [trainer] = useState({
    email: "ahmed@capsule.sa",
    phone: "0551234567",
    students: 205,
    rating: 4.9,
  });

  // Mock data includes an "underReview" course, but we will filter it out for the public view
  const [courses] = useState([
    {
      id: 1,
      title: "React Bootcamp",
      students: 120,
      status: "published",
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      students: 85,
      status: "published",
    },
    {
      id: 3,
      title: "Next.js Fundamentals",
      students: 0,
      status: "underReview",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // LOGIC: Only show published courses to the public
  const publicCourses = courses.filter(course => course.status === "published");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-capsule-bg">
        <LoadingIndicator message={l.loading} />
      </div>
    );
  }

  return (
    <div 
      dir={t.dir} 
      className="min-h-screen bg-capsule-bg flex flex-col font-sans text-capsule-navy antialiased transition-all duration-300"
    >
      
      <Navbar activePage="profile" showAuthButtons={true} />

      <main className="flex-grow">
        
        {/* Hero Section */}
        <div className="relative bg-capsule-gradient text-white py-14 px-8 overflow-hidden shadow-inner">
          <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block opacity-80 ${t.dir === 'rtl' ? 'left-[-40px]' : 'right-[-40px]'}`}>
            <div className="relative w-80 h-40">
              <div className={`absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full ${t.dir === 'rtl' ? 'rotate-[-25deg]' : 'rotate-[25deg]'}`}></div>
              <div className={`absolute w-64 h-20 bg-capsule-gold rounded-full top-12 shadow-lg ${t.dir === 'rtl' ? 'rotate-[-25deg] left-10' : 'rotate-[25deg] right-10'}`}></div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-3xl font-extrabold text-white">{l.hero.title}</h1>
            <p className="text-sm text-gray-200 mt-2">{l.hero.subtitle}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Trainer Public Info Card */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-28 h-28 rounded-full bg-capsule-teal text-white flex items-center justify-center text-4xl font-black shadow-sm select-none shrink-0">
                {l.data.fullName.charAt(t.dir === 'rtl' ? 3 : 0)}
              </div>

              <div className={`flex-1 ${t.dir === 'rtl' ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
                <h2 className="text-2xl font-black mb-2 text-capsule-navy">{l.data.fullName}</h2>
                <p className="text-capsule-teal font-semibold mb-2">{l.data.specialization}</p>
                
                <div className="text-sm text-gray-500 space-y-1">
                  <p dir="ltr" className={t.dir === 'rtl' ? 'text-right' : 'text-left'}>📧 {trainer.email}</p>
                  <p className="text-sm text-gray-600 font-bold mt-2">
                    {l.profile.experience}{l.data.experienceVal}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-600 max-w-2xl mx-auto md:mx-0">
                  {l.data.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards (Reflecting Public Data) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-bold">{l.stats.coursesCount}</p>
              {/* Dynamically reads the filtered array length */}
              <h3 className="text-3xl font-black mt-2 text-capsule-navy">{publicCourses.length}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-bold">{l.stats.studentsCount}</p>
              <h3 className="text-3xl font-black mt-2 text-capsule-teal">{trainer.students}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-bold">{l.stats.rating}</p>
              <h3 className="text-3xl font-black mt-2 text-capsule-dark-gold">⭐ {trainer.rating}</h3>
            </div>
          </div>

          {/* Public Courses Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/70">
              <h2 className="text-base font-bold text-capsule-navy">{l.table.cardTitle}</h2>
            </div>

            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                    <th className="p-4">{l.table.colTitle}</th>
                    <th className="p-4">{l.table.colStudents}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                  {publicCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-capsule-navy">{course.title}</td>
                      <td className="p-4 text-gray-500">{course.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default TrainerProfile;

