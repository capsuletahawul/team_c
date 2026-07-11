// src/pages/SignIn.jsx
import React from "react";
import { useNavigate } from "react-router-dom";


import { COPY } from "../i18n/copy";
import { CapsuleMark, EyeIcon } from "../components/Icons";
import "../styles/auth.css";

/**
 * صفحة تسجيل الدخول.
 * تستقبل من الأب (App.jsx):
 * - lang        : اللغة الحالية ("ar" أو "en")
 * - onToggleLang: دالة لتبديل اللغة
 * - onGoToSignUp: دالة للتنقل إلى صفحة إنشاء الحساب
 */
export default function SignIn({ lang, onToggleLang, onGoToSignUp }) {
  const [showPw, setShowPw] = React.useState(false);

const navigate = useNavigate();

const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");

  const t = COPY[lang];
  const form = t.login;

const handleLogin = (e) => {
  e.preventDefault();

  // Student
  if (email === "student@test.com" && password === "123456") {
    navigate("/student-dashboard");
    return;
  }

  // Trainer
  if (email === "trainer@test.com" && password === "123456") {
    navigate("/trainer-dashboard");
    return;
  }

  // Admin
  if (email === "admin@test.com" && password === "123456") {
    navigate("/admin-dashboard");
    return;
  }

  // Company — Successfully updated to hit the dashboard directly
  if (email === "company@test.com" && password === "123456") {
    navigate("/company-dashboard"); 
    return;
  }

  alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
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
            <div className="auth-tabs">
              <button className="is-active">{t.tabs.login}</button>
              <button onClick={onGoToSignUp}>{t.tabs.signup}</button>
              <span className="tab-underline pos-1" />
            </div>

            <h2>{form.title}</h2>
            <p className="auth-subtitle">{form.subtitle}</p>

<form className="auth-form" onSubmit={handleLogin}>
                <div className="field">
                <label>{form.email}</label>
                <input
  type="email"
  placeholder={form.emailPh}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
              </div>

              <div className="field">
                <label>{form.password}</label>
                <div className="password-input">
<input
  type={showPw ? "text" : "password"}
  placeholder={form.passwordPh}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPw(!showPw)}
                    aria-label="toggle password visibility"
                  >
                    <EyeIcon open={showPw} />
                  </button>
                </div>
              </div>

              <div className="row-between">
                <label className="checkbox">
                  <input type="checkbox" />
                  <span>{form.remember}</span>
                </label>
                <a href="#" className="link-muted">{form.forgot}</a>
              </div>

              <button type="submit" className="submit-btn">{form.submit}</button>
            </form>

            <div className="divider"><span>{form.or}</span></div>

            <div className="social-row">
              {t.social.map((s, i) => (
                <button key={i} className="social-btn">
                  {s === "Google" ? "🔴" : "🔵"} {s}
                </button>
              ))}
            </div>

            <p className="switch-line">
              {form.noAccount}{" "}
              <button className="switch-btn" onClick={onGoToSignUp}>
                {form.switchLink}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
