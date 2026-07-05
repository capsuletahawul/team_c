import React, { useState, useEffect } from 'react';
// Feature 1 (Platform Vision & Ecosystem Overview) + Feature 2 (Public Course Catalog Exploration)
import { getPlatformOverview, getCourses } from './mocks/mockApi';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LoadingIndicator from './components/LoadingIndicator.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import Button from './components/Button.jsx';
import heroImage from './assets/hero.png';

const CATEGORIES = ['الكل', 'Web Development', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing'];

function LandingPage({ onNavigateToRegister, onNavigateToLogin, onNavigateToTrainerOnboarding, onNavigateToCompanyOnboarding }) {
  const [overview, setOverview] = useState(null);
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [loading, setLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [error, setError] = useState('');

  // التحميل الأولي: نظرة المنصة العامة + كامل الدورات (Feature 1 AC1, Feature 2 AC1)
  useEffect(() => {
    let isMounted = true;

    Promise.all([getPlatformOverview(), getCourses()])
      .then(([overviewRes, coursesRes]) => {
        if (!isMounted) return;

        if (overviewRes.success) setOverview(overviewRes.data);
        else setError('تعذر تحميل بيانات نظرة المنصة العامة حالياً.');

        if (coursesRes.success) setCourses(coursesRes.data.courses);

        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError('حدث خطأ غير متوقع أثناء الاتصال بالخادم.');
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  // فلترة الدورات حسب الفئة (Feature 2 AC2)
  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setCatalogLoading(true);

    const filters = category === 'الكل' ? {} : { category };
    const result = await getCourses(filters);

    if (result.success) setCourses(result.data.courses);
    setCatalogLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col items-center justify-center">
        <LoadingIndicator message="جاري تجهيز بوابة كبسولة تحول..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased text-right" dir="rtl">
      <Navbar
        activePage="home"
        showAuthButtons
        onSignIn={onNavigateToLogin}
        onSignUp={onNavigateToRegister}
      />

      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* الهيرو الرئيسي (Feature 1) */}
      <div className="relative bg-capsule-gradient text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <span className="inline-block bg-white/10 border border-white/20 text-capsule-gold text-xs font-bold px-4 py-1.5 rounded-full mb-5">
              منصة سعودية للتدريب والتطوير المهني
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              حيث يلتقي الطلاب والخبراء والشركات لبناء مستقبل مهني حقيقي
            </h1>
            <p className="text-gray-200 text-sm sm:text-base mt-5 max-w-lg leading-relaxed">
              دورات، معسكرات، وهاكاثونات مصممة لتؤهلك لسوق العمل — سواء كنت متعلماً، مدرباً خبيراً، أو جهة توظف فرقاً كاملة.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="primary" onClick={onNavigateToRegister}>ابدأ التعلم مجاناً</Button>
              <button
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 font-bold text-sm rounded-xl border border-white/30 text-white hover:bg-white/10 transition cursor-pointer"
              >
                تصفح الدورات
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img src={heroImage} alt="طلاب وخبراء يتعلمون على منصة كبسولة تحول" className="w-full max-w-md drop-shadow-2xl" />
          </div>
        </div>

        {/* زخرفة خلفية بسيطة */}
        <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-capsule-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-10 top-0 w-56 h-56 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* بطاقات المسارات الثلاثة (Feature 1 AC1) */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-7">
            <div className="w-11 h-11 bg-capsule-teal/10 rounded-xl flex items-center justify-center text-xl mb-4">🎓</div>
            <h3 className="font-black text-capsule-navy mb-2">{overview?.studentTrack?.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">{overview?.studentTrack?.description}</p>
            <button onClick={onNavigateToRegister} className="text-xs font-bold text-capsule-teal hover:text-capsule-navy transition cursor-pointer">
              سجّل كطالب ←
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-7">
            <div className="w-11 h-11 bg-capsule-dark-gold/10 rounded-xl flex items-center justify-center text-xl mb-4">🧑‍🏫</div>
            <h3 className="font-black text-capsule-navy mb-2">{overview?.trainerTrack?.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">{overview?.trainerTrack?.description}</p>
            <button onClick={onNavigateToTrainerOnboarding} className="text-xs font-bold text-capsule-dark-gold hover:text-capsule-navy transition cursor-pointer">
              قدّم كمدرب ←
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-7">
            <div className="w-11 h-11 bg-capsule-navy/10 rounded-xl flex items-center justify-center text-xl mb-4">🏢</div>
            <h3 className="font-black text-capsule-navy mb-2">{overview?.companyTrack?.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">{overview?.companyTrack?.description}</p>
            <button onClick={onNavigateToCompanyOnboarding} className="text-xs font-bold text-capsule-navy hover:text-capsule-teal transition cursor-pointer">
              تواصل كشريك أعمال ←
            </button>
          </div>

        </div>
      </section>

      {/* كتالوج الدورات العام (Feature 2) */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-capsule-teal text-xs font-bold uppercase tracking-wider mb-1">مكتبة الدورات</p>
            <h2 className="text-2xl font-extrabold text-capsule-navy">اكتشف مساراً يناسب أهدافك</h2>
          </div>
        </div>

        {/* فلاتر الفئات (Feature 2 AC2) */}
        <div className="flex flex-wrap gap-3 mb-8">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeCategory === category
                  ? 'bg-capsule-teal text-white shadow-xs'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {catalogLoading ? (
          <LoadingIndicator message="جاري تحديث نتائج الفئة المختارة..." />
        ) : courses.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
            <p className="text-sm font-bold text-gray-400">لا توجد دورات ضمن هذه الفئة حالياً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden hover:shadow-md transition">
                <div className="h-32 bg-gradient-to-tr from-capsule-navy to-capsule-teal flex items-center justify-center text-white text-3xl">
                  📘
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold text-capsule-teal bg-capsule-teal/10 px-2 py-1 rounded-md">
                    {course.category}
                  </span>
                  <h3 className="font-bold text-capsule-navy text-sm mt-3 leading-snug">{course.title}</h3>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-gray-400 font-bold">{course.duration}</p>
                    {course.rating > 0 && (
                      <p className="text-xs font-bold text-capsule-dark-gold">⭐ {course.rating}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <p className="font-black text-capsule-navy text-sm">
                      {course.price === 0 ? 'مجاني' : `${course.price} ر.س`}
                    </p>
                    <span className="text-xs font-bold text-gray-400">{course.students} طالب</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* بانر دعوة للشركاء (Feature 1 AC2) */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-capsule-footer rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black">هل تدير فريقاً أو تمتلك خبرة تستحق المشاركة؟</h3>
            <p className="text-gray-300 text-sm mt-2 max-w-lg">
              انضم كمدرب لمشاركة معرفتك، أو كشريك أعمال لتصميم برامج تدريب مخصصة لفريقك.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="primary" onClick={onNavigateToTrainerOnboarding}>انضم كمدرب</Button>
            <button
              onClick={onNavigateToCompanyOnboarding}
              className="px-5 py-2.5 font-bold text-sm rounded-xl border border-white/30 text-white hover:bg-white/10 transition cursor-pointer"
            >
              حلول الشركات
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
