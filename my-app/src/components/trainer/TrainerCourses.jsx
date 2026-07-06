/**
 * TrainerCourses.jsx
 * 
 * Displays the courses management data table for the trainer.
 * Synchronized perfectly with the layout in 94d3bcae-8419-4e07-afcb-3f6c826afd12.JPG.
 * 
 * Features customized badge states for course publication status:
 * - "Published / منشور" (Vibrant Emerald style)
 * - "Under Review / قيد المراجعة" (Warm Amber/Yellow style)
 * Integrates full horizontal scrolling overflow protection for flawless mobile responsiveness.
 */

// ============================================
// BILINGUAL TRANSLATION & COURSE DATA
// ============================================
const coursesTableData = {
  en: {
    sectionTitle: 'Training Courses',
    thCourseName: 'Course Name',
    thStudentsCount: 'Number of Students',
    thStatus: 'Status',
    statusPublished: 'Published',
    statusReview: 'Under Review',
    courses: [
      { id: 1, name: 'React Bootcamp', students: 120, status: 'published' },
      { id: 2, name: 'JavaScript Advanced', students: 85, status: 'published' },
      { id: 3, name: 'Next.js Fundamentals', students: 0, status: 'review' }
    ]
  },
  ar: {
    sectionTitle: 'الدورات التدريبية',
    thCourseName: 'اسم الدورة',
    thStudentsCount: 'عدد الطلاب',
    thStatus: 'الحالة',
    statusPublished: 'منشور',
    statusReview: 'قيد المراجعة',
    courses: [
      { id: 1, name: 'React Bootcamp', students: 120, status: 'published' },
      { id: 2, name: 'JavaScript Advanced', students: 85, status: 'published' },
      { id: 3, name: 'Next.js Fundamentals', students: 0, status: 'review' }
    ]
  }
};

export default function TrainerCourses({ lang = 'ar' }) {
  const t = coursesTableData[lang];
  const isRTL = lang === 'ar';

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-5 sm:p-8 transition-all duration-300"
    >
      
      {/* Section Content Title */}
      <div className="mb-6 border-b border-slate-50 pb-4">
        <h3 className="text-lg font-black text-[#0D4C54] tracking-tight">
          {t.sectionTitle}
        </h3>
      </div>

      {/* ============================================
          RESPONSIVE TABLE WRAPPER CONTAINER
          Enables elegant native horizontal swiping on mobile viewports
          ============================================ */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full min-w-[600px] text-sm font-sans text-right border-collapse">
          
          {/* Table Header Structure */}
          <thead>
            <tr className="bg-[#F8FAFC] text-slate-400 font-bold border-b border-slate-100">
              <th className={`p-4 font-extrabold ${isRTL ? 'text-right' : 'text-left'}`}>
                {t.thCourseName}
              </th>
              <th className="p-4 font-extrabold text-center">
                {t.thStudentsCount}
              </th>
              <th className="p-4 font-extrabold text-center">
                {t.thStatus}
              </th>
            </tr>
          </thead>

          {/* Table Body Content Rows */}
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {t.courses.map((course) => (
              <tr 
                key={course.id}
                className="hover:bg-slate-50/70 transition-colors duration-150"
              >
                {/* 1. Course Name (Bold Brand Styling) */}
                <td className={`p-4 font-black text-[#0d4c54] ${isRTL ? 'text-right' : 'text-left'}`}>
                  {course.name}
                </td>

                {/* 2. Registered Students Count */}
                <td className="p-4 text-center text-slate-500 tracking-wide font-mono text-base">
                  {course.students}
                </td>

                {/* 3. Status Dynamic Badging */}
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center">
                    {course.status === 'published' ? (
                      /* Published Status Badge - Matches Emerald reference colors */
                      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#E6F7F0] text-[#00A499] min-w-[95px]">
                        {t.statusPublished}
                      </span>
                    ) : (
                      /* Under Review Status Badge - Matches Amber reference colors */
                      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#D97706] min-w-[95px]">
                        {t.statusReview}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </section>
  );
}