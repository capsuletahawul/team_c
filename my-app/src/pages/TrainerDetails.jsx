import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { getTrainerProfile } from '../mocks/mockApi.js';

// Shared Components
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Button from '../components/Button.jsx';

// Icons
import { PaperAirplaneIcon, UserIcon, EnvelopeIcon, ChatBubbleBottomCenterTextIcon, PhoneIcon, BriefcaseIcon, StarIcon as OutlineStar, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';

const starIndices = [1, 2, 3, 4, 5];

export default function TrainerDetails() {
    const { t, lang } = useLanguage();
const l = t.trainerDetails;
  const isRTL = t.dir === 'rtl';

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Ratings & Contact State
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getTrainerProfile()
      .then((res) => {
        if (!isMounted) return;
        if (res.success && res.data) {
          // Filter to only show published courses on the public profile
          const publicData = {
            ...res.data,
            courses: (res.data.courses || []).filter(c => c.status === 'published')
          };
          setProfile(publicData);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) { setError(true); setLoading(false); }
      });
    return () => { isMounted = false; };
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col justify-between">
        <Navbar activePage="companies" showAuthButtons={true} />
        <div className="flex-grow flex items-center justify-center p-8">
          <LoadingIndicator message={l.loading} />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col justify-between">
        <Navbar activePage="companies" showAuthButtons={true} />
        <div className="flex-grow flex items-center justify-center p-8">
          <ErrorMessage message={l.error} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div dir={t.dir} className="min-h-screen bg-capsule-bg flex flex-col font-sans text-capsule-navy antialiased transition-all duration-300">
      <Navbar activePage="companies" showAuthButtons={true} />
      
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden bg-capsule-gradient pt-14 pb-28 md:py-20 text-white min-h-[240px] flex items-center shadow-inner">
          <div className={`absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-500 ${isRTL ? 'left-6 md:left-16' : 'right-6 md:right-16'}`}>
            <div className="relative w-44 h-24 sm:w-64 sm:h-32 flex items-center justify-center">
              <div className="absolute w-full h-[70%] bg-black/20 backdrop-blur-md rounded-full transform rotate-[-25deg] translate-x-2 translate-y-3" />
              <div className="absolute w-full h-[70%] bg-gradient-to-r from-capsule-dark-gold to-capsule-gold rounded-full transform rotate-[-25deg] shadow-lg border border-white/10" />
            </div>
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className={`max-w-2xl text-center md:text-start ${isRTL ? 'md:pr-6' : 'md:pl-6'}`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">{l.heroTitle}</h1>
              <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed max-w-lg">{l.heroSub}</p>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT WRAPPER */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-16 space-y-8">
          
          {/* 1. PROFILE INFO CARD */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-slate-200/40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-4 text-center md:text-start w-full">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-capsule-navy">{profile.name}</h2>
                  <p className="text-sm font-bold text-capsule-teal mt-0.5">{profile.specialty}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-xs sm:text-sm font-semibold text-gray-500">
                  <div className="flex items-center gap-2"><EnvelopeIcon className="w-4 h-4 text-gray-400" /><a href={`mailto:${profile.email}`} className="hover:text-capsule-teal transition-colors" dir="ltr">{profile.email}</a></div>
                  <div className="hidden sm:block text-gray-300">|</div>
                  <div className="flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-gray-400" /><a href={`tel:${profile.phone}`} className="hover:text-capsule-teal transition-colors" dir="ltr">{profile.phone}</a></div>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-capsule-navy bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 inline-flex">
                  <BriefcaseIcon className="w-4 h-4 text-capsule-teal" /><span>{l.experience}{profile.experience}{l.years}</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">{profile.bio}</p>
              </div>
              <div className="flex-shrink-0 order-first md:order-last">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-capsule-teal flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-md">
                  {profile.avatarLetter || profile.name?.charAt(isRTL ? 3 : 0) || 'A'}
                </div>
              </div>
            </div>
          </div>

          {/* 2. STATS METRICS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col justify-between items-center sm:items-start min-h-[110px]">
              <span className="text-xs font-bold text-gray-400">{l.stats.courses}</span>
              <span className="text-4xl font-black text-capsule-navy mt-2 font-mono">{profile.courses?.length || 0}</span>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col justify-between items-center sm:items-start min-h-[110px]">
              <span className="text-xs font-bold text-gray-400">{l.stats.students}</span>
              <span className="text-4xl font-black text-capsule-teal mt-2 font-mono">{profile.stats?.studentsCount || 0}</span>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col justify-between items-center sm:items-start min-h-[110px]">
              <span className="text-xs font-bold text-gray-400">{l.stats.rating}</span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-4xl font-black text-capsule-dark-gold font-mono">{profile.stats?.rating || '0.0'}</span>
                <SolidStar className="w-7 h-7 text-capsule-dark-gold" />
              </div>
            </div>
          </div>

          {/* 3. COURSES TABLE */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 space-y-4">
            <h3 className="text-lg font-black text-capsule-navy">{l.coursesTitle}</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className={`p-4 font-black ${isRTL ? 'text-right' : 'text-left'}`}>{l.thName}</th>
                    <th className="p-4 text-center font-black">{l.thStudents}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                  {(profile.courses || []).map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className={`p-4 font-black text-capsule-navy ${isRTL ? 'text-right' : 'text-left'}`}>{course.name}</td>
                      <td className="p-4 text-center text-gray-500 font-mono text-base">{course.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. REVIEWS & RATINGS */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-capsule-teal" />
              <h3 className="text-lg font-black text-capsule-navy">{l.reviewsTitle}</h3>
            </div>
            
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-3 text-center sm:text-start">
              <h4 className="text-sm font-black text-capsule-navy">{l.rateTitle}</h4>
              <p className="text-xs font-semibold text-gray-400 max-w-xl leading-relaxed">{l.rateDesc}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <div className="flex items-center justify-center gap-1 text-capsule-gold">
                  {starIndices.map((idx) => (
                    <button key={idx} type="button" disabled={hasRated} onClick={() => { setUserRating(idx); setHasRated(true); }} onMouseEnter={() => !hasRated && setHoverRating(idx)} onMouseLeave={() => !hasRated && setHoverRating(0)} className={`transition-transform duration-100 ${hasRated ? 'cursor-default' : 'hover:scale-125 focus:outline-none'}`}>
                      {(idx <= (hoverRating || userRating)) ? <SolidStar className="w-6 h-6" /> : <OutlineStar className="w-6 h-6 text-gray-300" />}
                    </button>
                  ))}
                </div>
                <div className="text-xs font-bold text-gray-500">
                  {hasRated ? <span className="text-emerald-600 font-black">{l.thankYou}</span> : userRating > 0 ? <span>{l.textSelection} <strong className="text-capsule-dark-gold text-sm">{userRating}</strong></span> : <span className="text-gray-400 font-medium">{l.notRated}</span>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {(profile.reviews || []).map((review) => (
                  <div key={review.id} className="p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-all space-y-3 shadow-xs">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h5 className="text-sm font-black text-capsule-navy">{review.name}</h5>
                        <span className="text-[11px] font-bold text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-capsule-gold">
                        {starIndices.slice(0, review.rating).map((_, i) => <SolidStar key={i} className="w-4 h-4" />)}
                        {starIndices.slice(review.rating).map((_, i) => <OutlineStar key={i} className="w-4 h-4 text-gray-200" />)}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. CONTACT FORM */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 space-y-6">
            <div>
              <h3 className="text-lg font-black text-capsule-navy">{l.contactTitle}</h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-400 max-w-2xl mt-1">{l.contactSub}</p>
            </div>
            
            {contactSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-capsule-teal/20 text-capsule-teal text-sm font-bold">
                {l.msgSuccess}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5" />{l.form.name}</label>
                  <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-capsule-teal focus:bg-white transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><EnvelopeIcon className="w-3.5 h-3.5" />{l.form.email}</label>
                  <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-capsule-teal focus:bg-white transition-all" dir="ltr" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5" />{l.form.message}</label>
                <textarea required rows={3} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-capsule-teal focus:bg-white transition-all resize-none" />
              </div>
              <div className="pt-1 flex justify-end">
                <Button type="submit" variant="primary" className="w-full sm:w-auto flex items-center justify-center gap-2">
                  <span>{l.form.sendBtn}</span>
                  <PaperAirplaneIcon className={`w-4 h-4 transform ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </form>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}