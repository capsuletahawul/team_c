import React, { useState, useMemo } from "react";

/**
 * Capsule Tahawul — Courses Overview
 * -----------------------------------
 * Bilingual (AR/EN) courses listing page, built to the Capsule Tahawul
 * brand identity: navy/teal palette, gold accent, capsule (pill) motif
 * echoing the brand mark — two interlocking capsules with a spark.
 *
 * Fonts: the brand's exact fonts (Air Strip Arabic / RH Zak) are private
 * brand fonts and aren't available on public font CDNs, so this file
 * substitutes the closest open-source equivalents (Tajawal for display,
 * IBM Plex Sans Arabic for body, Open Sans for Latin). Swap the
 * @font-face / Google Fonts import below for the real files whenever
 * you have them — nothing else needs to change.
 *
 * Drop this component anywhere in a React app. It's self-contained:
 * all styling lives in the <style> tag at the bottom, so it works
 * whether or not the host project uses Tailwind.
 */

const COLORS = {
  navy: "#164961",
  navyDeep: "#343A60",
  teal: "#387B84",
  tealLight: "#7FB1BC",
  tealMid: "#537E84",
  gold: "#FFD369",
  goldDeep: "#D19E22",
  green: "#3E5F44",
  bg: "#F0F5F9",
  border: "#C9D6DF",
};

const COPY = {
  ar: {
    dir: "rtl",
    brand: "كبسولة تحول",
    nav: ["الرئيسية", "الدورات", "المعسكرات", "الشركات", "من نحن", "تواصل معنا"],
    heroEyebrow: "منصة كبسولة تحول",
    heroTitle: "دورات تُشكّل مسارك المهني",
    heroDesc:
      "نسد الفجوة بين ما تتعلمه أكاديميًا وما يحتاجه سوق العمل، عبر معسكرات ودورات مجانية ومدفوعة يقودها خبراء الصناعة.",
    heroCta: "استعرض الدورات",
    heroCtaGhost: "انضم كشريك",
    searchPlaceholder: "ابحث عن دورة...",
    filters: {
      category: "التصنيف",
      level: "المستوى",
      price: "السعر",
      duration: "المدة",
      language: "اللغة",
      delivery: "طريقة التقديم",
      apply: "تطبيق الفلاتر",
      clear: "مسح كل الفلاتر",
    },
    categories: [
      { label: "جميع التصنيفات", count: 32 },
      { label: "برمجة", count: 12 },
      { label: "تصميم", count: 6 },
      { label: "علوم البيانات", count: 5 },
      { label: "إدارة أعمال", count: 4 },
      { label: "تسويق", count: 3 },
      { label: "أمن سيبراني", count: 2 },
    ],
    levels: [
      { label: "جميع المستويات", count: 32 },
      { label: "مبتدئ", count: 14 },
      { label: "متوسط", count: 12 },
      { label: "متقدم", count: 6 },
    ],
    prices: [
      { label: "جميع الأسعار", count: 32 },
      { label: "مجاني", count: 10 },
      { label: "مدفوع", count: 22 },
    ],
    durations: [
      { label: "أي مدة", count: 32 },
      { label: "٠ - ١٠ ساعات", count: 8 },
      { label: "١٠ - ٣٠ ساعة", count: 14 },
      { label: "٣٠+ ساعة", count: 10 },
    ],
    resultsLabel: "يعرض ٣٢ دورة",
    sortLabel: "ترتيب حسب:",
    sortOptions: ["الأكثر رواجًا", "الأحدث", "السعر: من الأقل", "التقييم"],
    free: "مجاني",
    sar: "ر.س",
    viewDetails: "عرض التفاصيل",
    hoursLabel: "ساعة",
    studentsLabel: "طالب",
    prev: "السابق",
    next: "التالي",
    footer: {
      about:
        "منصة سعودية تربط الطلاب بفرص التدريب العملي، وتبني جيلًا جاهزًا لسوق العمل.",
      quickLinks: "روابط سريعة",
      forLearners: "للمتعلمين",
      forCompanies: "للشركات",
      newsletter: "النشرة البريدية",
      newsletterDesc: "اشترك ليصلك جديد الدورات والعروض.",
      subscribe: "اشترك",
      emailPlaceholder: "بريدك الإلكتروني",
      quick: ["الرئيسية", "الدورات", "المعسكرات", "الشركات", "من نحن", "تواصل معنا"],
      learners: ["كيف تعمل المنصة", "مساري التعليمي", "الشهادات", "الأسئلة الشائعة"],
      companies: ["نشر وظيفة", "البحث عن كفاءات", "شركاؤنا", "تواصل مع المبيعات"],
      rights: "© ٢٠٢٦ كبسولة تحول. جميع الحقوق محفوظة.",
      legal: ["سياسة الخصوصية", "شروط الخدمة", "سياسة الكوكيز"],
    },
  },
  en: {
    dir: "ltr",
    brand: "Capsule Tahawul",
    nav: ["Home", "Courses", "Bootcamps", "Companies", "About Us", "Contact"],
    heroEyebrow: "Capsule Tahawul Platform",
    heroTitle: "Courses That Shape Your Career Path",
    heroDesc:
      "We close the gap between academic learning and what the job market actually needs — through free and paid courses and bootcamps led by industry experts.",
    heroCta: "Browse Courses",
    heroCtaGhost: "Become a Partner",
    searchPlaceholder: "Search courses...",
    filters: {
      category: "Category",
      level: "Level",
      price: "Price",
      duration: "Duration",
      language: "Language",
      delivery: "Delivery Mode",
      apply: "Apply Filters",
      clear: "Clear All Filters",
    },
    categories: [
      { label: "All Categories", count: 32 },
      { label: "Programming", count: 12 },
      { label: "Design", count: 6 },
      { label: "Data Science", count: 5 },
      { label: "Business", count: 4 },
      { label: "Marketing", count: 3 },
      { label: "Cybersecurity", count: 2 },
    ],
    levels: [
      { label: "All Levels", count: 32 },
      { label: "Beginner", count: 14 },
      { label: "Intermediate", count: 12 },
      { label: "Advanced", count: 6 },
    ],
    prices: [
      { label: "All Prices", count: 32 },
      { label: "Free", count: 10 },
      { label: "Paid", count: 22 },
    ],
    durations: [
      { label: "Any Duration", count: 32 },
      { label: "0 - 10 Hours", count: 8 },
      { label: "10 - 30 Hours", count: 14 },
      { label: "30+ Hours", count: 10 },
    ],
    resultsLabel: "Showing 32 courses",
    sortLabel: "Sort by:",
    sortOptions: ["Most Popular", "Newest", "Price: Low to High", "Rating"],
    free: "Free",
    sar: "SAR",
    viewDetails: "View Details",
    hoursLabel: "Hours",
    studentsLabel: "Students",
    prev: "Previous",
    next: "Next",
    footer: {
      about:
        "A Saudi platform connecting students with hands-on training opportunities, building a generation ready for the job market.",
      quickLinks: "Quick Links",
      forLearners: "For Learners",
      forCompanies: "For Companies",
      newsletter: "Newsletter",
      newsletterDesc: "Subscribe to get updates on new courses and offers.",
      subscribe: "Subscribe",
      emailPlaceholder: "Enter your email",
      quick: ["Home", "Courses", "Bootcamps", "Companies", "About Us", "Contact"],
      learners: ["How It Works", "My Learning", "Certifications", "FAQs"],
      companies: ["Post a Job", "Find Talent", "Our Partners", "Contact Sales"],
      rights: "© 2026 Capsule Tahawul. All rights reserved.",
      legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  },
};

const COURSES = [
  {
    icon: "⚛",
    tag: "programming",
    badge: { ar: "جديد", en: "New" },
    title: { ar: "أساسيات React", en: "React Fundamentals" },
    desc: {
      ar: "تعلّم مفاهيم React الأساسية وبناء تطبيقات ويب حديثة.",
      en: "Learn core React concepts and build modern web apps.",
    },
    instructor: { ar: "أحمد علي", en: "Ahmed Ali" },
    rating: 4.8,
    reviews: 320,
    hours: 18,
    students: 350,
    price: 0,
  },
  {
    icon: "◐",
    tag: "design",
    badge: { ar: "رائج", en: "Popular" },
    title: { ar: "أساسيات UI/UX", en: "UI/UX Design Essentials" },
    desc: {
      ar: "صمّم واجهات جذابة وسهلة الاستخدام من الصفر.",
      en: "Design beautiful, user-friendly interfaces from scratch.",
    },
    instructor: { ar: "سارة أحمد", en: "Sarah Ahmed" },
    rating: 4.9,
    reviews: 410,
    hours: 20,
    students: 480,
    price: 250,
  },
  {
    icon: "🐍",
    tag: "programming",
    badge: null,
    title: { ar: "بايثون للمبتدئين", en: "Python for Beginners" },
    desc: {
      ar: "ابدأ رحلتك في البرمجة مع بايثون خطوة بخطوة.",
      en: "Start your programming journey with Python step by step.",
    },
    instructor: { ar: "محمد خان", en: "Mohammed Khan" },
    rating: 4.7,
    reviews: 620,
    hours: 15,
    students: 700,
    price: 0,
  },
  {
    icon: "🛡",
    tag: "cybersecurity",
    badge: { ar: "جديد", en: "New" },
    title: { ar: "أساسيات الأمن السيبراني", en: "Cybersecurity Basics" },
    desc: {
      ar: "تعرّف على أساسيات الأمن السيبراني وحماية بياناتك.",
      en: "Learn the fundamentals of cybersecurity and stay safe online.",
    },
    instructor: { ar: "نورة المطيري", en: "Nora Almutairi" },
    rating: 4.6,
    reviews: 210,
    hours: 12,
    students: 260,
    price: 150,
  },
  {
    icon: "{ }",
    tag: "programming",
    badge: null,
    title: { ar: "أساسيات JavaScript", en: "JavaScript Essentials" },
    desc: {
      ar: "تمكّن من JavaScript وابنِ مواقع تفاعلية.",
      en: "Master JavaScript and build interactive websites.",
    },
    instructor: { ar: "فيصل الغامدي", en: "Faisal Alghamdi" },
    rating: 4.8,
    reviews: 540,
    hours: 16,
    students: 600,
    price: 0,
  },
  {
    icon: "▤",
    tag: "data",
    badge: { ar: "رائج", en: "Popular" },
    title: { ar: "تحليل البيانات باستخدام SQL", en: "Data Analysis with SQL" },
    desc: {
      ar: "حلّل البيانات واستخرج رؤى دقيقة باستخدام SQL.",
      en: "Analyze data and generate insights using SQL.",
    },
    instructor: { ar: "ريم عبدالله", en: "Reem Abdullah" },
    rating: 4.7,
    reviews: 310,
    hours: 14,
    students: 370,
    price: 200,
  },
  {
    icon: "◎",
    tag: "marketing",
    badge: null,
    title: { ar: "مبادئ التسويق الرقمي", en: "Digital Marketing 101" },
    desc: {
      ar: "تعلّم استراتيجيات التسويق الرقمي لتنمية علامتك التجارية.",
      en: "Learn digital marketing strategies to grow your brand.",
    },
    instructor: { ar: "حسن مالك", en: "Hassan Malik" },
    rating: 4.5,
    reviews: 290,
    hours: 10,
    students: 330,
    price: 100,
  },
  {
    icon: "▦",
    tag: "business",
    badge: null,
    title: { ar: "إكسل لريادة الأعمال", en: "Excel for Business" },
    desc: {
      ar: "طوّر إنتاجيتك باستخدام مهارات إكسل المتقدمة.",
      en: "Boost your productivity with advanced Excel skills.",
    },
    instructor: { ar: "لمى يوسف", en: "Lama Youssef" },
    rating: 4.6,
    reviews: 180,
    hours: 8,
    students: 220,
    price: 0,
  },
];

function CapsuleMark({ size = 40 }) {
  // Recreates the brand's twin-capsule + spark motif as inline SVG,
  // using the brand gradient so it can sit on light or dark surfaces.
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="capsuleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.tealLight} />
          <stop offset="0.5" stopColor={COLORS.navy} />
          <stop offset="1" stopColor={COLORS.tealMid} />
        </linearGradient>
      </defs>
      <rect x="6" y="24" width="30" height="14" rx="7" transform="rotate(-18 21 31)" fill="url(#capsuleGrad)" />
      <rect x="28" y="26" width="30" height="14" rx="7" transform="rotate(-18 43 33)" fill={COLORS.gold} opacity="0.9" />
      <path d="M11 15 L13 20 L18 21 L13 22 L11 27 L9 22 L4 21 L9 20 Z" fill={COLORS.gold} />
    </svg>
  );
}

function Star({ filled }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? COLORS.gold : "none"} stroke={COLORS.gold} strokeWidth="1.5">
      <polygon points="12,2 15,9 22,9.5 16.5,14.5 18,22 12,18 6,22 7.5,14.5 2,9.5 9,9" />
    </svg>
  );
}

export default function CoursesOverview() {
  const [lang, setLang] = useState("ar");
  const [activeFilter, setActiveFilter] = useState("category");
  const t = COPY[lang];
  const isRTL = t.dir === "rtl";

  const filterGroups = useMemo(
    () => [
      { key: "category", label: t.filters.category, items: t.categories },
      { key: "level", label: t.filters.level, items: t.levels },
      { key: "price", label: t.filters.price, items: t.prices },
      { key: "duration", label: t.filters.duration, items: t.durations },
    ],
    [t]
  );

  return (
    <div className="ct-root" dir={t.dir} lang={lang}>
      {/* ---------- NAVBAR ---------- */}
      <header className="ct-nav">
        <div className="ct-nav-inner">
          <div className="ct-brand">
            <CapsuleMark size={34} />
            <span className="ct-brand-text">{t.brand}</span>
          </div>
          <nav className="ct-nav-links">
            {t.nav.map((item, i) => (
              <a key={i} href="#" className={i === 1 ? "active" : ""}>
                {item}
              </a>
            ))}
          </nav>
          <div className="ct-nav-actions">
            <button
              className="ct-lang-toggle"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              aria-label="Toggle language"
            >
              {lang === "ar" ? "EN" : "AR"}
            </button>
            <button className="ct-icon-btn" aria-label="search">🔍</button>
            <button className="ct-avatar" aria-label="account">👤</button>
          </div>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="ct-hero">
        <div className="ct-hero-inner">
          <div className="ct-hero-copy">
            <span className="ct-eyebrow">
              <CapsuleMark size={18} /> {t.heroEyebrow}
            </span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroDesc}</p>
            <div className="ct-hero-ctas">
              <button className="ct-btn-primary">{t.heroCta}</button>
              <button className="ct-btn-ghost">{t.heroCtaGhost}</button>
            </div>
          </div>
          <div className="ct-hero-art" aria-hidden="true">
            <div className="ct-capsule-big" />
            <div className="ct-capsule-small" />
            <div className="ct-spark">✦</div>
          </div>
        </div>
      </section>

      {/* ---------- SEARCH + FILTER BAR ---------- */}
      <section className="ct-searchbar">
        <div className="ct-searchbar-inner">
          <div className="ct-search-input">
            <span>🔍</span>
            <input type="text" placeholder={t.searchPlaceholder} />
          </div>
          <div className="ct-pill-filters">
            {filterGroups.map((g) => (
              <button
                key={g.key}
                className={`ct-pill ${activeFilter === g.key ? "is-active" : ""}`}
                onClick={() => setActiveFilter(g.key)}
              >
                {g.label} ⌄
              </button>
            ))}
          </div>
          <button className="ct-btn-primary ct-btn-small">{t.filters.apply}</button>
        </div>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <section className="ct-main">
        <aside className="ct-sidebar">
          {filterGroups.map((g) => (
            <div className="ct-filter-group" key={g.key}>
              <div className="ct-filter-head">
                <span>{g.label}</span>
                <span className="ct-chevron">⌃</span>
              </div>
              <ul>
                {g.items.map((it, idx) => (
                  <li key={idx}>
                    <label>
                      <input type="checkbox" defaultChecked={idx === 0} />
                      <span>{it.label}</span>
                      <span className="ct-count">{it.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button className="ct-clear-btn">{t.filters.clear}</button>
        </aside>

        <div className="ct-results">
          <div className="ct-results-head">
            <span>{t.resultsLabel}</span>
            <div className="ct-sort">
              <span>{t.sortLabel}</span>
              <select>
                {t.sortOptions.map((o, i) => (
                  <option key={i}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="ct-grid">
            {COURSES.map((c, i) => (
              <article className="ct-card" key={i}>
                <div className={`ct-card-thumb tag-${c.tag}`}>
                  <span className="ct-card-icon">{c.icon}</span>
                  {c.badge && <span className="ct-badge">{c.badge[lang]}</span>}
                  <button className="ct-wish" aria-label="wishlist">♡</button>
                </div>
                <div className="ct-card-body">
                  <span className="ct-card-tag">{c.tag}</span>
                  <h3>{c.title[lang]}</h3>
                  <p>{c.desc[lang]}</p>
                  <div className="ct-instructor">
                    <span className="ct-avatar-dot" />
                    {c.instructor[lang]}
                  </div>
                  <div className="ct-rating">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} filled={n <= Math.round(c.rating)} />
                    ))}
                    <span>
                      {c.rating} ({c.reviews})
                    </span>
                  </div>
                  <div className="ct-meta">
                    <span>⏱ {c.hours} {t.hoursLabel}</span>
                    <span>👥 {c.students} {t.studentsLabel}</span>
                  </div>
                  <div className="ct-card-foot">
                    <span className={c.price === 0 ? "ct-price-free" : "ct-price"}>
                      {c.price === 0 ? t.free : `${c.price} ${t.sar}`}
                    </span>
                    <button className="ct-btn-outline">{t.viewDetails}</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="ct-pagination">
            <button className="ct-page-btn">{isRTL ? "›" : "‹"} {t.prev}</button>
            {[1, 2, 3, 4].map((n) => (
              <button key={n} className={`ct-page-num ${n === 1 ? "is-active" : ""}`}>
                {n}
              </button>
            ))}
            <span className="ct-page-dots">…</span>
            <button className="ct-page-num">8</button>
            <button className="ct-page-btn">{t.next} {isRTL ? "‹" : "›"}</button>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="ct-footer">
        <div className="ct-footer-top">
          <div className="ct-footer-col ct-footer-brand">
            <div className="ct-brand">
              <CapsuleMark size={30} />
              <span className="ct-brand-text light">{t.brand}</span>
            </div>
            <p>{t.footer.about}</p>
          </div>
          <div className="ct-footer-col">
            <h4>{t.footer.quickLinks}</h4>
            <ul>
              {t.footer.quick.map((l, i) => (
                <li key={i}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="ct-footer-col">
            <h4>{t.footer.forLearners}</h4>
            <ul>
              {t.footer.learners.map((l, i) => (
                <li key={i}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="ct-footer-col">
            <h4>{t.footer.forCompanies}</h4>
            <ul>
              {t.footer.companies.map((l, i) => (
                <li key={i}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="ct-footer-col">
            <h4>{t.footer.newsletter}</h4>
            <p>{t.footer.newsletterDesc}</p>
            <div className="ct-newsletter">
              <input type="email" placeholder={t.footer.emailPlaceholder} />
              <button>{t.footer.subscribe}</button>
            </div>
          </div>
        </div>
        <div className="ct-footer-bottom">
          <span>{t.footer.rights}</span>
          <div className="ct-footer-legal">
            {t.footer.legal.map((l, i) => (
              <a key={i} href="#">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@500;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Open+Sans:wght@400;600;700;800&display=swap');

        .ct-root {
          --navy: ${COLORS.navy};
          --navy-deep: ${COLORS.navyDeep};
          --teal: ${COLORS.teal};
          --teal-light: ${COLORS.tealLight};
          --teal-mid: ${COLORS.tealMid};
          --gold: ${COLORS.gold};
          --gold-deep: ${COLORS.goldDeep};
          --green: ${COLORS.green};
          --bg: ${COLORS.bg};
          --border: ${COLORS.border};
          background: var(--bg);
          color: var(--navy-deep);
          font-family: ${isRTL ? "'IBM Plex Sans Arabic'" : "'Open Sans'"}, sans-serif;
          min-height: 100vh;
        }
        .ct-root * { box-sizing: border-box; }
        .ct-root h1, .ct-root h3, .ct-root h4, .ct-brand-text {
          font-family: ${isRTL ? "'Tajawal'" : "'Open Sans'"}, sans-serif;
        }

        /* ---- NAV ---- */
        .ct-nav { background: #fff; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 20; }
        .ct-nav-inner { max-width: 1240px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; gap: 24px; }
        .ct-brand { display: flex; align-items: center; gap: 10px; }
        .ct-brand-text { font-weight: 800; font-size: 18px; color: var(--navy); }
        .ct-brand-text.light { color: #fff; }
        .ct-nav-links { display: flex; gap: 28px; flex: 1; justify-content: center; }
        .ct-nav-links a { color: var(--navy-deep); text-decoration: none; font-weight: 600; font-size: 14.5px; padding-bottom: 4px; border-bottom: 2px solid transparent; }
        .ct-nav-links a.active { color: var(--teal); border-color: var(--gold); }
        .ct-nav-actions { display: flex; align-items: center; gap: 10px; }
        .ct-lang-toggle { border: 1px solid var(--border); background: var(--bg); color: var(--navy); font-weight: 700; font-size: 12.5px; border-radius: 999px; padding: 7px 13px; cursor: pointer; }
        .ct-icon-btn { border: none; background: none; font-size: 16px; cursor: pointer; }
        .ct-avatar { width: 34px; height: 34px; border-radius: 999px; background: var(--teal-light); border: none; cursor: pointer; }

        /* ---- HERO ---- */
        .ct-hero { background: linear-gradient(120deg, var(--teal-light) 0%, var(--navy) 55%, var(--teal-mid) 100%); overflow: hidden; position: relative; }
        .ct-hero-inner { max-width: 1240px; margin: 0 auto; display: flex; align-items: center; gap: 40px; padding: 56px 24px; min-height: 320px; position: relative; }
        .ct-hero-copy { flex: 1.1; color: #fff; z-index: 2; }
        .ct-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 700; margin-bottom: 18px; }
        .ct-hero-copy h1 { font-size: 40px; font-weight: 800; line-height: 1.25; margin: 0 0 14px; }
        .ct-hero-copy p { font-size: 15.5px; line-height: 1.7; opacity: 0.92; max-width: 480px; margin: 0 0 26px; }
        .ct-hero-ctas { display: flex; gap: 14px; }
        .ct-btn-primary { background: var(--gold); color: var(--navy-deep); border: none; font-weight: 700; padding: 12px 24px; border-radius: 999px; cursor: pointer; font-size: 14.5px; }
        .ct-btn-ghost { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.6); font-weight: 700; padding: 12px 24px; border-radius: 999px; cursor: pointer; font-size: 14.5px; }
        .ct-hero-art { flex: 1; position: relative; height: 220px; display: none; }
        .ct-capsule-big, .ct-capsule-small { position: absolute; border-radius: 999px; }
        .ct-capsule-big { width: 260px; height: 90px; background: rgba(255,255,255,0.16); border: 1.5px solid rgba(255,255,255,0.3); top: 30px; left: 20px; transform: rotate(-18deg); }
        .ct-capsule-small { width: 200px; height: 70px; background: var(--gold); opacity: 0.85; top: 100px; left: 130px; transform: rotate(-18deg); }
        .ct-spark { position: absolute; top: 20px; left: 110px; color: var(--gold); font-size: 26px; }
        @media (min-width: 900px) { .ct-hero-art { display: block; } }

        /* ---- SEARCH BAR ---- */
        .ct-searchbar { background: #fff; border-bottom: 1px solid var(--border); }
        .ct-searchbar-inner { max-width: 1240px; margin: 0 auto; padding: 16px 24px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .ct-search-input { display: flex; align-items: center; gap: 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 9px 16px; flex: 1; min-width: 220px; }
        .ct-search-input input { border: none; background: none; outline: none; width: 100%; font-size: 14px; color: var(--navy-deep); font-family: inherit; }
        .ct-pill-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .ct-pill { border: 1px solid var(--border); background: #fff; border-radius: 999px; padding: 8px 14px; font-size: 13px; font-weight: 600; color: var(--navy-deep); cursor: pointer; }
        .ct-pill.is-active { border-color: var(--teal); color: var(--teal); background: rgba(56,123,132,0.08); }
        .ct-btn-small { padding: 9px 18px; font-size: 13px; }

        /* ---- MAIN LAYOUT ---- */
        .ct-main { max-width: 1240px; margin: 0 auto; padding: 28px 24px 60px; display: flex; gap: 28px; align-items: flex-start; }
        .ct-sidebar { width: 250px; flex-shrink: 0; display: flex; flex-direction: column; gap: 18px; }
        .ct-filter-group { background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 14px 16px; }
        .ct-filter-head { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 14.5px; color: var(--navy); margin-bottom: 10px; }
        .ct-filter-group ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .ct-filter-group label { display: flex; align-items: center; gap: 8px; font-size: 13.5px; cursor: pointer; }
        .ct-filter-group label input { accent-color: var(--teal); }
        .ct-count { margin-inline-start: auto; color: var(--teal-mid); font-size: 12px; }
        .ct-clear-btn { background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 10px; font-weight: 700; color: var(--navy); cursor: pointer; font-size: 13.5px; }

        .ct-results { flex: 1; min-width: 0; }
        .ct-results-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px; }
        .ct-results-head > span { font-weight: 700; color: var(--navy); }
        .ct-sort { display: flex; align-items: center; gap: 8px; font-size: 13.5px; }
        .ct-sort select { border: 1px solid var(--border); border-radius: 8px; padding: 6px 10px; font-size: 13px; background: #fff; }

        .ct-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 20px; }
        .ct-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.15s, box-shadow 0.15s; }
        .ct-card:hover { transform: translateY(-3px); box-shadow: 0 12px 24px -12px rgba(22,73,97,0.25); }
        .ct-card-thumb { height: 120px; position: relative; display: flex; align-items: center; justify-content: center; }
        .ct-card-thumb.tag-programming { background: linear-gradient(135deg, var(--navy-deep), var(--navy)); }
        .ct-card-thumb.tag-design { background: linear-gradient(135deg, var(--teal-mid), var(--teal-light)); }
        .ct-card-thumb.tag-data { background: linear-gradient(135deg, var(--teal), var(--navy-deep)); }
        .ct-card-thumb.tag-cybersecurity { background: linear-gradient(135deg, var(--navy), #0e2f3f); }
        .ct-card-thumb.tag-marketing { background: linear-gradient(135deg, var(--gold-deep), var(--gold)); }
        .ct-card-thumb.tag-business { background: linear-gradient(135deg, var(--green), var(--teal-mid)); }
        .ct-card-icon { font-size: 34px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25)); color: #fff; }
        .ct-badge { position: absolute; top: 10px; inset-inline-start: 10px; background: var(--gold); color: var(--navy-deep); font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 999px; }
        .ct-wish { position: absolute; top: 10px; inset-inline-end: 10px; background: rgba(255,255,255,0.85); border: none; border-radius: 999px; width: 28px; height: 28px; cursor: pointer; }
        .ct-card-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .ct-card-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--teal); letter-spacing: 0.03em; }
        .ct-card-body h3 { font-size: 16px; margin: 0; color: var(--navy-deep); line-height: 1.4; }
        .ct-card-body p { font-size: 13px; color: #5b6b76; margin: 0; line-height: 1.5; }
        .ct-instructor { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--navy-deep); }
        .ct-avatar-dot { width: 16px; height: 16px; border-radius: 999px; background: var(--teal-light); display: inline-block; }
        .ct-rating { display: flex; align-items: center; gap: 3px; font-size: 12.5px; color: #5b6b76; }
        .ct-rating span { margin-inline-start: 4px; }
        .ct-meta { display: flex; gap: 14px; font-size: 12px; color: #5b6b76; }
        .ct-card-foot { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 8px; border-top: 1px dashed var(--border); }
        .ct-price-free { color: var(--green); font-weight: 800; font-size: 14px; }
        .ct-price { color: var(--navy); font-weight: 800; font-size: 14px; }
        .ct-btn-outline { border: 1.5px solid var(--teal); color: var(--teal); background: none; border-radius: 999px; padding: 6px 14px; font-size: 12.5px; font-weight: 700; cursor: pointer; }

        .ct-pagination { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 36px; flex-wrap: wrap; }
        .ct-page-btn, .ct-page-num { border: 1px solid var(--border); background: #fff; border-radius: 8px; padding: 8px 12px; font-size: 13px; cursor: pointer; color: var(--navy-deep); }
        .ct-page-num.is-active { background: var(--teal); color: #fff; border-color: var(--teal); }
        .ct-page-dots { color: #5b6b76; }

        /* ---- FOOTER ---- */
        .ct-footer { background: var(--navy-deep); color: #dbe6ea; margin-top: 20px; }
        .ct-footer-top { max-width: 1240px; margin: 0 auto; padding: 48px 24px 32px; display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr 1.3fr; gap: 28px; }
        .ct-footer-brand p { font-size: 13.5px; line-height: 1.7; opacity: 0.85; margin-top: 12px; }
        .ct-footer h4 { color: #fff; font-size: 14.5px; margin: 0 0 14px; }
        .ct-footer ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .ct-footer a { color: #c7d5db; text-decoration: none; font-size: 13.5px; }
        .ct-footer-col p { font-size: 13px; opacity: 0.85; line-height: 1.6; }
        .ct-newsletter { display: flex; gap: 8px; margin-top: 12px; }
        .ct-newsletter input { flex: 1; border: none; border-radius: 8px; padding: 9px 12px; font-size: 13px; font-family: inherit; }
        .ct-newsletter button { background: var(--gold); color: var(--navy-deep); border: none; border-radius: 8px; padding: 9px 14px; font-weight: 700; font-size: 13px; cursor: pointer; white-space: nowrap; }
        .ct-footer-bottom { border-top: 1px solid rgba(255,255,255,0.12); max-width: 1240px; margin: 0 auto; padding: 18px 24px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-size: 12.5px; opacity: 0.8; }
        .ct-footer-legal { display: flex; gap: 18px; }
        .ct-footer-legal a { color: #c7d5db; text-decoration: none; font-size: 12.5px; }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 900px) {
          .ct-nav-links { display: none; }
          .ct-main { flex-direction: column; }
          .ct-sidebar { width: 100%; flex-direction: row; overflow-x: auto; }
          .ct-filter-group { min-width: 200px; }
          .ct-footer-top { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ct-hero-copy h1 { font-size: 28px; }
          .ct-footer-top { grid-template-columns: 1fr; }
          .ct-grid { grid-template-columns: 1fr 1fr; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ct-card { transition: none; }
        }
      `}</style>
    </div>
  );
}
