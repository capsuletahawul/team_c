import React, { useState, useEffect } from 'react';
import { getTrainerAnalytics, submitB2BRequest } from './mocks/mockApi';

// Reusable Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from './components/Button';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';

// Global Context
import { useLanguage } from './context/LanguageContext';

function TrainerDashboard() {
  const { t, lang } = useLanguage();
  const l = t.trainerDashboard;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    durationWeeks: '',
    maxStudents: '',
    videoDurationMinutes: '',
    requirementsNotes: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getTrainerAnalytics().then(result => {
      if (!isMounted) return;
      if (result.success) {
        setStats(result.data);
      }
      setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.requirementsNotes.length < 20) {
      setError(l.messages.valErrorLength);
      return;
    }

    submitB2BRequest({ requirementsNotes: formData.requirementsNotes, ...formData }).then(result => {
      if (result.success) {
        setMessage(`${l.messages.successPrefix}${result.data.ticketId}`);
        setFormData({ title: '', price: '', durationWeeks: '', maxStudents: '', videoDurationMinutes: '', requirementsNotes: '' });
      } else {
        setError(result.details?.requirementsNotes || l.messages.genericError);
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex flex-col items-center justify-center">
        <LoadingIndicator message={l.loading} />
      </div>
    );
  }

  // Dynamic Tailwind values for LTR/RTL support
  const borderSide = t.dir === 'rtl' ? 'border-r-4' : 'border-l-4';
  const heroPosition = t.dir === 'rtl' ? 'left-[-40px]' : 'right-[-40px]';
  const rotateClass = t.dir === 'rtl' ? 'rotate-[-25deg]' : 'rotate-[25deg]';
  const elementPosition = t.dir === 'rtl' ? 'left-10' : 'right-10';
  const starPosition = t.dir === 'rtl' ? 'right-24' : 'left-24';

  return (
    <div className="min-h-screen bg-capsule-bg text-capsule-navy font-sans antialiased flex flex-col" dir={t.dir}>
      <Navbar activePage="bootcamps" showAuthButtons={false} />

      <main className="flex-grow">
        {/* Dynamic Hero Section */}
        <div className="relative bg-capsule-gradient text-white py-16 px-8 overflow-hidden shadow-md">
          <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block opacity-90 ${heroPosition}`}>
            <div className="relative w-80 h-40">
              <div className={`absolute w-72 h-24 bg-white/10 border border-white/20 rounded-full backdrop-blur-xs ${rotateClass}`}></div>
              <div className={`absolute w-64 h-20 bg-capsule-gold rounded-full top-12 shadow-lg ${rotateClass} ${elementPosition}`}></div>
              <span className={`absolute text-capsule-gold text-xl top-[-10px] animate-pulse ${starPosition}`}>✦</span>
            </div>
          </div>

          <div className={`max-w-7xl mx-auto relative z-10 text-center lg:text-${t.dir === 'rtl' ? 'right' : 'left'}`}>
            <span className="bg-white/10 border border-white/20 text-xs px-4 py-1.5 rounded-full font-semibold mb-4 inline-block backdrop-blur-xs">
              {l.hero.badge}
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">{l.hero.title}</h1>
            <p className="text-gray-200 text-sm max-w-xl leading-relaxed mx-auto lg:mx-0">{l.hero.subtitle}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <p className="text-xs font-bold text-gray-400 mb-2">{l.stats.payout}</p>
              <h3 className="text-3xl font-black text-capsule-teal">
                {stats?.totalPayoutCollected} <span className="text-xs font-normal text-gray-400">{l.stats.currency}</span>
              </h3>
            </div>

            <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ${borderSide} border-capsule-gold hover:shadow-md transition`}>
              <p className="text-xs font-bold text-capsule-dark-gold mb-2">{l.stats.activeStudents}</p>
              <h3 className="text-3xl font-black text-capsule-navy">
                {stats?.activeEnrolledStudentsCount} <span className="text-sm font-bold text-capsule-teal">{l.stats.studentLabel}</span>
              </h3>
            </div>

            <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ${borderSide} border-capsule-navy hover:shadow-md transition`}>
              <p className="text-xs font-bold text-capsule-navy mb-2">{l.stats.accountStatus}</p>
              <h3 className="text-xl font-bold text-emerald-600 mt-2">{l.stats.verified}</h3>
            </div>
          </div>

          {/* Creation Form */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-3xl mx-auto shadow-sm">
            <div className="border-b border-gray-100 pb-5 mb-6">
              <h2 className="text-xl font-bold text-capsule-navy flex items-center gap-2">{l.form.title}</h2>
            </div>

            {message && (
              <div className={`mb-5 p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold ${borderSide} border-emerald-500`}>
                {message}
              </div>
            )}
            
            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">{l.form.labels.title}</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder={l.form.placeholders.title} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium transition" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">{l.form.labels.price}</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">{l.form.labels.duration}</label>
                  <input type="number" name="durationWeeks" value={formData.durationWeeks} onChange={handleInputChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium transition" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">{l.form.labels.maxStudents}</label>
                  <input type="number" name="maxStudents" value={formData.maxStudents} onChange={handleInputChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">{l.form.labels.videoDuration}</label>
                  <input type="number" name="videoDurationMinutes" value={formData.videoDurationMinutes} onChange={handleInputChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium transition" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">{l.form.labels.requirements}</label>
                <textarea name="requirementsNotes" value={formData.requirementsNotes} onChange={handleInputChange} required rows="3" placeholder={l.form.placeholders.requirements} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-capsule-teal text-sm font-medium resize-none transition"></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary">{l.form.submitBtn}</Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TrainerDashboard;