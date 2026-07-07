export const COPY = {
  ar: {
    // ==========================================
    // 1. GLOBAL (Used across multiple pages)
    // ==========================================
    dir: "rtl",
    brand: "كبسولة تحول",
    tagline: "منصتك نحو مستقبل تقني أفضل، دورة واحدة في كل مرة.",

    nav: {
      home: "الرئيسية",
      courses: "الدورات",
      bootcamps: "المعسكرات",
      companies: "الشركات",
      portal: "بوابة الأعضاء",
    },

    footer: {
      desc: "منصة سعودية تربط الطلاب بفرص التدريب العملي، وتبني جيلاً جاهزاً لسوق العمل المالي والتقني.",
      quickLinks: "روابط سريعة",
      home: "الرئيسية",
      courses: "الدورات والمسارات",
      howItWorks: "كيف تعمل المنصة",
      social: "التواصل الاجتماعي",
      newsletter: "النشرة البريدية",
      emailPh: "بريدك الإلكتروني",
      subscribe: "اشترك",
      copyright1: "© ٢٠٢٦ كبسولة تحول. جميع الحقوق محفوظة.",
      copyright2: "Copyright © 2026 by CS – GC. جميع الحقوق الفكرية محفوظة."
    },

    ui: {
      defaultLoading: "جاري جلب البيانات والتأكد من الاتصال...",
    },

    // ==========================================
    // ADMIN SECTION
    // ==========================================
    admin: {
      loading: "جاري جلب إحصائيات الإدارة العامة للنظام...",
      hero: {
        title: "إدارة مبادرة كبسولة تحول الشاملة",
        subtitle: "مراجعة طلبات المعسكرات المرفوعة من المدربين، ومتابعة الأرباح الإجمالية للمنصة بنسبة الـ 20%."
      },
      stats: {
        activeUsers: "المستخدمين النشطين اليوم",
        totalCourses: "إجمالي الكورسات بالمنصة",
        pendingReports: "بلاغات التقارير المعلقة",
        serverStatus: "حالة خوادم النظام"
      },
      table: {
        title: "مراجعة طلبات المعسكرات والدورات التدريبية",
        colCourse: "اسم المعسكر",
        colTrainer: "المدرب",
        colDuration: "مدة المقطع",
        colStatus: "الحالة",
        colAction: "الإجراء"
      },
      actions: {
        pending: "بانتظار المراجعة",
        approved: "تمت الموافقة",
        approveBtn: "اعتماد ونشر المعسكر",
        approvedLabel: "تم الاعتماد"
      },
      mockData: {
        course1: "معسكر الهندسة السيبرانية المتقدم",
        trainer1: "أ. خالد",
        duration1: "22 دقيقة",
        course2: "تطوير تطبيقات الويب بـ React",
        trainer2: "أ. هند",
        duration2: "15 دقيقة"
      }
    },

    //==
    coursesApproval: {
  hero: {
    title: "اعتماد الدورات التدريبية",
    subtitle: "مراجعة واعتماد الدورات المرفوعة من المدربين قبل نشرها وتفعيلها في المنصة."
  },
  stats: {
    total: "إجمالي الطلبات",
    approved: "تمت الموافقة",
    pending: "بانتظار المراجعة"
  },
  table: {
    cardTitle: "قائمة مراجعة الدورات المرفوعة",
    colTitle: "اسم الدورة",
    colTrainer: "المدرب",
    colCategory: "التصنيف",
    colDuration: "المدة",
    colStatus: "الحالة",
    colActions: "الإجراءات",
    actionApprove: "اعتماد",
    actionReject: "رفض",
    statusApproved: "تم الاعتماد",
    statusRejected: "مرفوض",
    unitHours: " ساعة"
  },
  data: {
    pendingText: "بانتظار المراجعة",
    approvedText: "تمت الموافقة",
    rejectedText: "مرفوض",
    catCyber: "الأمن السيبراني",
    catWeb: "تطوير الويب",
    course1Title: "معسكر الهندسة السيبرانية المتقدم",
    course2Title: "تطوير تطبيقات الويب بـ React",
    trainer1: "أ. خالد ",
    trainer2: "أ. هند"
  }
},

//==

coursesOverview: {
  hero: {
    eyebrow: "منصة كبسولة تحول",
    title: "دورات تُشكّل مسارك المهني",
    desc: "نسد الفجوة بين ما تتعلمه أكاديميًا وما يحتاجه سوق العمل، عبر معسكرات ودورات مجانية ومدفوعة يقودها خبراء الصناعة.",
    cta: "استعرض الدورات",
    ctaGhost: "انضم كشريك",
  },
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
  filterData: {
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
  },
  results: {
    label: "يعرض ٣٢ دورة",
    sortLabel: "ترتيب حسب:",
    sortOptions: ["الأكثر رواجًا", "الأحدث", "السعر: من الأقل", "التقييم"],
    free: "مجاني",
    sar: "ر.س",
    viewDetails: "عرض التفاصيل",
    hoursLabel: "ساعة",
    studentsLabel: "طالب",
    prev: "السابق",
    next: "التالي",
    badges: {
      new: "جديد",
      popular: "رائج"
    }
  },
  mockCourses: [
    { title: "أساسيات React", desc: "تعلّم مفاهيم React الأساسية وبناء تطبيقات ويب حديثة.", instructor: "أحمد علي" },
    { title: "أساسيات UI/UX", desc: "صمّم واجهات جذابة وسهلة الاستخدام من الصفر.", instructor: "سارة أحمد" },
    { title: "بايثون للمبتدئين", desc: "ابدأ رحلتك في البرمجة مع بايثون خطوة بخطوة.", instructor: "محمد خان" },
    { title: "أساسيات الأمن السيبراني", desc: "تعرّف على أساسيات الأمن السيبراني وحماية بياناتك.", instructor: "نورة المطيري" },
    { title: "أساسيات JavaScript", desc: "تمكّن من JavaScript وابنِ مواقع تفاعلية.", instructor: "فيصل الغامدي" },
    { title: "تحليل البيانات باستخدام SQL", desc: "حلّل البيانات واستخرج رؤى دقيقة باستخدام SQL.", instructor: "ريم عبدالله" },
    { title: "مبادئ التسويق الرقمي", desc: "تعلّم استراتيجيات التسويق الرقمي لتنمية علامتك التجارية.", instructor: "حسن مالك" },
    { title: "إكسل لريادة الأعمال", desc: "طوّر إنتاجيتك باستخدام مهارات إكسل المتقدمة.", instructor: "لمى يوسف" }
  ]
},

//==

studentDashboard: {
  loading: "جاري تجهيز لوحة التحكم الخاصة بك...",
  errorProfile: "تعذر تحميل بيانات ملفك الشخصي حالياً.",
  errorNetwork: "حدث خطأ غير متوقع أثناء الاتصال بالخادم.",
  hero: {
    badge: "لوحة تحكم الطالب",
    welcomePrefix: "أهلاً بعودتك،",
    fallbackName: "يا بطل",
    welcomeSuffix: "",
    subtitle: "استمر من حيث توقفت، وتابع تقدمك عبر جميع دوراتك المسجلة.",
    viewProfile: "عرض الملف الشخصي ←"
  },
  stats: {
    activeCourses: "الدورات الجارية",
    completedCourses: "الدورات المكتملة",
    unreadNotifs: "إشعارات غير مقروءة",
    affiliation: "جهة الانتساب",
    independent: "مستقل"
  },
  resume: {
    title: "أكمل من حيث توقفت",
    empty: "لم تسجل في أي دورة بعد.",
    browseBtn: "تصفح الدورات المتاحة",
    completedProgress: "مكتمل",
    certBtn: "عرض الشهادة",
    continueBtn: "متابعة الدورة"
  },
  notifications: {
    title: "آخر الإشعارات",
    empty: "لا توجد إشعارات جديدة حالياً."
  },
  mockData: {
    course1Title: "مقدمة في الذكاء الاصطناعي",
    course1Cat: "ذكاء اصطناعي",
    course1Dur: "10 ساعات",
    course2Title: "أساسيات لغة Python",
    course2Cat: "برمجة",
    course2Dur: "15 ساعة",
    notif1Title: "دورة جديدة متاحة!",
    notif1Msg: "تمت إضافة دورة متقدمة في تعلم الآلة. تفقدها الآن.",
    notif2Title: "تذكير بالمهام",
    notif2Msg: "لديك اختبار قصير في دورة Python ينتهي غداً."
  }
},

//==

studentProfile: {
  loading: "جاري تحميل ملفك الشخصي...",
  backBtn: "العودة إلى لوحة التحكم",
  successSave: "تم حفظ التعديلات بنجاح.",
  errorGlobal: "تعذر تحميل بياناتك. حاول مرة أخرى.",
  roles: {
    student: "طالب"
  },
  joinedPrefix: "عضو منذ",
  editBtn: "تعديل الملف الشخصي",
  editSectionTitle: "تعديل البيانات الشخصية",
  inputs: {
    fullName: "الاسم الكامل",
    avatar: "رابط صورة الملف الشخصي"
  },
  actions: {
    saving: "جاري الحفظ...",
    save: "حفظ التعديلات",
    cancel: "إلغاء"
  },
  stats: {
    active: "الدورات الجارية",
    completed: "الدورات المكتملة",
    total: "إجمالي الدورات المسجلة"
  }
},

//==

trainerDashboard: {
  loading: "جاري جلب إحصائيات المدرب من فضاء كبسولة تحوّل...",
  hero: {
    badge: "🔹 منصة كبسولة تحول التعليمية",
    title: "لوحة تحكم المدرب",
    subtitle: "أدير مبيعاتك، تتبع طلابك، وساهم في بناء جيل جاهز لسوق العمل عبر رفع معسكرات تطبيقية بحتة."
  },
  stats: {
    payout: "إجمالي الأرباح المستلمة",
    currency: "SAR",
    activeStudents: "الطلاب النشطين المسجلين",
    studentLabel: "طالب",
    accountStatus: "حالة الحساب التدريبي",
    verified: "موثق ونشط"
  },
  form: {
    title: "إنشاء معسكر عملي جديد",
    labels: {
      title: "عنوان المعسكر التطبيقي",
      price: "رسوم التسجيل (SAR)",
      duration: "المدة الزمنية (بالأسابيع)",
      maxStudents: "الحد الأقصى للمقاعد",
      videoDuration: "متوسط طول المقطع (بالدقائق)",
      requirements: "مواصفات ومتطلبات المعسكر (مهم: لا يقل عن 20 حرف لتجاوز فحص الموك)"
    },
    placeholders: {
      title: "مثال: معسكر هندسة واجهات الويب الاحترافية",
      requirements: "اكتب هنا المتطلبات التقنية والأدوات المطلوبة من الطلاب..."
    },
    submitBtn: "إرسال طلب المعسكر للاعتماد والنشر الحي"
  },
  messages: {
    valErrorLength: "حقل تفاصيل المعسكر والمواصفات يجب ألا يقل عن 20 حرفاً للقبول في السيرفر.",
    successPrefix: "تم إرسال طلب إنشاء المعسكر بنجاح وتوليد تذكرة برقم: ",
    genericError: "فشل في تسجيل الطلب."
  }
},

//==

trainerProfile: {
  loading: "جاري تحميل بيانات المدرب...",
  hero: {
    title: "الملف الشخصي للمدرب",
    subtitle: "استعراض بيانات المدرب والدورات التدريبية المتاحة."
  },
  profile: {
    experience: "الخبرة: "
  },
  stats: {
    coursesCount: "عدد الدورات المتاحة",
    studentsCount: "عدد الطلاب",
    rating: "التقييم"
  },
  table: {
    cardTitle: "الدورات التدريبية المقدمة",
    colTitle: "اسم الدورة",
    colStudents: "عدد الطلاب"
  },
  data: {
    fullName: "أ. أحمد القحطاني",
    specialization: "تطوير الويب",
    experienceVal: "8 سنوات",
    bio: "مدرب معتمد في React و JavaScript وتطوير تطبيقات الويب الحديثة."
  }
},

//==
    // ==========================================
    // BUSINESS FORM SECTION
    // ==========================================
    businessForm: {
      hero: {
        title: "نموذج عقد الشركات",
        subtitle: "تعبئة بيانات الجهة الراغبة في شراكة إستراتيجية لإقامة دورة أو معسكر تدريبي مخصص."
      },
      form: {
        title: "بيانات طلب التعاقد التدريبي",
        successMsg: "تم إرسال طلب التعاقد بنجاح! سيتواصل معكم فريق مبيعات كبسولة تحول قريباً."
      },
      inputs: {
        companyName: "اسم الشركة / الجهة",
        contactPerson: "اسم مسؤول التواصل",
        email: "البريد الإلكتروني الرسمي",
        phone: "رقم الجوال / التواصل",
        trainingType: "نوع المسار التدريبي",
        selectType: "اختر النوع",
        type1: "دورة تدريبية مخصصة",
        type2: "معسكر تدريبي مكثف",
        type3: "ورشة عمل تنفيذية",
        trainees: "عدد المتدربين المتوقع",
        startDate: "التاريخ المقترح للبداية",
        notes: "ملاحظات أو متطلبات خاصة",
        placeholderNotes: "اكتب هنا أي تفاصيل إضافية حول المخرجات المطلوبة...",
        submitBtn: "تقديم طلب التعاقد الرسمي"
      }
    },
    
    // ==========================================
    // 2. AUTHENTICATION (Login & Sign Up)
    // ==========================================
    tabs: { login: "تسجيل الدخول", signup: "إنشاء حساب" },
    social: ["Google", "Facebook"],
    strengthLabel: "قوة كلمة المرور",
    strength: ["ضعيفة", "متوسطة", "قوية"],
    passwordHint: "8 أحرف على الأقل، بحرف كبير ورقم واحد على الأقل.",
    login: {
      title: "أهلاً بعودتك",
      subtitle: "سجّل الدخول لمتابعة رحلتك التعليمية.",
      email: "البريد الإلكتروني",
      emailPh: "example@email.com",
      password: "كلمة المرور",
      passwordPh: "أدخل كلمة المرور",
      remember: "تذكرني",
      forgot: "نسيت كلمة المرور؟",
      submit: "تسجيل الدخول",
      or: "أو تابع عبر",
      noAccount: "ليس لديك حساب؟",
      switchLink: "إنشاء حساب جديد",
    },
    signup: {
      title: "أنشئ حسابك",
      subtitle: "انضم إلى كبسولة تحول وابدأ التعلم اليوم.",
      name: "الاسم الكامل",
      namePh: "أدخل اسمك الكامل",
      email: "البريد الإلكتروني",
      emailPh: "example@email.com",
      password: "كلمة المرور",
      passwordPh: "أنشئ كلمة مرور",
      role: "أنا",
      roleOptions: ["طالب", "مدرّب", "شركة"],
      terms: "أوافق على الشروط والأحكام وسياسة الخصوصية.",
      submit: "إنشاء حساب",
      or: "أو تابع عبر",
      haveAccount: "لديك حساب بالفعل؟",
      switchLink: "تسجيل الدخول",
    },

    // ==========================================
    // 3. LANDING PAGE
    // ==========================================
    landing: {
      loading: "جاري تجهيز بوابة كبسولة تحول...",
      catalogLoading: "جاري تحديث نتائج الفئة المختارة...",
      errorPlatform: "تعذر تحميل بيانات نظرة المنصة العامة حالياً.",
      errorNetwork: "حدث خطأ غير متوقع أثناء الاتصال بالخادم.",
      hero: {
        badge: "منصة سعودية للتدريب والتطوير المهني",
        title: "حيث يلتقي الطلاب والخبراء والشركات لبناء مستقبل مهني حقيقي",
        subtitle: "دورات، معسكرات، وهاكاثونات مصممة لتؤهلك لسوق العمل — سواء كنت متعلماً، مدرباً خبيراً، أو جهة توظف فرقاً كاملة.",
        btnStart: "ابدأ التعلم مجاناً",
        btnBrowse: "تصفح الدورات",
      },
      tracks: {
        btnStudent: "سجّل كطالب ←",
        btnTrainer: "قدّم كمدرب ←",
        btnCompany: "تواصل كشريك أعمال ←",
      },
      catalog: {
        label: "مكتبة الدورات",
        title: "اكتشف مساراً يناسب أهدافك",
        filterAll: "الكل",
        empty: "لا توجد دورات ضمن هذه الفئة حالياً.",
        free: "مجاني",
        students: "طالب",
      },
      cta: {
        title: "هل تدير فريقاً أو تمتلك خبرة تستحق المشاركة؟",
        subtitle: "انضم كمدرب لمشاركة معرفتك، أو كشريك أعمال لتصميم برامج تدريب مخصصة لفريقك.",
        btnTrainer: "انضم كمدرب",
        btnCompany: "حلول الشركات",
      },
    }
  },

  en: {
    // ==========================================
    // 1. GLOBAL (Used across multiple pages)
    // ==========================================
    dir: "ltr",
    brand: "Capsule Tahawul",
    tagline: "Your platform toward a better tech future, one course at a time.",
    
    nav: {
      home: "Home",
      courses: "Courses",
      bootcamps: "Bootcamps",
      companies: "Companies",
      portal: "Member Portal",
    },

    footer: {
      desc: "A Saudi platform connecting students with practical training opportunities, building a generation fully prepared for the financial and technical labor market.",
      quickLinks: "Quick Links",
      home: "Home",
      courses: "Courses & Paths",
      howItWorks: "How the Platform Works",
      social: "Social Media",
      newsletter: "Newsletter",
      emailPh: "Your email address",
      subscribe: "Subscribe",
      copyright1: "© 2026 Capsule Tahawul. All rights reserved.",
      copyright2: "Copyright © 2026 by CS – GC. All intellectual property rights reserved."
    },

    ui: {
      defaultLoading: "Fetching data and verifying connection...",
    },

    // ==========================================
    // ADMIN SECTION
    // ==========================================
    admin: {
      loading: "Fetching general system administration statistics...",
      hero: {
        title: "Capsule Tahawul Admin Initiative",
        subtitle: "Review bootcamp requests submitted by trainers and track total platform revenue at the 20% margin."
      },
      stats: {
        activeUsers: "Active Users Today",
        totalCourses: "Total Platform Courses",
        pendingReports: "Pending Report Flags",
        serverStatus: "System Server Status"
      },
      table: {
        title: "Review Bootcamp and Training Course Requests",
        colCourse: "Bootcamp Name",
        colTrainer: "Trainer",
        colDuration: "Duration",
        colStatus: "Status",
        colAction: "Action"
      },
      actions: {
        pending: "Pending Review",
        approved: "Approved",
        approveBtn: "Approve & Publish Bootcamp",
        approvedLabel: "Live Approved"
      },
      mockData: {
        course1: "Advanced Cyber Engineering Bootcamp",
        trainer1: "Mr. Khalid",
        duration1: "22 mins",
        course2: "Web App Development with React",
        trainer2: "Ms. Hind",
        duration2: "15 mins"
      }
    },

    //==
    coursesApproval: {
  hero: {
    title: "Courses Approval",
    subtitle: "Review and approve courses uploaded by trainers before publishing and activating them on the platform."
  },
  stats: {
    total: "Total Requests",
    approved: "Approved",
    pending: "Pending Review"
  },
  table: {
    cardTitle: "Uploaded Courses Checklist",
    colTitle: "Course Name",
    colTrainer: "Trainer",
    colCategory: "Category",
    colDuration: "Duration",
    colStatus: "Status",
    colActions: "Actions",
    actionApprove: "Approve",
    actionReject: "Reject",
    statusApproved: "Approved",
    statusRejected: "Rejected",
    unitHours: " Hours"
  },
  data: {
    pendingText: "Pending Review",
    approvedText: "Approved",
    rejectedText: "Rejected",
    catCyber: "Cybersecurity",
    catWeb: "Web Development",
    course1Title: "Advanced Cyber Engineering Bootcamp",
    course2Title: "Web Application Development with React",
    trainer1: "Mr. Khalid",
    trainer2: "Ms. Hind"
  }
},

//==

studentDashboard: {
  loading: "Preparing your dashboard...",
  errorProfile: "Unable to load your profile data at this time.",
  errorNetwork: "An unexpected error occurred while connecting to the server.",
  hero: {
    badge: "Student Dashboard",
    welcomePrefix: "Welcome back,",
    fallbackName: "Champion",
    welcomeSuffix: "",
    subtitle: "Pick up where you left off and track your progress across all your enrolled courses.",
    viewProfile: "View Profile ←"
  },
  stats: {
    activeCourses: "Active Courses",
    completedCourses: "Completed Courses",
    unreadNotifs: "Unread Notifications",
    affiliation: "Affiliation",
    independent: "Independent"
  },
  resume: {
    title: "Pick up where you left off",
    empty: "You haven't enrolled in any courses yet.",
    browseBtn: "Browse available courses",
    completedProgress: "Completed",
    certBtn: "View Certificate",
    continueBtn: "Continue Course"
  },
  notifications: {
    title: "Latest Notifications",
    empty: "There are currently no new notifications."
  },
  mockData: {
    course1Title: "Introduction to Artificial Intelligence",
    course1Cat: "Artificial Intelligence",
    course1Dur: "10 Hours",
    course2Title: "Python Fundamentals",
    course2Cat: "Programming",
    course2Dur: "15 Hours",
    notif1Title: "New Course Available!",
    notif1Msg: "An advanced machine learning course has been added. Check it out now.",
    notif2Title: "Task Reminder",
    notif2Msg: "You have a quiz in the Python course due tomorrow."
  }
},

//==

trainerProfile: {
  loading: "Loading trainer data...",
  hero: {
    title: "Trainer Profile",
    subtitle: "Review trainer information and available training courses."
  },
  profile: {
    experience: "Experience: "
  },
  stats: {
    coursesCount: "Available Courses",
    studentsCount: "Total Students",
    rating: "Rating"
  },
  table: {
    cardTitle: "Provided Training Courses",
    colTitle: "Course Name",
    colStudents: "Students Count"
  },
  data: {
    fullName: "Mr. Ahmed Al-Qahtani",
    specialization: "Web Development",
    experienceVal: "8 Years",
    bio: "Certified trainer in React, JavaScript, and modern web application development."
  }
},

//==

studentProfile: {
  loading: "Loading your profile...",
  backBtn: "Back to Dashboard",
  successSave: "Changes saved successfully.",
  errorGlobal: "Unable to load data. Please try again.",
  roles: {
    student: "Student"
  },
  joinedPrefix: "Member since",
  editBtn: "Edit Profile",
  editSectionTitle: "Edit Personal Details",
  inputs: {
    fullName: "Full Name",
    avatar: "Profile Image URL"
  },
  actions: {
    saving: "Saving...",
    save: "Save Changes",
    cancel: "Cancel"
  },
  stats: {
    active: "Active Courses",
    completed: "Completed Courses",
    total: "Total Enrolled Courses"
  }
},

//==

//==

trainerDashboard: {
  loading: "Fetching trainer statistics from the Capsule Tahawul space...",
  hero: {
    badge: "🔹 Capsule Tahawul Educational Platform",
    title: "Trainer Dashboard",
    subtitle: "Manage your sales, track your students, and help build a market-ready generation by uploading purely applied bootcamps."
  },
  stats: {
    payout: "Total Payout Collected",
    currency: "SAR",
    activeStudents: "Active Enrolled Students",
    studentLabel: "Students",
    accountStatus: "Training Account Status",
    verified: "Verified & Active"
  },
  form: {
    title: "Create New Applied Bootcamp",
    labels: {
      title: "Applied Bootcamp Title",
      price: "Registration Fee (SAR)",
      duration: "Duration (Weeks)",
      maxStudents: "Maximum Seats",
      videoDuration: "Average Clip Length (Minutes)",
      requirements: "Bootcamp Specifications & Requirements (Note: Minimum 20 characters)"
    },
    placeholders: {
      title: "e.g., Professional Web UI Engineering Bootcamp",
      requirements: "Enter the technical requirements and tools needed by students here..."
    },
    submitBtn: "Submit Bootcamp Request for Approval & Live Publishing"
  },
  messages: {
    valErrorLength: "The bootcamp details and specifications field must be at least 20 characters to be accepted by the server.",
    successPrefix: "Bootcamp creation request sent successfully. Ticket ID generated: ",
    genericError: "Failed to submit request."
  }
},

//==

coursesOverview: {
  hero: {
    eyebrow: "Capsule Tahawul Platform",
    title: "Courses That Shape Your Career Path",
    desc: "We close the gap between academic learning and what the job market actually needs — through free and paid courses and bootcamps led by industry experts.",
    cta: "Browse Courses",
    ctaGhost: "Become a Partner",
  },
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
  filterData: {
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
  },
  results: {
    label: "Showing 32 courses",
    sortLabel: "Sort by:",
    sortOptions: ["Most Popular", "Newest", "Price: Low to High", "Rating"],
    free: "Free",
    sar: "SAR",
    viewDetails: "View Details",
    hoursLabel: "Hours",
    studentsLabel: "Students",
    prev: "Previous",
    next: "Next",
    badges: {
      new: "New",
      popular: "Popular"
    }
  },
  mockCourses: [
    { title: "React Fundamentals", desc: "Learn core React concepts and build modern web apps.", instructor: "Ahmed Ali" },
    { title: "UI/UX Design Essentials", desc: "Design beautiful, user-friendly interfaces from scratch.", instructor: "Sarah Ahmed" },
    { title: "Python for Beginners", desc: "Start your programming journey with Python step by step.", instructor: "Mohammed Khan" },
    { title: "Cybersecurity Basics", desc: "Learn the fundamentals of cybersecurity and stay safe online.", instructor: "Nora Almutairi" },
    { title: "JavaScript Essentials", desc: "Master JavaScript and build interactive websites.", instructor: "Faisal Alghamdi" },
    { title: "Data Analysis with SQL", desc: "Analyze data and generate insights using SQL.", instructor: "Reem Abdullah" },
    { title: "Digital Marketing 101", desc: "Learn digital marketing strategies to grow your brand.", instructor: "Hassan Malik" },
    { title: "Excel for Business", desc: "Boost your productivity with advanced Excel skills.", instructor: "Lama Youssef" }
  ]
},

    // ==========================================
    // BUSINESS FORM SECTION
    // ==========================================
    businessForm: {
      hero: {
        title: "Business Contract Form",
        subtitle: "Fill in the details for organizations seeking a strategic partnership to host a customized course or bootcamp."
      },
      form: {
        title: "Training Contract Request Details",
        successMsg: "Contract request submitted successfully! Our sales team will contact you soon."
      },
      inputs: {
        companyName: "Company / Organization Name",
        contactPerson: "Contact Person Name",
        email: "Official Email Address",
        phone: "Phone / Contact Number",
        trainingType: "Training Track Type",
        selectType: "Select Type",
        type1: "Customized Training Course",
        type2: "Intensive Bootcamp",
        type3: "Executive Workshop",
        trainees: "Expected Number of Trainees",
        startDate: "Proposed Start Date",
        notes: "Special Notes or Requirements",
        placeholderNotes: "Write any additional details about the required outcomes here...",
        submitBtn: "Submit Official Contract Request"
      }
    },

    // ==========================================
    // 2. AUTHENTICATION (Login & Sign Up)
    // ==========================================
    tabs: { login: "Sign In", signup: "Sign Up" },
    social: ["Google", "Facebook"],
    strengthLabel: "Password strength",
    strength: ["Weak", "Medium", "Strong"],
    passwordHint: "At least 8 characters, with an uppercase letter and a number.",
    login: {
      title: "Welcome back",
      subtitle: "Sign in to continue your learning journey.",
      email: "Email",
      emailPh: "example@email.com",
      password: "Password",
      passwordPh: "Enter your password",
      remember: "Remember me",
      forgot: "Forgot password?",
      submit: "Sign In",
      or: "Or continue with",
      noAccount: "Don't have an account?",
      switchLink: "Create one",
    },
    signup: {
      title: "Create your account",
      subtitle: "Join Capsule Tahawul and start learning today.",
      name: "Full name",
      namePh: "Enter your full name",
      email: "Email",
      emailPh: "example@email.com",
      password: "Password",
      passwordPh: "Create a password",
      role: "I am a",
      roleOptions: ["Student", "Trainer", "Company"],
      terms: "I agree to the Terms & Conditions and Privacy Policy.",
      submit: "Sign Up",
      or: "Or continue with",
      haveAccount: "Already have an account?",
      switchLink: "Sign In",
    },

    // ==========================================
    // 3. LANDING PAGE
    // ==========================================
    landing: {
      loading: "Preparing the Capsule Tahawul portal...",
      catalogLoading: "Updating results for the selected category...",
      errorPlatform: "Unable to load platform overview data at this time.",
      errorNetwork: "An unexpected error occurred while connecting to the server.",
      hero: {
        badge: "Saudi platform for training and professional development",
        title: "Where students, experts, and companies meet to build a real professional future",
        subtitle: "Courses, bootcamps, and hackathons designed to prepare you for the labor market — whether you are a learner, an expert trainer, or a company hiring entire teams.",
        btnStart: "Start learning for free",
        btnBrowse: "Browse courses",
      },
      tracks: {
        btnStudent: "Register as a student ←",
        btnTrainer: "Apply as a trainer ←",
        btnCompany: "Connect as a business partner ←",
      },
      catalog: {
        label: "Course Library",
        title: "Discover a path that fits your goals",
        filterAll: "All",
        empty: "There are currently no courses in this category.",
        free: "Free",
        students: "students",
      },
      cta: {
        title: "Do you manage a team or have expertise worth sharing?",
        subtitle: "Join as a trainer to share your knowledge, or as a business partner to design custom training programs for your team.",
        btnTrainer: "Join as a trainer",
        btnCompany: "Corporate solutions",
      },
    }
  },
};