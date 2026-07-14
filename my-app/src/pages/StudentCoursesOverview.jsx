import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Reusable Components
import StudentNavbar from "../components/StudentNavbar.jsx";
import Footer from "../components/Footer.jsx";
import Button from "../components/Button.jsx";

// Real courses data (not hardcoded) - same source used by CourseDetails.jsx
import { getCourses } from "../mocks/mockApi.js";

// Global Context
import { useLanguage } from "../context/LanguageContext.jsx";

// بصريات فقط (أيقونة/تدرج لوني/شارة) لكل بطاقة كورس حسب ترتيبها - لا علاقة لها بمحتوى الكورس نفسه
const CARD_VISUALS = [
  { icon: "⚛", badgeKey: "new", gradient: "from-capsule-navy to-[#343A60]" },
  { icon: "◐", badgeKey: "popular", gradient: "from-[#537E84] to-[#7FB1BC]" },
  { icon: "🐍", badgeKey: null, gradient: "from-capsule-navy to-[#343A60]" },
  { icon: "🛡", badgeKey: "new", gradient: "from-capsule-navy to-[#0e2f3f]" },
  { icon: "{ }", badgeKey: null, gradient: "from-capsule-navy to-[#343A60]" },
  { icon: "▤", badgeKey: "popular", gradient: "from-capsule-teal to-capsule-navy" },
  { icon: "◎", badgeKey: null, gradient: "from-capsule-dark-gold to-capsule-gold" },
  { icon: "▦", badgeKey: null, gradient: "from-[#3E5F44] to-[#537E84]" }
];

// Internal SVGs
function CapsuleMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="capsuleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7FB1BC" />
          <stop offset="0.5" stopColor="#164961" />
          <stop offset="1" stopColor="#537E84" />
        </linearGradient>
      </defs>
      <rect x="6" y="24" width="30" height="14" rx="7" transform="rotate(-18 21 31)" fill="url(#capsuleGrad)" />
      <rect x="28" y="26" width="30" height="14" rx="7" transform="rotate(-18 43 33)" fill="#FFD369" opacity="0.9" />
      <path d="M11 15 L13 20 L18 21 L13 22 L11 27 L9 22 L4 21 L9 20 Z" fill="#FFD369" />
    </svg>
  );
}

function Star({ filled }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#FFD369" : "none"} stroke="#FFD369" strokeWidth="1.5">
      <polygon points="12,2 15,9 22,9.5 16.5,14.5 18,22 12,18 6,22 7.5,14.5 2,9.5 9,9" />
    </svg>
  );
}

export default function CoursesOverview() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const l = t.coursesOverview;
  const isRTL = t.dir === "rtl";

  const [activeFilter, setActiveFilter] = useState("category");

  const filterGroups = useMemo(
    () => [
      { key: "category", label: l.filters.category, items: l.filterData.categories },
      { key: "level", label: l.filters.level, items: l.filterData.levels },
      { key: "price", label: l.filters.price, items: l.filterData.prices },
      { key: "duration", label: l.filters.duration, items: l.filterData.durations },
    ],
    [l]
  );

  // الكورسات الحقيقية تُجلب من الـ API، وليست بيانات ثابتة
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCourses() {
      setLoading(true);
      const response = await getCourses();
      if (isMounted && response.success) {
        setCourses(response.data.courses);
      }
      setLoading(false);
    }
    loadCourses();
    return () => { isMounted = false; };
  }, []);

  // دمج بيانات الكورس الحقيقية مع البصريات فقط (أيقونة/تدرج/شارة)
  const dynamicCourses = courses.map((c, i) => {
    const visuals = CARD_VISUALS[i % CARD_VISUALS.length];
    return {
      ...visuals,
      id: c.id,
      tag: c.category,
      title: c.title,
      desc: c.description,
      instructor: c.instructor,
      rating: c.rating,
      students: c.students,
      hours: c.duration,
      price: c.price
    };
  });

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased flex flex-col" dir={t.dir} lang={lang}>
<StudentNavbar activePage="courses" />

      <main className="flex-grow">
        
        {/* ---------- HERO ---------- */}
        <section className="relative bg-gradient-to-tr from-[#7FB1BC] via-capsule-navy to-[#537E84] overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center gap-10 px-6 py-14 lg:py-20 min-h-[320px] relative z-10">
            <div className="flex-1 text-white z-10">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/30 px-3.5 py-1.5 rounded-full text-[13px] font-bold mb-4.5">
                <CapsuleMark size={18} /> {l.hero.eyebrow}
              </span>
              <h1 className="text-4xl font-extrabold leading-tight mb-3.5">{l.hero.title}</h1>
              <p className="text-[15.5px] leading-relaxed opacity-90 max-w-lg mb-6.5">{l.hero.desc}</p>
              <div className="flex gap-3.5">
                <Button variant="primary">{l.hero.cta}</Button>
                <button className="bg-transparent text-white border-2 border-white/60 font-bold px-6 py-3 rounded-full text-[14.5px] cursor-pointer hover:bg-white/10 transition">
                  {l.hero.ctaGhost}
                </button>
              </div>
            </div>
            
            {/* Hero Art - Hidden on small screens */}
            <div className="hidden lg:block flex-1 relative h-[220px]">
              <div className={`absolute w-[260px] h-[90px] bg-white/15 border-2 border-white/30 rounded-full top-8 ${t.dir === 'rtl' ? 'rotate-[18deg] right-5' : 'rotate-[-18deg] left-5'}`} />
              <div className={`absolute w-[200px] h-[70px] bg-capsule-gold opacity-85 rounded-full top-[100px] ${t.dir === 'rtl' ? 'rotate-[18deg] right-[130px]' : 'rotate-[-18deg] left-[130px]'}`} />
              <div className={`absolute text-capsule-gold text-3xl top-5 ${t.dir === 'rtl' ? 'right-[110px]' : 'left-[110px]'}`}>✦</div>
            </div>
          </div>
        </section>

        {/* ---------- SEARCH + FILTER BAR ---------- */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 bg-capsule-bg border border-gray-200 rounded-full px-4 py-2 flex-1 min-w-[220px]">
              <span className="text-gray-400">🔍</span>
              <input 
                type="text" 
                placeholder={l.searchPlaceholder} 
                className="bg-transparent border-none outline-none w-full text-sm text-capsule-navy placeholder:text-gray-400"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {filterGroups.map((g) => (
                <button
                  key={g.key}
                  className={`border rounded-full px-3.5 py-2 text-[13px] font-semibold cursor-pointer transition-colors ${
                    activeFilter === g.key 
                      ? "border-capsule-teal text-capsule-teal bg-capsule-teal/10" 
                      : "border-gray-200 bg-white text-capsule-navy hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveFilter(g.key)}
                >
                  {g.label} ⌄
                </button>
              ))}
            </div>
            
            <button className="bg-capsule-gold text-capsule-navy font-bold px-4 py-2 rounded-full text-[13px] cursor-pointer hover:bg-yellow-500 transition-colors">
              {l.filters.apply}
            </button>
          </div>
        </section>

        {/* ---------- MAIN CONTENT ---------- */}
        <section className="max-w-7xl mx-auto px-6 pt-7 pb-15 flex flex-col lg:flex-row gap-7 items-start">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-[250px] flex-shrink-0 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {filterGroups.map((g) => (
              <div className="bg-white border border-gray-200 rounded-2xl p-4 min-w-[200px]" key={g.key}>
                <div className="flex justify-between items-center font-bold text-[14.5px] text-capsule-navy mb-2.5">
                  <span>{g.label}</span>
                  <span className="text-gray-400">⌃</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {g.items.map((it, idx) => (
                    <li key={idx}>
                      <label className="flex items-center gap-2 text-[13.5px] cursor-pointer text-gray-700">
                        <input type="checkbox" defaultChecked={idx === 0} className="accent-capsule-teal w-4 h-4" />
                        <span>{it.label}</span>
                        <span className={`text-[12px] text-[#537E84] ${t.dir === 'rtl' ? 'mr-auto' : 'ml-auto'}`}>
                          {it.count}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button className="bg-white border border-gray-200 rounded-xl p-2.5 font-bold text-capsule-navy cursor-pointer text-[13.5px] hover:bg-gray-50 transition min-w-[200px] lg:min-w-0">
              {l.filters.clear}
            </button>
          </aside>

          {/* Results Area */}
          <div className="flex-1 min-w-0 w-full">
            
            <div className="flex justify-between items-center mb-4.5 flex-wrap gap-2.5">
              <span className="font-bold text-capsule-navy">{l.results.label}</span>
              <div className="flex items-center gap-2 text-[13.5px]">
                <span className="text-gray-600">{l.results.sortLabel}</span>
                <select className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] bg-white text-capsule-navy focus:outline-none focus:border-capsule-teal">
                  {l.results.sortOptions.map((o, i) => (
                    <option key={i}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {dynamicCourses.map((c, i) => (
                <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-capsule-navy/10" key={i}>
                  
                  {/* Card Thumbnail */}
                  <div className={`h-[120px] relative flex items-center justify-center bg-gradient-to-br ${c.gradient}`}>
                    <span className="text-[34px] text-white drop-shadow-md">{c.icon}</span>
                    {c.badgeKey && (
                      <span className={`absolute top-2.5 bg-capsule-gold text-capsule-navy text-[11px] font-extrabold px-2.5 py-1 rounded-full ${t.dir === 'rtl' ? 'right-2.5' : 'left-2.5'}`}>
                        {l.results.badges[c.badgeKey]}
                      </span>
                    )}
                    <button className={`absolute top-2.5 bg-white/85 border-none rounded-full w-7 h-7 cursor-pointer flex items-center justify-center text-gray-500 hover:text-red-500 transition ${t.dir === 'rtl' ? 'left-2.5' : 'right-2.5'}`} aria-label="wishlist">
                      ♡
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <span className="text-[11px] font-bold uppercase text-capsule-teal tracking-wide">{c.tag}</span>
                    <h3 className="text-base font-bold text-capsule-navy leading-snug m-0">{c.title}</h3>
                    <p className="text-[13px] text-gray-500 m-0 leading-relaxed line-clamp-2">{c.desc}</p>
                    
                    <div className="flex items-center gap-1.5 text-[12.5px] text-capsule-navy mt-1">
                      <span className="w-4 h-4 rounded-full bg-[#7FB1BC] inline-block" />
                      <span className="font-medium">{c.instructor}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[12.5px] text-gray-500">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} filled={n <= Math.round(c.rating)} />
                      ))}
                      <span className={`font-medium ${t.dir === 'rtl' ? 'mr-1' : 'ml-1'}`}>
                        {c.rating || '—'}
                      </span>
                    </div>

                    <div className="flex gap-3.5 text-[12px] text-gray-500 font-medium mt-1 mb-2">
                      <span>⏱ {c.hours}</span>
                      <span>👥 {c.students} {l.results.studentsLabel}</span>
                    </div>

                    {/* Card Footer */}
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-dashed border-gray-200">
                      <span className={`font-extrabold text-[14px] ${c.price === 0 ? 'text-[#3E5F44]' : 'text-capsule-navy'}`}>
                        {c.price === 0 ? l.results.free : `${c.price} ${l.results.sar}`}
                      </span>
                      
<button
onClick={() => navigate(`/course-details/${c.id}`)}

className="border-2 border-capsule-teal text-capsule-teal bg-transparent rounded-full px-3.5 py-1.5 text-[12.5px] font-bold cursor-pointer hover:bg-capsule-teal hover:text-white transition-colors"
>
  {l.results.viewDetails}
</button>

                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-9 flex-wrap">
              <button className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-[13px] cursor-pointer text-capsule-navy font-medium hover:bg-gray-50">
                {isRTL ? "›" : "‹"} {l.results.prev}
              </button>
              {[1, 2, 3, 4].map((n) => (
                <button key={n} className={`border rounded-lg px-3 py-2 text-[13px] cursor-pointer font-medium transition-colors ${
                  n === 1 
                    ? "bg-capsule-teal text-white border-capsule-teal" 
                    : "border-gray-200 bg-white text-capsule-navy hover:bg-gray-50"
                }`}>
                  {n}
                </button>
              ))}
              <span className="text-gray-500 px-1">…</span>
              <button className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-[13px] cursor-pointer text-capsule-navy font-medium hover:bg-gray-50">
                8
              </button>
              <button className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-[13px] cursor-pointer text-capsule-navy font-medium hover:bg-gray-50">
                {l.results.next} {isRTL ? "‹" : "›"}
              </button>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
