/**
 * CourseCurriculum.jsx
 * * Interactive, highly stylized Accordion component displaying the course syllabus.
 * Features collapse/expand animations, custom topic lists, dynamic progress indicators,
 * and colored badging to represent distinct learning tracks.
 */

import { useState } from 'react';
import { ChevronDownIcon, PlayIcon, DocumentTextIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline';

// ============================================
// TRANSLATIONS & SYLLABUS DATA
// ============================================
const curriculumData = {
  en: {
    title: 'Bootcamp Curriculum',
    subtitle: 'Explore the structured operational roadmap designed to take you from foundational engineering to high-tier enterprise architecture.',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    lessons: 'Lessons',
    modules: [
      {
        id: 1,
        week: 'Week 1 - 2',
        title: 'Deep-Dive Into LLM Architectures & Foundations',
        duration: '20 Hours',
        topics: [
          { type: 'video', name: 'Introduction to Transformers & Attention Mechanisms', duration: '45 mins' },
          { type: 'code', name: 'Hands-on: Building Tokenizers from Scratch', duration: '2 hours' },
          { type: 'doc', name: 'Reading: Corporate AI Compliance & Open-Source vs Proprietary', duration: '15 mins' }
        ]
      },
      {
        id: 2,
        week: 'Week 3 - 5',
        title: 'Advanced Production-Grade RAG Systems',
        duration: '35 Hours',
        topics: [
          { type: 'video', name: 'Vector Databases, Embeddings, & Chunking Tactical Strategies', duration: '60 mins' },
          { type: 'code', name: 'Lab: Hybrid Search Pipelines (Dense + Sparse Retrieval)', duration: '4 hours' },
          { type: 'code', name: 'Project: Implementing Re-ranking & Query Expansion', duration: '6 hours' }
        ]
      },
      {
        id: 3,
        week: 'Week 6 - 8',
        title: 'Multi-Agent Systems & Autonomous Pipelines',
        duration: '40 Hours',
        topics: [
          { type: 'video', name: 'Orchestration Frameworks: LangGraph, AutoGen, & CrewAI', duration: '90 mins' },
          { type: 'code', name: 'Lab: Memory Management & State Control in Long-Running Agents', duration: '5 hours' },
          { type: 'code', name: 'Capstone: Enterprise Multi-Agent Deployment via Docker', duration: '12 hours' }
        ]
      }
    ]
  },
  ar: {
    title: 'المنهج وخطة المعسكر المتقدمة',
    subtitle: 'استكشف خارطة الطريق الهيكلية والعملية المصممة لنقلك من الأساسيات البرمجية إلى هندسة الأنظمة الضخمة للشركات.',
    expandAll: 'توسيع الكل',
    collapseAll: 'إغلاق الكل',
    lessons: 'دروس',
    modules: [
      {
        id: 1,
        week: 'الأسبوع 1 - 2',
        title: 'الغوص العميق في بنيات النماذج اللغوية الكبيرة (LLMs)',
        duration: '20 ساعة',
        topics: [
          { type: 'video', name: 'مقدمة في نماذج الـ Transformers وآليات الانتباه (Attention)', duration: '45 دقيقة' },
          { type: 'code', name: 'تطبيق عملي: بناء الـ Tokenizers البرمجية من الصفر', duration: 'ساعتين' },
          { type: 'doc', name: 'قراءة موجهة: حوكمة الذكاء الاصطناعي والمفتوح مقابل المغلق', duration: '15 دقيقة' }
        ]
      },
      {
        id: 2,
        week: 'الأسبوع 3 - 5',
        title: 'أنظمة استرجاع المعلومات المعززة بالتوليد (RAG) للإنتاج الحقيقي',
        duration: '35 ساعة',
        topics: [
          { type: 'video', name: 'قواعد البيانات المتجهة (Vector DBs) واستراتيجيات تقسيم النصوص', duration: '60 دقيقة' },
          { type: 'code', name: 'معمل عملي: بناء خطوط البحث الهجين (Hybrid Search Pipelines)', duration: '4 ساعات' },
          { type: 'code', name: 'مشروع: تنفيذ أنظمة إعادة الترتيب (Re-ranking) وتوسيع الاستعلام', duration: '6 ساعات' }
        ]
      },
      {
        id: 3,
        week: 'الأسبوع 6 - 8',
        title: 'الأنظمة متعددة الوكلاء (Multi-Agent Systems) والتدفقات المستقلة',
        duration: '40 ساعة',
        topics: [
          { type: 'video', name: 'إطارات الإدارة والربط: LangGraph، AutoGen، و CrewAI', duration: '90 دقيقة' },
          { type: 'code', name: 'معمل: إدارة الذاكرة والتحكم في الحالات (State Control) للوكلاء البرمجيين', duration: '5 ساعات' },
          { type: 'code', name: 'مشروع التخرج: نشر وكلاء الذكاء الاصطناعي للشركات عبر Docker', duration: '12 ساعة' }
        ]
      }
    ]
  }
};

export default function CourseCurriculum({ lang = 'ar' }) {
  const t = curriculumData[lang];
  const isRTL = lang === 'ar';

  // Tracking expanded modules in an array to allow multiple open sections simultaneously
  const [expandedModules, setExpandedModules] = useState([1]); // Module 1 open by default

  const toggleModule = (id) => {
    if (expandedModules.includes(id)) {
      setExpandedModules(expandedModules.filter((mId) => mId !== id));
    } else {
      setExpandedModules([...expandedModules, id]);
    }
  };

  const expandAll = () => setExpandedModules(t.modules.map(m => m.id));
  const collapseAll = () => setExpandedModules([]);

  // Helper function to render topic icons dynamically based on task type
  const renderIcon = (type) => {
    switch (type) {
      case 'video': return <PlayIcon className="w-4 h-4 text-cyan-500" />;
      case 'code': return <CodeBracketSquareIcon className="w-4 h-4 text-amber-500" />;
      case 'doc': return <DocumentTextIcon className="w-4 h-4 text-purple-500" />;
      default: return <PlayIcon className="w-4 h-4 text-capsule-teal" />;
    }
  };

  return (
    <section 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="w-full bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md shadow-gray-100/40 relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-capsule-teal" />

      {/* ============================================
          SECTION HEADER WITH CONTROL ACTIONS
          ============================================ */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-capsule-navy flex items-center gap-3">
            <span className="w-2.5 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 inline-block" />
            {t.title}
          </h2>
          <p className="text-sm text-capsule-navy/70 max-w-xl">
            {t.subtitle}
          </p>
        </div>
        
        {/* Quick Expand/Collapse Triggers */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
          <button 
            onClick={expandAll}
            className="text-capsule-teal hover:text-cyan-600 transition-colors bg-capsule-bg px-3 py-1.5 rounded-lg"
          >
            {t.expandAll}
          </button>
          <button 
            onClick={collapseAll}
            className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg"
          >
            {t.collapseAll}
          </button>
        </div>
      </div>

      {/* ============================================
          ACCORDION COMPONENT LIST
          ============================================ */}
      <div className="space-y-4">
        {t.modules.map((module) => {
          const isOpen = expandedModules.includes(module.id);
          
          return (
            <div 
              key={module.id} 
              className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                isOpen ? 'border-capsule-teal/30 bg-capsule-bg/20 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
            >
              {/* Header Tab Trigger */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-start font-sans focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-grow">
                  {/* Colorful Week / Time Badge */}
                  <span className="inline-block self-start sm:self-auto px-2.5 py-1 text-xs font-bold text-white rounded-md bg-gradient-to-r from-capsule-navy to-[#1a5570] shadow-sm whitespace-nowrap">
                    {module.week}
                  </span>
                  {/* Module Title */}
                  <h3 className="text-sm sm:text-base font-bold text-capsule-navy group-hover:text-capsule-teal transition-colors">
                    {module.title}
                  </h3>
                </div>

                {/* Right Side Stats & Caret */}
                <div className={`flex items-center gap-3 ${isRTL ? 'mr-4' : 'ml-4'}`}>
                  <span className="hidden sm:inline-block text-xs font-semibold text-capsule-navy/60 bg-white border border-gray-100 px-2 py-0.5 rounded-md">
                    {module.topics.length} {t.lessons} • {module.duration}
                  </span>
                  <ChevronDownIcon 
                    className={`w-5 h-5 text-capsule-navy/50 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-capsule-teal' : ''}`} 
                  />
                </div>
              </button>

              {/* Collapsible Topics Wrapper */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[1000px] border-t border-gray-100/70' : 'max-h-0'
                } overflow-hidden`}
              >
                <div className="p-4 sm:p-5 space-y-3 bg-white/60 backdrop-blur-xs">
                  {module.topics.map((topic, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-50 shadow-xs hover:border-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon Wrapper based on Media Type */}
                        <div className="p-2 rounded-lg bg-gray-50">
                          {renderIcon(topic.type)}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-capsule-navy/90">
                          {topic.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-400">
                        {topic.duration}
                      </span>
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