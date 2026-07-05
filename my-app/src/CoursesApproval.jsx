import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Button from "./components/Button.jsx";

function CoursesApproval() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "معسكر الهندسة السيبرانية المتقدم",
      trainer: "أ. خالد ",
      category: "الأمن السيبراني",
      duration: "32 ساعة",
      status: "بانتظار المراجعة",
    },
    {
      id: 2,
      title: "تطوير تطبيقات الويب بـ React",
      trainer: "أ. هند",
      category: "تطوير الويب",
      duration: "28 ساعة",
      status: "بانتظار المراجعة",
    },
  ]);

  const approveCourse = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, status: "تمت الموافقة" } : course
      )
    );
  };

  const rejectCourse = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, status: "مرفوض" } : course
      )
    );
  };

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased text-right" dir="rtl">
      <Navbar activePage="courses" />

      <div className="relative bg-capsule-gradient text-white py-14 px-8 overflow-hidden shadow-inner">
        <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 hidden lg:block opacity-80">
          <div className="relative w-80 h-40">
            <div className="absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full rotate-[-25deg]"></div>
            <div className="absolute w-64 h-20 bg-capsule-gold rounded-full rotate-[-25deg] top-12 left-10 shadow-lg"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl font-extrabold text-white">اعتماد الدورات التدريبية</h1>
          <p className="text-gray-200 text-sm max-w-xl mt-2">
            مراجعة واعتماد الدورات المرفوعة من المدربين قبل نشرها وتفعيلها في المنصة.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">إجمالي الطلبات</p>
            <p className="text-2xl font-black text-capsule-navy">{courses.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">تمت الموافقة</p>
            <p className="text-2xl font-black text-emerald-600">
              {courses.filter((c) => c.status === "تمت الموافقة").length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-xs font-bold text-gray-400 mb-1">بانتظار المراجعة</p>
            <p className="text-2xl font-black text-capsule-dark-gold">
              {courses.filter((c) => c.status === "بانتظار المراجعة").length}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-base font-bold text-capsule-navy">قائمة مراجعة الدورات المرفوعة</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                  <th className="p-4">اسم الدورة</th>
                  <th className="p-4">المدرب</th>
                  <th className="p-4">التصنيف</th>
                  <th className="p-4">المدة</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 text-capsule-navy font-bold">{course.title}</td>
                    <td className="p-4 text-gray-500">{course.trainer}</td>
                    <td className="p-4 text-gray-500">{course.category}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-md text-xs font-bold bg-teal-50 text-capsule-teal">
                        {course.duration}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-bold ${
                          course.status === "تمت الموافقة"
                            ? "text-emerald-600"
                            : course.status === "مرفوض"
                            ? "text-red-600"
                            : "text-capsule-dark-gold"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {course.status === "بانتظار المراجعة" ? (
                        <div className="flex gap-2 justify-center">
                          <Button onClick={() => approveCourse(course.id)}>
                            اعتماد
                          </Button>
                          <button
                            onClick={() => rejectCourse(course.id)}
                            className="px-5 py-2.5 text-sm font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl transition duration-150 active:scale-[0.98] shadow-xs cursor-pointer"
                          >
                            رفض
                          </button>
                        </div>
                      ) : course.status === "تمت الموافقة" ? (
                        <span className="text-emerald-600 text-xs font-bold">تم الاعتماد ✅</span>
                      ) : (
                        <span className="text-red-600 text-xs font-bold">مرفوض ✕</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CoursesApproval;
