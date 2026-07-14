/**
 * CourseDetails.jsx
 * المكون الموحد لصفحة تفاصيل الدورة - كبسولة تحول
 */

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
// استيراد سياق اللغة لتفادي مشكلة الصفحة البيضاء وللتحويل الفوري للغات
import { useLanguage } from '../context/LanguageContext'; 
import StudentNavbar from "../components/StudentNavbar.jsx";
import Footer from '../components/Footer';
import {
  ChevronDownIcon, PlayIcon, DocumentTextIcon, CodeBracketSquareIcon,
  ClockIcon, VideoCameraIcon, AcademicCapIcon, CodeBracketIcon, CpuChipIcon, ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon, CalendarDaysIcon, ChartBarIcon, LanguageIcon, UsersIcon, CheckCircleIcon, SparklesIcon, CheckIcon } from '@heroicons/react/24/solid';
import { navTranslations, getCourseDetails } from "../mocks/mockApi";

// نصوص الواجهة الثابتة المترجمة (عناوين الأقسام والأزرار العامة)
const uiText = {
  ar: { loading: 'جاري تحميل تفاصيل الدورة...', notFound: 'لم يتم العثور على هذه الدورة.', backToCourses: 'الرجوع إلى الدورات', metaUpdated: 'آخر تحديث', metaLevel: 'المستوى', metaLanguage: 'لغة التدريس', statsDuration: 'مدة الدورة', statsStudents: 'الطلاب المسجلون', statsRating: 'تقييم الدورة', statsPrice: 'السعر', free: 'مجاني', overviewTitle: 'ماذا ستتعلم', curriculumTitle: 'منهج الدورة', curriculumSubtitle: 'استكشف خارطة الطريق الكاملة لهذه الدورة أسبوعاً بأسبوع.', expandAll: 'توسيع الكل', collapseAll: 'إغلاق الكل', lessons: 'دروس', instructorTitle: 'تعرّف على المدرب', verifiedExpert: 'مدرّب معتمد', requirementsTitle: 'المتطلبات المسبقة', requirementsSubtitle: 'يرجى مراجعة المتطلبات التالية قبل الانضمام للدورة.', enrollBtn: 'احجز مقعدك الآن', priceLabel: 'السعر الحالي', ratingReviews: 'تقييم عام للدورة' },
  en: { loading: 'Loading course details...', notFound: 'This course could not be found.', backToCourses: 'Back to Courses', metaUpdated: 'Last updated', metaLevel: 'Level', metaLanguage: 'Language', statsDuration: 'Duration', statsStudents: 'Enrolled Students', statsRating: 'Course Rating', statsPrice: 'Price', free: 'Free', overviewTitle: 'What You Will Learn', curriculumTitle: 'Course Curriculum', curriculumSubtitle: 'Explore the full week-by-week roadmap for this course.', expandAll: 'Expand All', collapseAll: 'Collapse All', lessons: 'Lessons', instructorTitle: 'Meet Your Instructor', verifiedExpert: 'Verified Expert', requirementsTitle: 'Prerequisites', requirementsSubtitle: 'Please review the following requirements before joining.', enrollBtn: 'Secure Your Spot', priceLabel: 'Current Price', ratingReviews: 'Overall Course Rating' }
};

export default function CourseDetails() {
  const { id } = useParams(); // جلب معرف الكورس من الرابط
  const { lang } = useLanguage(); // جلب اللغة الحالية من الكونتيكست
  const ui = uiText[lang] || uiText['ar'];
  const [rawData, setRawData] = useState(null); // تخزين البيانات الخام القادمة من السيرفر
  const [course, setCourse] = useState(null); // تخزين بيانات الكورس المترجمة والمهيأة للعرض
  const [status, setStatus] = useState('loading'); // حالة التحميل: loading | success | not_found

  // التأثير الجانبي الأول: جلب بيانات الكورس عند تحميل الصفحة أو تغير الـ ID
  useEffect(() => {
    let isMounted = true;
    async function loadCourse() {
      setStatus('loading');
      const response = await getCourseDetails(id);
      if (!isMounted) return;
      if (response.success) { setRawData(response.data); setStatus('success'); }
      else { setRawData(null); setStatus('not_found'); }
    }
    loadCourse();
    return () => { isMounted = false; };
  }, [id]);

  // التأثير الجانبي الثاني: ترجمة البيانات الخام تلقائياً فور تغير اللغة الحالية (lang)
  useEffect(() => {
    if (rawData) {
      const isAr = lang === 'ar';
      const getVal = (arVal, enVal, fallback) => isAr ? (arVal || fallback) : (enVal || fallback);
      setCourse({
        ...rawData,
        title: getVal(rawData.titleAr, rawData.titleEn, rawData.title),
        category: getVal(rawData.categoryAr, rawData.categoryEn, rawData.category),
        description: getVal(rawData.descriptionAr, rawData.descriptionEn, rawData.description),
        subtitle: getVal(rawData.subtitleAr, rawData.subtitleEn, rawData.subtitle),
        instructor: getVal(rawData.instructorAr, rawData.instructorEn, rawData.instructor),
        level: getVal(rawData.levelAr, rawData.levelEn, rawData.level),
        language: getVal(rawData.languageAr, rawData.languageEn, rawData.language),
        duration: getVal(rawData.durationAr, rawData.durationEn, rawData.duration),
        updated: getVal(rawData.updatedAr, rawData.updatedEn, rawData.updated),
        outcomes: isAr ? (rawData.outcomesAr || rawData.outcomes || []) : (rawData.outcomesEn || rawData.outcomes || []),
        instructorProfile: rawData.instructorProfile ? {
          role: getVal(rawData.instructorProfile.roleAr, rawData.instructorProfile.roleEn, rawData.instructorProfile.role),
          bio: getVal(rawData.instructorProfile.bioAr, rawData.instructorProfile.bioEn, rawData.instructorProfile.bio),
          avatarLabel: rawData.instructorProfile.avatarLabel || "",
          ratingText: getVal(rawData.instructorProfile.ratingTextAr, rawData.instructorProfile.ratingTextEn, rawData.instructorProfile.ratingText),
          studentsText: getVal(rawData.instructorProfile.studentsTextAr, rawData.instructorProfile.studentsTextEn, rawData.instructorProfile.studentsText),
          skills: isAr ? (rawData.instructorProfile.skillsAr || rawData.instructorProfile.skills || []) : (rawData.instructorProfile.skillsEn || rawData.instructorProfile.skills || [])
        } : null,
        requirements: (rawData.requirements || []).map(req => ({ ...req, title: getVal(req.titleAr, req.titleEn, req.title), desc: getVal(req.descAr, req.descEn, req.desc) })),
        curriculum: (rawData.curriculum || []).map(curr => ({
          ...curr,
          week: getVal(curr.weekAr, curr.weekEn, curr.week), title: getVal(curr.titleAr, curr.titleEn, curr.title), duration: getVal(curr.durationAr, curr.durationEn, curr.duration),
          topics: (curr.topics || []).map(t => ({ ...t, name: getVal(t.nameAr, t.nameEn, t.name), duration: getVal(t.durationAr, t.durationEn, t.duration) }))
        })),
        enrollment: rawData.enrollment ? { features: isAr ? (rawData.enrollment.featuresAr || rawData.enrollment.features || []) : (rawData.enrollment.featuresEn || rawData.enrollment.features || []), timer: getVal(rawData.enrollment.timerAr, rawData.enrollment.timerEn, rawData.enrollment.timer) } : null
      });
    }
  }, [rawData, lang]);

  const isRTL = lang === 'ar'; // تحديد اتجاه الواجهة بناءً على اللغة

  // عرض صفحة الخطأ في حال عدم وجود الكورس
  if (status === 'not_found') {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col font-sans">
        <StudentNavbar activePage="courses" />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 p-10 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-lg font-bold text-capsule-navy">{ui.notFound}</p>
          <Link to="/courses-overview" className="text-capsule-teal font-semibold underline">{ui.backToCourses}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capsule-bg flex flex-col font-sans transition-colors duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
      <StudentNavbar activePage="courses" />
      <main className="flex-grow">
        <CourseHero lang={lang} ui={ui} course={course} />
        {course && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* قسم التفاصيل الأيمن */}
              <div className="lg:col-span-2 space-y-8">
                <CourseStats ui={ui} course={course} />
                <CourseOverview ui={ui} course={course} />
                <CourseCurriculum ui={ui} course={course} />
                <CourseInstructor ui={ui} course={course} />
                <CourseRequirements ui={ui} course={course} />
              </div>
              {/* كرت الدفع الجانبي المثبت */}
              <div className="lg:sticky lg:top-24"><EnrollmentCard ui={ui} course={course} isRTL={isRTL} /></div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// 1. مكون الهيرو الرئيسي (الواجهة العلوية للكورس)
function CourseHero({ lang, ui, course }) {
  if (!course) return <section className="w-full bg-gradient-to-br from-[#164961] via-[#1a5570] to-[#2B636B] py-24 text-white text-center">{ui.loading}</section>;
  const ratingRounded = Math.round(course.rating || 0);
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#164961] via-[#1a5570] to-[#2B636B] py-16 lg:py-24 text-white">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-45 w-96 h-96 rounded-full bg-[#FFD369] opacity-15 blur-[100px]" /></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="inline-block px-3 py-1.5 mb-6 rounded-full text-xs font-semibold bg-white/10 text-[#FFD369] border border-white/10">{course.category}</div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">{course.title}</h1>
        <p className="text-base sm:text-lg text-white/85 mb-6 leading-relaxed">{course.subtitle || course.description}</p>
        <div className="flex items-center gap-2 mb-8 bg-black/15 p-2 rounded-xl inline-flex border border-white/5">
          <div className="flex items-center text-[#FFD369]">{[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-5 h-5 ${i < ratingRounded ? '' : 'opacity-30'}`} />)}</div>
          <span className="text-sm font-medium px-1">{course.rating ? `${course.rating} (${ui.ratingReviews})` : ui.ratingReviews}</span>
        </div>
        {/* بيانات الكورس الوصفية (التحديث والمستوى واللغة) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          {[
            { label: ui.metaUpdated, val: course.updated || '—', icon: CalendarDaysIcon },
            { label: ui.metaLevel, val: course.level || '—', icon: ChartBarIcon },
            { label: ui.metaLanguage, val: course.language || '—', icon: LanguageIcon }
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="p-2 rounded-lg bg-[#387B84]/40 text-[#FFD369]"><m.icon className="w-5 h-5" /></div>
              <div className="flex flex-col"><span className="text-xs text-white/60">{m.label}</span><span className="text-sm font-medium">{m.val}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 2. مكون الإحصائيات السريعة (المدة، الطلاب، التقييم، السعر)
function CourseStats({ ui, course }) {
  const cards = [
    { key: 'duration', label: ui.statsDuration, val: course.duration || '—', icon: ClockIcon, color: 'from-cyan-500 to-blue-600', bg: 'bg-cyan-50', text: 'text-cyan-600' },
    { key: 'students', label: ui.statsStudents, val: course.students ?? 0, icon: UsersIcon, color: 'from-purple-500 to-indigo-600', bg: 'bg-purple-50', text: 'text-purple-600' },
    { key: 'rating', label: ui.statsRating, val: course.rating ? course.rating : '—', icon: AcademicCapIcon, color: 'from-emerald-400 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { key: 'price', label: ui.statsPrice, val: course.price === 0 ? ui.free : course.price, icon: VideoCameraIcon, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-600' }
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((cfg) => {
        const Icon = cfg.icon;
        return (
          <div key={cfg.key} className="group relative bg-white p-5 rounded-2xl border border-gray-100 shadow-md overflow-hidden transform hover:-translate-y-1 transition-all">
            <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${cfg.color}`} />
            <div className={`p-3 rounded-xl inline-block ${cfg.bg} ${cfg.text}`}><Icon className="w-6 h-6 stroke-[2]" /></div>
            <div className="space-y-1 mt-4">
              <h3 className={`text-xl font-black bg-gradient-to-r ${cfg.color} bg-clip-text text-transparent`}>{cfg.val}</h3>
              <p className="text-xs font-semibold text-capsule-navy/70 leading-snug">{cfg.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 3. مكون مخرجات التعلم (ماذا ستتعلم)
function CourseOverview({ ui, course }) {
  const outcomes = course.outcomes || [];
  if (outcomes.length === 0) return null;
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-capsule-teal to-cyan-500" />
      <div className="space-y-3 mb-8">
        <h2 className="text-xl font-black text-capsule-navy flex items-center gap-3"><span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-capsule-teal to-cyan-600" />{ui.overviewTitle}</h2>
        <p className="text-sm text-capsule-navy/75 leading-relaxed">{course.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outcomes.map((outcome, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-capsule-bg/40 to-white border border-gray-50 hover:border-capsule-teal/20 transition-all group">
            <CheckCircleIcon className="w-6 h-6 text-capsule-teal group-hover:scale-110 transition-transform flex-shrink-0" />
            <p className="text-sm font-semibold text-capsule-navy/85 leading-relaxed">{outcome}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 4. مكون المنهج الدراسي القابل للتوسيع والإغلاق (Curriculum Accordion)
function CourseCurriculum({ ui, course }) {
  const modules = course.curriculum || [];
  const [expanded, setExpanded] = useState([]);
  // فتح القسم الأول تلقائياً عند التحميل
  useEffect(() => { if (modules.length && expanded.length === 0) setExpanded([modules[0].id]); }, [modules]);
  if (modules.length === 0) return null;
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-capsule-teal" />
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-black text-capsule-navy flex items-center gap-3"><span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600" />{ui.curriculumTitle}</h2>
          <p className="text-sm text-capsule-navy/70 mt-1">{ui.curriculumSubtitle}</p>
        </div>
        <div className="flex gap-3 text-xs font-bold self-start">
          <button onClick={() => setExpanded(modules.map(m => m.id))} className="text-capsule-teal bg-capsule-bg px-3 py-1.5 rounded-lg">{ui.expandAll}</button>
          <button onClick={() => setExpanded([])} className="text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">{ui.collapseAll}</button>
        </div>
      </div>
      <div className="space-y-4">
        {modules.map((module) => {
          const isOpen = expanded.includes(module.id);
          return (
            <div key={module.id} className={`border rounded-xl transition-all ${isOpen ? 'border-capsule-teal/30 bg-capsule-bg/20' : 'border-gray-100'}`}>
              <button onClick={() => setExpanded(isOpen ? expanded.filter(id => id !== module.id) : [...expanded, module.id])} className="w-full flex items-center justify-between p-4 text-start">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="px-2.5 py-1 text-xs font-bold text-white rounded-md bg-gradient-to-r from-capsule-navy to-[#1a5570]">{module.week}</span>
                  <h3 className="text-sm font-bold text-capsule-navy">{module.title}</h3>
                </div>
                <div className="flex items-center gap-3 ml-4 mr-4">
                  <span className="hidden sm:inline-block text-xs text-capsule-navy/60 bg-white border border-gray-100 px-2 py-0.5 rounded-md">{module.topics.length} {ui.lessons} • {module.duration}</span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180 text-capsule-teal' : ''}`} />
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[1000px] border-t border-gray-100/70' : 'max-h-0'}`}>
                <div className="p-4 space-y-3 bg-white/60">
                  {module.topics.map((topic, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-50 shadow-xs">
                      <div className="flex items-center gap-3">
                        {topic.type === 'video' ? <PlayIcon className="w-4 h-4 text-cyan-500" /> : topic.type === 'code' ? <CodeBracketSquareIcon className="w-4 h-4 text-amber-500" /> : <DocumentTextIcon className="w-4 h-4 text-purple-500" />}
                        <span className="text-xs sm:text-sm text-capsule-navy/90">{topic.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-400">{topic.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// 5. مكون السيرة الذاتية وخبرات المدرب
function CourseInstructor({ ui, course }) {
  const profile = course.instructorProfile;
  if (!profile) return null;
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <h2 className="text-xl font-black text-capsule-navy flex items-center gap-3 mb-8"><span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-amber-400 to-orange-500" />{ui.instructorTitle}</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-capsule-teal to-purple-600 shadow-lg">
            <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-bold text-3xl">
                {profile.avatarLabel || (course.instructor ? course.instructor.slice(0, 2).toUpperCase() : '')}
              </div>
            </div>
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{ui.verifiedExpert}</span>
        </div>
        <div className="flex-grow text-center md:text-start space-y-4">
          <div><h3 className="text-xl font-black text-capsule-navy">{course.instructor}</h3><p className="text-sm font-bold text-capsule-teal">{profile.role}</p></div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs font-bold text-gray-500">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border">{profile.ratingText}</div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border">{profile.studentsText}</div>
          </div>
          <p className="text-sm text-capsule-navy/75 leading-relaxed">{profile.bio}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
            {(profile.skills || []).map((s, i) => <span key={i} className="px-2.5 py-1 rounded-xl text-xs font-bold bg-gray-50 border text-gray-600">#{s}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. مكون المتطلبات المسبقة للكورس
function CourseRequirements({ ui, course }) {
  const items = course.requirements || [];
  const icons = { code: CodeBracketIcon, cpu: CpuChipIcon, shield: ShieldCheckIcon };
  if (items.length === 0) return null;
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
      <div className="mb-8"><h2 className="text-xl font-black text-capsule-navy flex items-center gap-3"><span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-purple-600" />{ui.requirementsTitle}</h2><p className="text-sm text-capsule-navy/70 mt-1">{ui.requirementsSubtitle}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const Comp = icons[item.type] || ShieldCheckIcon;
          return (
            <div key={item.id} className="p-5 rounded-2xl border bg-white shadow-xs hover:-translate-y-1 transition-all border-gray-100">
              <div className="p-3 rounded-xl inline-block mb-4 bg-capsule-bg text-capsule-teal"><Comp className="w-6 h-6 stroke-[2]" /></div>
              <h3 className="text-base font-extrabold text-capsule-navy mb-2">{item.title}</h3>
              <p className="text-xs font-medium text-capsule-navy/70 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// 7. كرت التسجيل والاشتراك الجانبي (المثبت) المسؤول عن إضافة الكورس للسلة والذهاب إليها
function EnrollmentCard({ ui, course, isRTL }) {
  const navigate = useNavigate();
  const { id } = useParams(); // جلب معرف الكورس من الرابط لاستخدامه كـ id فريد بالسلة عند الحاجة
  const enrollment = course.enrollment || {};
  const isFree = course.price === 0;

  // تم التعديل: إضافة الكورس إلى السلة (localStorage) ثم الانتقال لصفحة السلة مباشرة
  const handleEnroll = () => {
    const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    const newCourse = {
      id: course.id || id || Date.now(), // استخدام أيدي الكورس أو معرف الرابط أو قيمة فريدة
      title: course.title,
      category: course.category,
      duration: course.duration || '—',
      price: course.price || 0
    };

    const isAlreadyInCart = currentCart.some(item => item.id === newCourse.id);
    if (!isAlreadyInCart) {
      currentCart.push(newCourse);
      localStorage.setItem('cartItems', JSON.stringify(currentCart));
    }

    // التوجيه لصفحة السلة مباشرة
    navigate('/cart');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-3xl font-black text-capsule-navy">{isFree ? ui.free : course.price}</h3>
          {course.originalPrice > (course.price || 0) && <span className="text-sm font-bold text-gray-400 line-through">{course.originalPrice}</span>}
          {course.discount && <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-md">{course.discount}</span>}
        </div>
        <h4 className="text-lg font-bold text-capsule-navy">{course.title}</h4>
      </div>
      <ul className="space-y-4 mb-8">
        {(enrollment.features || []).map((f, idx) => <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-capsule-navy/80"><CheckIcon className="w-5 h-5 text-capsule-teal" />{f}</li>)}
      </ul>
      <button onClick={handleEnroll} disabled={course.status === 'coming_soon' || course.status === 'completed'} className="w-full bg-gradient-to-r from-capsule-navy to-[#2B636B] text-white font-black py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all mb-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
        <SparklesIcon className="w-5 h-5 text-amber-400" />{ui.enrollBtn}
      </button>
      {enrollment.timer && <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 p-3 rounded-lg border"><ClockIcon className="w-4 h-4 text-purple-500" />{enrollment.timer}</div>}
    </div>
  );
}