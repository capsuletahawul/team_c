import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { COURSES, TRAINERS } from '../data/mockData';
import { CheckCircle, Clock, BookOpen, Award, Shield, User, Star, ChevronDown, ChevronUp, AlertCircle, PlayCircle } from 'lucide-react';

export default function CourseDetails() {
  const { lang } = useTheme();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === id) || COURSES[0];
  const trainer = TRAINERS.find(t => t.id === course.trainerId);

  const [expandedSection, setExpandedSection] = useState(course.curriculum?.[0]?.id || null);

  const handleEnroll = () => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    if (user.role !== 'student') {
      alert(lang === 'ar' ? 'فقط الطلاب يمكنهم التسجيل في الدورات' : 'Only students can enroll in courses');
      return;
    }
    navigate(`/payment/${course.id}`);
  };

  const isEnrolled = user && user.role === 'student' && user.profile?.enrolledCourses?.some(c => c.courseId === course.id);

  const toggleSection = (sId) => {
    setExpandedSection(prev => (prev === sId ? null : sId));
  };

  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: 'var(--gradient-hero)', color: 'white', padding: 'var(--space-16) 0', position: 'relative' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{course.level[lang]}</span>
              {course.liveSession?.scheduled && <span className="badge badge-live">🔴 {lang === 'ar' ? 'بث مباشر مع المدرب' : 'Live Session Scheduled'}</span>}
            </div>
            <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 900, marginBottom: 'var(--space-3)' }}>{course.title[lang]}</h1>
            <p style={{ fontSize: 'var(--font-size-base)', opacity: 0.9, lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>{course.description[lang]}</p>
            
            <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#FFD369', fontSize: 18 }}>★</span>
                <span style={{ fontWeight: 700 }}>{course.rating}</span>
                <span style={{ opacity: 0.7 }}>({course.reviews?.length} {lang === 'ar' ? 'تقييم' : 'reviews'})</span>
              </div>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>👥 {course.studentsCount.toLocaleString()} {lang === 'ar' ? 'طالب مسجل' : 'students enrolled'}</span>
              <span style={{ opacity: 0.5 }}>·</span>
              {trainer && (
                <Link to={`/trainer-details/${trainer.id}`} style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <img src={trainer.avatar} alt="" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                  <span style={{ fontWeight: 600 }}>{trainer.name[lang]}</span>
                </Link>
              )}
            </div>
          </div>

          <div style={{ display: 'none' }} /> {/* Placeholder for grid */}
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <div className="container" style={{ padding: 'var(--space-12) 0 var(--space-16)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--space-8)', alignItems: 'start' }}>
          {/* Main Details */}
          <div>
            {/* Outcomes */}
            <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontWeight: 800, marginBottom: 'var(--space-4)' }}>{lang === 'ar' ? 'ماذا ستتعلم في هذه الدورة؟' : 'What you will learn in this course'}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                {[
                  { ar: 'فهم شامل للمبادئ والأساسيات', en: 'Comprehensive understanding of core principles' },
                  { ar: 'تطبيقات ومشاريع عملية واقعية بحتة', en: 'Purely practical real-world applications & projects' },
                  { ar: 'الحصول على المهارات المطلوبة لسوق العمل', en: 'Acquiring high-demand job market skills' },
                  { ar: 'التحضير لشهادات مهنية مميزة', en: 'Preparation for outstanding professional credentials' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>
                    <CheckCircle size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                    <span>{item[lang]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontWeight: 800, marginBottom: 'var(--space-4)' }}>{lang === 'ar' ? 'منهج الدورة التدريبية' : 'Course Curriculum'}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {course.curriculum?.map(section => (
                  <div key={section.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <button onClick={() => toggleSection(section.id)} style={{ width: '100%', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-base)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', textAlign: 'inherit' }}>
                      <span>{section.title[lang]}</span>
                      {expandedSection === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {expandedSection === section.id && (
                      <div style={{ borderTop: '1px solid var(--border-color)' }}>
                        {section.lessons?.map((lesson, idx) => (
                          <div key={lesson.id} style={{ padding: 'var(--space-3) var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderBottom: idx < section.lessons.length - 1 ? '1px solid var(--border-light)' : 'none', fontSize: 'var(--font-size-sm)' }}>
                            <PlayCircle size={16} style={{ color: 'var(--text-muted)' }} />
                            <span style={{ flex: 1 }}>{lesson.title[lang]}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Trainer Profile Card */}
            {trainer && (
              <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontWeight: 800, marginBottom: 'var(--space-4)' }}>{lang === 'ar' ? 'عن المدرب' : 'About the Trainer'}</h2>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <img src={trainer.avatar} alt="" style={{ width: 64, height: 64, borderRadius: '50%' }} />
                  <div>
                    <h3 style={{ fontWeight: 800 }}>{trainer.name[lang]}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>{trainer.title[lang]}</p>
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.7 }}>{trainer.bio[lang]}</p>
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <Link to={`/trainer-details/${trainer.id}`} className="btn btn-outline btn-sm">{lang === 'ar' ? 'عرض الصفحة الكاملة' : 'View Full Profile'}</Link>
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="card" style={{ padding: 'var(--space-6)' }}>
              <h2 style={{ fontWeight: 800, marginBottom: 'var(--space-4)' }}>{lang === 'ar' ? 'تقييمات الطلاب' : 'Student Reviews'}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {course.reviews?.map(review => (
                  <div key={review.id} style={{ paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', display: 'block' }}>{review.studentName}</span>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{review.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= review.rating ? '#FFD369' : 'var(--border-color)', fontSize: 12 }}>★</span>)}
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>{review.comment[lang]}</p>
                  </div>
                ))}
                {(!course.reviews || course.reviews.length === 0) && (
                  <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>{lang === 'ar' ? 'لا توجد تقييمات بعد لهذه الدورة.' : 'No reviews yet for this course.'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Purchase Block */}
          <div style={{ position: 'sticky', top: 'calc(var(--navbar-height) + var(--space-4))' }}>
            <div className="card" style={{ padding: 'var(--space-5)', boxShadow: 'var(--shadow-lg)' }}>
              <img src={course.thumbnail} alt="" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }} />
              
              <div style={{ marginBottom: 'var(--space-4)' }}>
                {course.isFree ? (
                  <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 900, color: 'var(--color-success)' }}>{lang === 'ar' ? 'مجانية' : 'Free'}</span>
                ) : (
                  <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 900, color: 'var(--color-primary)' }}>{course.price} {lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                )}
              </div>

              {isEnrolled ? (
                <Link to={`/student/player/${course.id}`} className="btn btn-primary btn-full" style={{ marginBottom: 'var(--space-4)', textDecoration: 'none', justifyContent: 'center' }}>
                  <PlayCircle size={18} /> {lang === 'ar' ? 'اذهب لغرفة الدراسة' : 'Go to Course'}
                </Link>
              ) : (
                <button className="btn btn-primary btn-full" onClick={handleEnroll} style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-base)' }}>
                  {course.isFree ? (lang === 'ar' ? 'سجّل الآن مجاناً' : 'Enroll Now') : (lang === 'ar' ? 'اشترِ الدورة التدريبية' : 'Buy Course Now')}
                </button>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Clock size={16} /> <span>⏱ {course.duration} {lang === 'ar' ? 'من المحتوى التعليمي' : 'of content'}</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <BookOpen size={16} /> <span>📋 {course.lessonsCount} {lang === 'ar' ? 'درس عملي' : 'lessons'}</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Award size={16} /> <span>🏆 {lang === 'ar' ? 'شهادة إتمام معتمدة' : 'Certificate of completion'}</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <Shield size={16} /> <span>🔑 {lang === 'ar' ? 'وصول كامل مدى الحياة' : 'Full lifetime access'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
