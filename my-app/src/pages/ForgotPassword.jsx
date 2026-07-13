// src/pages/ForgotPassword.jsx
import React from "react";
import { CapsuleMark } from "../components/Icons";
import "../styles/auth.css";
import { Link } from "react-router-dom";

/**
 * صفحة نسيت كلمة المرور.
 * تستقبل من الأب (App.jsx):
 * - lang        : اللغة الحالية ("ar" أو "en")
 * - onToggleLang: دالة لتبديل اللغة
 * - onGoToSignIn: دالة للتنقل إلى صفحة تسجيل الدخول
 *
 * ملاحظة: النصوص هنا موضوعة محليًا لعدم توفر ملف i18n/copy.js وقت البناء.
 * لو عندك نفس الملف، تقدر تنقل مفتاح "forgotPassword" لنفس بنية COPY
 * وتستبدل TEXT[lang] بـ COPY[lang].forgotPassword بسهولة.
 */
const TEXT = {
  ar: {
    dir: "rtl",
    brand: "Capsule",
    tagline: "أدخل بريدك الإلكتروني وسنرسل لك رابط استعادة كلمة المرور",
    title: "نسيت كلمة المرور؟",
    subtitle: "أدخل بريدك الإلكتروني المسجل وسنرسل لك رابط إعادة تعيين كلمة المرور",
    email: "البريد الإلكتروني",
    emailPh: "example@email.com",
    submit: "إرسال",
    sending: "جارٍ الإرسال...",
    backToLogin: "العودة إلى صفحة تسجيل الدخول",
    successTitle: "تحقق من بريدك الإلكتروني",
    successMsg: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
    resendPrefix: "لم يصلك البريد؟",
    resend: "إعادة الإرسال",
    invalidEmail: "الرجاء إدخال بريد إلكتروني صحيح",
  },
  en: {
    dir: "ltr",
    brand: "Capsule",
    tagline: "Enter your email and we'll send you a password reset link",
    title: "Forgot Password?",
    subtitle: "Enter your registered email and we'll send you a link to reset your password",
    email: "Email",
    emailPh: "example@email.com",
    submit: "Send",
    sending: "Sending...",
    backToLogin: "Back to Sign In",
    successTitle: "Check your email",
    successMsg: "A password reset link has been sent to your email",
    resendPrefix: "Didn't receive the email?",
    resend: "Resend",
    invalidEmail: "Please enter a valid email address",
  },
};

export default function ForgotPassword({ lang, onToggleLang, onGoToSignIn }) {
  const t = TEXT[lang] || TEXT.ar;

  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError(t.invalidEmail);
      return;
    }
    if (!emailRegex.test(email)) {
      setError(t.invalidEmail);
      return;
    }

    setIsSubmitting(true);

    // TODO: استبدال هذا بنداء API فعلي لإرسال رابط إعادة التعيين عند جاهزية الباك اند
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleResend = () => {
    setSubmitted(false);
  };

  return (
    <div className="auth-root" dir={t.dir} lang={lang}>
      <div className="auth-shell">
        {/* ---------- الجزء البصري ---------- */}
        <div className="auth-visual">
          <button className="lang-toggle" onClick={onToggleLang}>
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <div className="auth-visual-inner">
            <div className="auth-brand">
              <CapsuleMark size={36} />
              <span>{t.brand}</span>
            </div>
            <div className="auth-art" aria-hidden="true">
              <div className="capsule-big" />
              <div className="capsule-small" />
              <span className="spark spark-1">✦</span>
              <span className="spark spark-2">✦</span>
            </div>
            <p className="auth-tagline">{t.tagline}</p>
          </div>
        </div>

        {/* ---------- الفورم ---------- */}
        <div className="auth-form-side">
          <div className="auth-form-wrap">
            <h2>{t.title}</h2>

            {!submitted ? (
              <>
                <p className="auth-subtitle">{t.subtitle}</p>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                  <div className="field">
                    <label>{t.email}</label>
                    <input
                      type="email"
                      placeholder={t.emailPh}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                    />
                    {error && <span className="field-error">{error}</span>}
                  </div>

                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? t.sending : t.submit}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-box">
                <div className="success-icon">✓</div>
                <h3>{t.successTitle}</h3>
                <p className="auth-subtitle">{t.successMsg}</p>
                <p className="switch-line">
                  {t.resendPrefix}{" "}
                  <button className="switch-btn" onClick={handleResend}>
                    {t.resend}
                  </button>
                </p>
              </div>
            )}

            <p className="switch-line">
               <Link to="/sign-in" className="link-muted as-link">
    {t.backToLogin}
  </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
