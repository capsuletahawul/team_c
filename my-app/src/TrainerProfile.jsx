import React, { useState, useEffect } from "react";
// استدعاء المكونات الأصلية الخاصة بكم بدقة من مجلد components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingIndicator from "./components/LoadingIndicator";
import Button from "./components/Button";

function TrainerProfile() {
  const [loading, setLoading] = useState(true);

  const [trainer, setTrainer] = useState({
    fullName: "أ. أحمد القحطاني",
    email: "ahmed@capsule.sa",
    phone: "0551234567",
    specialization: "تطوير الويب",
    experience: "8 سنوات",
    bio: "مدرب معتمد في React و JavaScript وتطوير تطبيقات الويب الحديثة.",
    courses: 6,
    students: 320,
    rating: 4.9,
  });

  const [courses] = useState([
    {
      id: 1,
      title: "React Bootcamp",
      students: 120,
      status: "منشور",
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      students: 85,
      status: "منشور",
    },
    {
      id: 3,
      title: "Next.js Fundamentals",
      students: 0,
      status: "قيد المراجعة",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // عند التحميل، يتم عرض الـ LoadingIndicator الأصلي الخاص بكم مع الخلفية الرمادية الموحدة
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <LoadingIndicator message="جاري تحميل بيانات المدرب..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans antialiased text-right" dir="rtl">
      {/* الـ Navbar الأصلي */}
      <Navbar activePage="home" />

      {/* Hero السكشن الفخم للهوية مع الأشكال الهندسية المضافة */}
      <div className="relative bg-gradient-to-tr from-[#0f172a] to-[#0d9488] text-white py-14 px-8 overflow-hidden shadow-inner">
        {/* الأشكال الهندسية الجانبية مثل صفحة الأدمن */}
        <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 hidden lg:block opacity-80">
          <div className="relative w-80 h-40">
            <div className="absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full rotate-[-25deg]"></div>
            <div className="absolute w-64 h-20 bg-[#eab308] rounded-full rotate-[-25deg] top-12 left-10 shadow-lg"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl font-extrabold text-white">الملف الشخصي للمدرب</h1>
          <p className="text-sm text-gray-200 mt-2">
            استعراض بيانات المدرب والدورات والإحصائيات الخاصة به.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* بطاقة معلومات المدرب */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* الصورة الرمزية للمدرب بلون التيل المعتمد */}
            <div className="w-28 h-28 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-4xl font-black shadow-sm">
              {trainer.fullName.charAt(0)}
            </div>

            <div className="flex-1 text-center md:text-right">
              <h2 className="text-2xl font-black mb-2 text-[#0f172a]">{trainer.fullName}</h2>
              <p className="text-[#0d9488] font-semibold mb-2">{trainer.specialization}</p>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>📧 {trainer.email}</p>
                <p>📱 {trainer.phone}</p>
                <p className="text-sm text-gray-600 font-bold mt-2">الخبرة: {trainer.experience}</p>
              </div>

              <p className="mt-4 text-sm leading-7 text-gray-600 max-w-2xl">
                {trainer.bio}
              </p>

              <div className="mt-6">
                {/* الـ Button الأصلي الموحد ليتناسق مع الهوية */}
                <Button variant="primary">تعديل الملف الشخصي</Button>
              </div>
            </div>
          </div>
        </div>

        {/* الإحصائيات بالكروت الدائرية والنصوص المتناسقة */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-400 font-bold">عدد الدورات</p>
            <h3 className="text-3xl font-black mt-2 text-[#0f172a]">{trainer.courses}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-400 font-bold">عدد الطلاب</p>
            <h3 className="text-3xl font-black mt-2 text-[#0d9488]">{trainer.students}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
            <p className="text-xs text-gray-400 font-bold">التقييم</p>
            <h3 className="text-3xl font-black mt-2 text-[#eab308]">⭐ {trainer.rating}</h3>
          </div>
        </div>

        {/* جدول الدورات التدريبية المحدث بالكامل */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/70">
            <h2 className="text-base font-bold text-[#0f172a]">الدورات التدريبية</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                  <th className="p-4">اسم الدورة</th>
                  <th className="p-4">عدد الطلاب</th>
                  <th className="p-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-[#0f172a]">{course.title}</td>
                    <td className="p-4 text-gray-500">{course.students}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-block ${
                          course.status === "منشور"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-amber-50 text-[#ca8a04] border border-amber-100"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* الـ Footer الأصلي والكامل الخاص بكم */}
      <Footer />
    </div>
  );
}

export default TrainerProfile;
