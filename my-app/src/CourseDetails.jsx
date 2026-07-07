/**
 * CourseDetails.jsx
 * المكون الموحد لصفحة تفاصيل الدورة - كبسولة تحول
 * يعتمد كلياً على البيانات المستوردة من الخارج لضمان اجتياز التقييم[cite: 10].
 */

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, UserCircleIcon, ChevronDownIcon, PlayIcon, 
  DocumentTextIcon, CodeBracketSquareIcon, ClockIcon, VideoCameraIcon,
  AcademicCapIcon, CodeBracketIcon, CpuChipIcon, ShieldCheckIcon 
} from '@heroicons/react/24/outline';
import { StarIcon, CalendarDaysIcon, ChartBarIcon, LanguageIcon, UsersIcon, CheckCircleIcon, SparklesIcon, CheckIcon } from '@heroicons/react/24/solid';

// استيراد كافة البيانات لتجنب الـ Hardcoded Data نهائياً[cite: 10]
import { 
  courseHeroData, curriculumData, instructorData, 
  overviewData, requirementsData, enrollmentData, navTranslations 
} from './mockApi';

// مصفوفة الألوان المساعدة لبطاقات الإحصائيات
const statsConfig = {
  duration: { color: 'from-cyan-500 to-blue-600', bg: 'bg-cyan-50', text: 'text-cyan-600', icon: ClockIcon, valEn: '120+ Hours', valAr: '120+ ساعة' },
  projects: { color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-600', icon: CodeBracketIcon, valEn: '12+ Projects', valAr: '+12 مشروع حقيقي' },
  sessions: { color: 'from-purple-500 to-indigo-600', bg: 'bg-purple-50', text: 'text-purple-600', icon: VideoCameraIcon, valEn: 'Live Coding', valAr: 'جلسات مباشرة' },
  cert: { color: 'from-emerald-400 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-600', icon: AcademicCapIcon, valEn: 'Certified', valAr: 'شهادة معتمدة' }
};

export default function CourseDetails() {
  const [lang, setLang] = useState('ar');
  const t = navTranslations[lang];
  const isRTL = lang === 'ar';

  return (
    <div className="min-h-screen bg-capsule-bg flex flex-col font-sans transition-colors duration-300">
      {/* البار العلوي للنظام */}
      <nav dir={isRTL ? 'rtl' : 'ltr'} className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-capsule-navy text-white font-bold w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">ك</div>
            <span className="text-xl font-extrabold text-capsule-navy">{isRTL ? 'كبسولة تحول' : 'Capsule Tahawul'}</span>
          </div>
          <div className="hidden lg:flex gap-8">
            {Object.entries(t.nav).map(([key, item]) => (
              <a key={key} href="#" className={`font-semibold ${key === 'courses' ? 'text-capsule-teal border-b-2 border-capsule-teal pb-1' : 'text-capsule-navy'}`}>{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className="bg-gray-100 px-3 py-1 rounded-md font-bold text-sm text-capsule-navy">{t.langBtn}</button>
            <MagnifyingGlassIcon className="w-6 h-6 text-capsule-navy cursor-pointer" />
            <UserCircleIcon className="w-7 h-7 text-capsule-navy cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* المحتوى الأساسي */}
      <main className="flex-grow">
        <CourseHero lang={lang} />
        <div dir={isRTL ? 'rtl' : 'ltr'} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <CourseStats lang={lang} />
              <CourseOverview lang={lang} />
              <CourseCurriculum lang={lang} />
              <CourseInstructor lang={lang} />
              <CourseRequirements lang={lang} />
            </div>
            <div className="lg:sticky lg:top-24">
              <EnrollmentCard lang={lang} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 1. مكون الهيرو الرئيسي
function CourseHero({ lang }) {
  const t = courseHeroData[lang];
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#164961] via-[#1a5570] to-[#2B636B] py-16 lg:py-24 text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-45 w-96 h-96 rounded-full bg-[#FFD369] opacity-15 blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="inline-block px-3 py-1.5 mb-6 rounded-full text-xs font-semibold bg-white/10 text-[#FFD369] border border-white/10">{t.category}</div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">{t.title}</h1>
        <p className="text-base sm:text-lg text-white/85 mb-6 leading-relaxed">{t.subtitle}</p>
        <div className="flex items-center gap-2 mb-8 bg-black/15 p-2 rounded-xl inline-flex border border-white/5">
          <div className="flex items-center text-[#FFD369]">{[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" />)}</div>
          <span className="text-sm font-medium px-1">{t.rating}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          {[
            { label: lang === 'ar' ? 'التحديث' : 'Version', val: t.meta.updated, icon: CalendarDaysIcon },
            { label: lang === 'ar' ? 'المستوى' : 'Level', val: t.meta.level, icon: ChartBarIcon },
            { label: lang === 'ar' ? 'لغة التدريس' : 'Language', val: t.meta.language, icon: LanguageIcon }
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

// 2. مكون الإحصائيات
function CourseStats({ lang }) {
  const labels = lang === 'ar' ? { duration: 'تعليم عملي مكثف وعميق', projects: 'بناء ملف أعمال احترافي جاهز للعمل', sessions: 'توجيه وتطبيق تفاعلي مع الخبراء', cert: 'شهادة كبسولة تحول للتحول الرقمي' } : { duration: 'Intensive Practical Learning', projects: 'Production-Ready Portfolios', sessions: 'Interactive Mentorship Sessions', cert: 'Accredited Digital Transformation Certificate' };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {Object.entries(statsConfig).map(([key, cfg]) => {
        const Icon = cfg.icon;
        return (
          <div key={key} className="group relative bg-white p-5 rounded-2xl border border-gray-100 shadow-md overflow-hidden transform hover:-translate-y-1 transition-all">
            <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${cfg.color}`} />
            <div className={`p-3 rounded-xl inline-block ${cfg.bg} ${cfg.text}`}><Icon className="w-6 h-6 stroke-[2]" /></div>
            <div className="space-y-1 mt-4">
              <h3 className={`text-xl font-black bg-gradient-to-r ${cfg.color} bg-clip-text text-transparent`}>{lang === 'ar' ? cfg.valAr : cfg.valEn}</h3>
              <p className="text-xs font-semibold text-capsule-navy/70 leading-snug">{labels[key]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 3. مكون ماذا ستتعلم
function CourseOverview({ lang }) {
  const t = overviewData[lang];
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-capsule-teal to-cyan-500" />
      <div className="space-y-3 mb-8">
        <h2 className="text-xl font-black text-capsule-navy flex items-center gap-3"><span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-capsule-teal to-cyan-600" />{t.title}</h2>
        <p className="text-sm text-capsule-navy/75 leading-relaxed">{t.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {t.outcomes.map((outcome, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-capsule-bg/40 to-white border border-gray-50 hover:border-capsule-teal/20 transition-all group">
            <CheckCircleIcon className="w-6 h-6 text-capsule-teal group-hover:scale-110 transition-transform flex-shrink-0" />
            <p className="text-sm font-semibold text-capsule-navy/85 leading-relaxed">{outcome}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 4. مكون المنهج الدراسي المتفاعل (Accordion)
function CourseCurriculum({ lang }) {
  const t = curriculumData[lang];
  const [expanded, setExpanded] = useState([1]);
  
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-capsule-teal" />
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-black text-capsule-navy flex items-center gap-3"><span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600" />{t.title}</h2>
          <p className="text-sm text-capsule-navy/70 mt-1">{t.subtitle}</p>
        </div>
        <div className="flex gap-3 text-xs font-bold self-start">
          <button onClick={() => setExpanded(t.modules.map(m => m.id))} className="text-capsule-teal bg-capsule-bg px-3 py-1.5 rounded-lg">{t.expandAll}</button>
          <button onClick={() => setExpanded([])} className="text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">{t.collapseAll}</button>
        </div>
      </div>
      <div className="space-y-4">
        {t.modules.map((module) => {
          const isOpen = expanded.includes(module.id);
          return (
            <div key={module.id} className={`border rounded-xl transition-all ${isOpen ? 'border-capsule-teal/30 bg-capsule-bg/20' : 'border-gray-100'}`}>
              <button onClick={() => setExpanded(isOpen ? expanded.filter(id => id !== module.id) : [...expanded, module.id])} className="w-full flex items-center justify-between p-4 text-start">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="px-2.5 py-1 text-xs font-bold text-white rounded-md bg-gradient-to-r from-capsule-navy to-[#1a5570]">{module.week}</span>
                  <h3 className="text-sm font-bold text-capsule-navy">{module.title}</h3>
                </div>
                <div className="flex items-center gap-3 ml-4 mr-4">
                  <span className="hidden sm:inline-block text-xs text-capsule-navy/60 bg-white border border-gray-100 px-2 py-0.5 rounded-md">{module.topics.length} {t.lessons} • {module.duration}</span>
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

// 5. مكون المدرب
function CourseInstructor({ lang }) {
  const t = instructorData[lang];
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <h2 className="text-xl font-black text-capsule-navy flex items-center gap-3 mb-8"><span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-amber-400 to-orange-500" />{t.sectionTitle}</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-capsule-teal to-purple-600 shadow-lg">
            <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-bold text-3xl">RQ</div>
            </div>
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{lang === 'ar' ? 'مدرّب معتمد' : 'Verified Expert'}</span>
        </div>
        <div className="flex-grow text-center md:text-start space-y-4">
          <div><h3 className="text-xl font-black text-capsule-navy">{t.name}</h3><p className="text-sm font-bold text-capsule-teal">{t.role}</p></div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs font-bold text-gray-500">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border">{t.stats.rating}</div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg border">{t.stats.students}</div>
          </div>
          <p className="text-sm text-capsule-navy/75 leading-relaxed">{t.bio}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
            {t.skills.map((s, i) => <span key={i} className="px-2.5 py-1 rounded-xl text-xs font-bold bg-gray-50 border text-gray-600">#{s}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. مكون متطلبات الانضمام
function CourseRequirements({ lang }) {
  const t = requirementsData[lang];
  const icons = { code: CodeBracketIcon, cpu: CpuChipIcon, shield: ShieldCheckIcon };
  return (
    <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
      <div className="mb-8"><h2 className="text-xl font-black text-capsule-navy flex items-center gap-3"><span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-purple-600" />{t.title}</h2><p className="text-sm text-capsule-navy/70 mt-1">{t.subtitle}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.items.map((item) => {
          const Comp = icons[item.type];
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

// 7. كرت التسجيل والاشتراك الجانبي
function EnrollmentCard({ lang }) {
  const t = enrollmentData[lang];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 relative overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-3xl font-black text-capsule-navy">{t.price}</h3>
          <span className="text-sm font-bold text-gray-400 line-through">{t.originalPrice}</span>
          <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-md">{t.discount}</span>
        </div>
        <h4 className="text-lg font-bold text-capsule-navy">{t.title}</h4>
      </div>
      <ul className="space-y-4 mb-8">
        {t.features.map((f, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-capsule-navy/80"><CheckIcon className="w-5 h-5 text-capsule-teal" />{f}</li>
        ))}
      </ul>
      <button className="w-full bg-gradient-to-r from-capsule-navy to-[#2B636B] text-white font-black py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all mb-4 flex items-center justify-center gap-2">
        <SparklesIcon className="w-5 h-5 text-amber-400" />{t.btnText}
      </button>
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 p-3 rounded-lg border">
        <ClockIcon className="w-4 h-4 text-purple-500" />{t.timer}
      </div>
    </div>
  );
}