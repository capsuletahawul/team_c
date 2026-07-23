import React, { useState, useEffect } from "react";

// Reusable Components
import TrainerNavbar from "../components/TrainerNavbar";
import Footer from "../components/Footer";
import LoadingIndicator from "../components/LoadingIndicator";

// Global Context
import { useLanguage } from "../context/LanguageContext";

// Mock API layer
import { getTrainerProfile } from "../mocks/mockApi";
import type { TrainerProfile as ApiTrainerProfile } from "../mocks/mockApi";

// Trainer basic contact and metrics interface
interface TrainerState {
  email: string;
  phone: string;
  students: number;
  rating: number;
}

// Editable trainer profile details interface
interface EditedDataState {
  fullName: string;
  specialization: string;
  bio: string;
  email: string;
  experienceVal: string;
}

// Course details interface
interface CourseItem {
  id: number;
  title: string;
  students: number;
  status: "published" | "underReview";
}

// Maps the raw mockApi trainer profile fields into the local editable-form shape, localized by lang
function apiToProfile(apiProfile: ApiTrainerProfile, lang: "ar" | "en"): EditedDataState {
  return {
    fullName: apiProfile.name,
    specialization: lang === "ar" ? (apiProfile.specialtyAr || apiProfile.specialty) : apiProfile.specialty,
    bio: lang === "ar" ? (apiProfile.bioAr || apiProfile.bio) : apiProfile.bio,
    email: apiProfile.email,
    experienceVal: `${apiProfile.experience}`,
  };
}

// Maps the raw mockApi course records (published/review) into the local table shape (published/underReview), localized by lang
function apiToCourses(apiCourses: ApiTrainerProfile["courses"], lang: "ar" | "en"): CourseItem[] {
  return apiCourses.map((c) => ({
    id: c.id,
    title: lang === "ar" ? (c.nameAr || c.name) : c.name,
    students: c.students,
    status: c.status === "published" ? "published" : "underReview",
  }));
}

const TrainerProfile: React.FC = () => {
  const { t, lang } = useLanguage();
  const l = t.trainerProfile;
  const isRTL = lang === "ar";

  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  // 1. Basic non-translated trainer states, populated from mockApi
  const [trainer, setTrainer] = useState<TrainerState>({
    email: "",
    phone: "",
    students: 0,
    rating: 0,
  });

  const [courses, setCourses] = useState<CourseItem[]>([]);

  // Raw bilingual profile as returned by mockApi, kept so we can re-localize on language toggle without refetching
  const [rawProfile, setRawProfile] = useState<ApiTrainerProfile | null>(null);

  // 2. Baseline profile fetched from mockApi, used as the display source before any local edit
  const [fetchedProfile, setFetchedProfile] = useState<EditedDataState | null>(null);

  // 3. Temporarily storage and draft state for local form updates
  const [editedData, setEditedData] = useState<EditedDataState | null>(null);
  const [draft, setDraft] = useState<Partial<EditedDataState>>({});

  useEffect(() => {
    let isMounted = true;

    const loadTrainerProfile = async () => {
      const response = await getTrainerProfile();
      if (!isMounted) return;

      if (response.success && response.data) {
        setRawProfile(response.data);
        setFetchedProfile(apiToProfile(response.data, lang));
        setCourses(apiToCourses(response.data.courses, lang));
        setTrainer({
          email: response.data.email,
          phone: response.data.phone,
          students: response.data.stats.studentsCount,
          rating: response.data.stats.rating,
        });
      } else {
        setLoadError(true);
      }

      setLoading(false);
    };

    loadTrainerProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  // Closes edit mode on language toggle while retaining any edited user modifications
  useEffect(() => {
    setIsEditing(false);
  }, [lang]);

  // Re-localizes the fetched (non-edited) profile fields whenever the language toggles
  useEffect(() => {
    if (!rawProfile) return;
    setFetchedProfile(apiToProfile(rawProfile, lang));
    setCourses(apiToCourses(rawProfile.courses, lang));
  }, [lang, rawProfile]);

  // Dynamically resolves metadata with priority to manual user edits over fetched mockApi data
  const currentTrainer: EditedDataState = {
    fullName: editedData?.fullName || fetchedProfile?.fullName || "",
    specialization: editedData?.specialization || fetchedProfile?.specialization || "",
    bio: editedData?.bio || fetchedProfile?.bio || "",
    email: editedData?.email || trainer.email,
    experienceVal: editedData?.experienceVal || fetchedProfile?.experienceVal || "",
  };

  const handleStartEdit = (): void => {
    setDraft({ ...currentTrainer });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Save draft data (asserting full properties since form inputs are required)
    const finalizedData = draft as EditedDataState;
    setEditedData(finalizedData);
    setTrainer((prev) => ({ ...prev, email: finalizedData.email }));
    setIsEditing(false);
  };

  const publicCourses = courses.filter((c) => c.status === "published");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-capsule-bg">
        <LoadingIndicator message={l.loading} />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-capsule-bg">
        <p className="text-sm font-semibold text-capsule-navy">
          {isRTL ? "تعذر تحميل بيانات المدرب." : "Unable to load trainer profile."}
        </p>
      </div>
    );
  }

  return (
    <div dir={t.dir} className="min-h-screen bg-capsule-bg flex flex-col font-sans text-capsule-navy antialiased">
<TrainerNavbar
  activePage="profile"
  onSignIn={() => {}}
  onSignUp={() => {}}
/>
      
      <main className="flex-grow">
        {/* Banner Title */}
        <div className="relative bg-capsule-gradient text-white py-14 px-8 overflow-hidden shadow-inner">
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-3xl font-extrabold text-white">{l.hero.title}</h1>
            <p className="text-sm text-gray-200 mt-2">{l.hero.subtitle}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-8 mb-8">
            {!isEditing ? (
              /* Public read-only profile layout view */
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-28 h-28 rounded-full bg-capsule-teal text-white flex items-center justify-center text-4xl font-black shrink-0 select-none">
                  {currentTrainer.fullName?.charAt(0) || "T"}
                </div>
                <div className={`flex-1 ${isRTL ? "text-center md:text-right" : "text-center md:text-left"}`}>
                  <h2 className="text-2xl font-black mb-2 text-capsule-navy">{currentTrainer.fullName}</h2>
                  <p className="text-capsule-teal font-semibold mb-2">{currentTrainer.specialization}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p dir="ltr" className={isRTL ? "text-right" : "text-left"}>📧 {currentTrainer.email}</p>
                    <p className="text-sm text-gray-600 font-bold mt-2">{l.profile?.experience}{currentTrainer.experienceVal}</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-gray-600 max-w-2xl mx-auto md:mx-0">{currentTrainer.bio}</p>
                  <div className="pt-4 flex justify-center md:justify-start">
                    <button onClick={handleStartEdit} className="bg-[#387B84] hover:bg-[#2C6269] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer">
                      {l.editBtn || (isRTL ? "تعديل الملف الشخصي" : "Edit Profile")}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Active modification and edit form */
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    required 
                    value={draft.fullName || ""} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, fullName: e.target.value })} 
                    placeholder={l.table?.colTitle} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold" 
                  />
                  <input 
                    type="text" 
                    required 
                    value={draft.specialization || ""} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, specialization: e.target.value })} 
                    placeholder={l.data?.specialization || l.hero?.subtitle} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold" 
                  />
                  <input 
                    type="email" 
                    required 
                    value={draft.email || ""} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, email: e.target.value })} 
                    placeholder={trainer.email} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold" 
                  />
                  <input 
                    type="text" 
                    required 
                    value={draft.experienceVal || ""} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, experienceVal: e.target.value })} 
                    placeholder={l.profile?.experience} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold" 
                  />
                </div>
                <textarea 
                  required 
                  rows={3} 
                  value={draft.bio || ""} 
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft({ ...draft, bio: e.target.value })} 
                  placeholder={l.data?.bio} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold resize-none" 
                />
                
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="bg-capsule-navy text-white font-bold text-sm px-5 py-2.5 rounded-xl cursor-pointer">
                    {l.saveBtn || (isRTL ? "حفظ" : "Save")}
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-600 font-bold text-sm px-5 py-2.5 rounded-xl cursor-pointer">
                    {l.cancelBtn || (isRTL ? "إلغاء" : "Cancel")}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Aggregate Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-bold">{l.stats.coursesCount}</p>
              <h3 className="text-3xl font-black mt-2 text-capsule-navy">{publicCourses.length}</h3>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-bold">{l.stats.studentsCount}</p>
              <h3 className="text-3xl font-black mt-2 text-capsule-teal">{trainer.students}</h3>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <p className="text-xs text-gray-400 font-bold">{l.stats.rating}</p>
              <h3 className="text-3xl font-black mt-2 text-capsule-dark-gold">⭐ {trainer.rating}</h3>
            </div>
          </div>

          {/* Courses Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/70">
              <h2 className="text-base font-bold text-capsule-navy">{l.table.cardTitle}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${isRTL ? "text-right" : "text-left"}`}>
                <thead>
                  <tr className="bg-gray-100/50 text-xs font-bold text-gray-500 border-b border-gray-100">
                    <th className="p-4">{l.table.colTitle}</th>
                    <th className="p-4">{l.table.colStudents}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                  {publicCourses.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-capsule-navy">{c.title}</td>
                      <td className="p-4 text-gray-500">{c.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrainerProfile;