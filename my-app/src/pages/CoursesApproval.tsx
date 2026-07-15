import React, { useState } from "react";

// Reusable Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

// Global Context
import { useLanguage } from "../context/LanguageContext";

// Union type restricting system course approval states
type CourseStatus = "pending" | "approved" | "rejected";

// Interface enforcing types for course metrics and keys
interface CourseItem {
  id: number;
  titleKey: string;
  trainerKey: string;
  categoryKey: string;
  durationVal: number;
  status: CourseStatus;
}

const CoursesApproval: React.FC = () => {
  const { t } = useLanguage();
  const l = t.coursesApproval;

  const [courses, setCourses] = useState<CourseItem[]>([
    {
      id: 1,
      titleKey: "course1Title",
      trainerKey: "trainer1",
      categoryKey: "catCyber",
      durationVal: 32,
      status: "pending", 
    },
    {
      id: 2,
      titleKey: "course2Title",
      trainerKey: "trainer2",
      categoryKey: "catWeb",
      durationVal: 28,
      status: "pending",
    },
  ]);

  // Approves course status by ID
  const approveCourse = (id: number): void => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, status: "approved" } : course
      )
    );
  };

  // Rejects course status by ID
  const rejectCourse = (id: number): void => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, status: "rejected" } : course
      )
    );
  };

  // Resolves the dynamic localization label for the status column
  const getStatusLabel = (status: CourseStatus): string => {
    if (status === "approved") return l.data.approvedText;
    if (status === "rejected") return l.data.rejectedText;
    return l.data.pendingText;
  };

  const isRtl = t.dir === "rtl";
  const heroDecorationAlign = isRtl ? "left-[-40px]" : "right-[-40px]";
  const heroBallAlign = isRtl ? "rotate-[-25deg] left-10" : "rotate-[25deg] right-10";
  const heroArcAlign = isRtl ? "rotate-[-25deg]" : "rotate-[25deg]";
  const tableAlign = isRtl ? "text-right" : "text-left";

  return (
    <div 
      dir={t.dir} 
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased transition-all duration-300"
    >
      <Navbar 
  activePage="courses" 
  showAuthButtons={false} 
  onSignIn={() => {}} 
  onSignUp={() => {}} 
/>

      <main className="flex-grow">
        
        {/* Hero Banner Section */}
        <div className="relative bg-gradient-to-r from-[#0D4C54] to-[#00A499] text-white py-14 px-8 overflow-hidden shadow-inner">
          <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block opacity-80 ${heroDecorationAlign}`}>
            <div className="relative w-80 h-40">
              <div className={`absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full ${heroArcAlign}`}></div>
              <div className={`absolute w-64 h-20 bg-[#EAB308] rounded-full top-12 shadow-lg ${heroBallAlign}`}></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-3xl font-extrabold text-white">{l.hero.title}</h1>
            <p className="text-gray-100 text-sm max-w-xl mt-2">{l.hero.subtitle}</p>
          </div>
        </div>

        {/* Central Component Content Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Quick Metrics Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.total}</p>
              <p className="text-2xl font-black text-[#0D4C54]">{courses.length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.approved}</p>
              <p className="text-2xl font-black text-emerald-600">
                {courses.filter((c) => c.status === "approved").length}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              <p className="text-xs font-bold text-gray-400 mb-1">{l.stats.pending}</p>
              <p className="text-2xl font-black text-[#EAB308]">
                {courses.filter((c) => c.status === "pending").length}
              </p>
            </div>
          </div>

          {/* Core Technical Data Table */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-base font-bold text-[#0D4C54]">{l.table.cardTitle}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${tableAlign}`}>
                <thead>
                  <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                    <th className="p-4">{l.table.colTitle}</th>
                    <th className="p-4">{l.table.colTrainer}</th>
                    <th className="p-4">{l.table.colCategory}</th>
                    <th className="p-4">{l.table.colDuration}</th>
                    <th className="p-4">{l.table.colStatus}</th>
                    <th className="p-4 text-center">{l.table.colActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 text-[#0D4C54] font-bold">{l.data[course.titleKey]}</td>
                      <td className="p-4 text-gray-500">{l.data[course.trainerKey]}</td>
                      <td className="p-4 text-gray-500">{l.data[course.categoryKey]}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-md text-xs font-bold bg-teal-50 text-[#00A499]">
                          {course.durationVal}{l.table.unitHours}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs font-bold ${
                            course.status === "approved"
                              ? "text-emerald-600"
                              : course.status === "rejected"
                              ? "text-red-600"
                              : "text-[#EAB308]"
                          }`}
                        >
                          {getStatusLabel(course.status)}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {course.status === "pending" ? (
                          <div className="flex gap-2 justify-center">
                            <Button onClick={() => approveCourse(course.id)}>
                              {l.table.actionApprove}
                            </Button>
                            <button
                              type="button"
                              onClick={() => rejectCourse(course.id)}
                              className="px-5 py-2.5 text-sm font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl transition duration-150 active:scale-[0.98] shadow-xs cursor-pointer"
                            >
                              {l.table.actionReject}
                            </button>
                          </div>
                        ) : course.status === "approved" ? (
                          <span className="text-emerald-600 text-xs font-bold">{l.table.statusApproved}</span>
                        ) : (
                          <span className="text-red-600 text-xs font-bold">{l.table.statusRejected}</span>
                        )}
                      </td>
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
};

export default CoursesApproval;