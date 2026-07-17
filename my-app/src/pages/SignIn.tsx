// صفحة تسجيل الدخول.
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { COPY } from "../i18n/copy";
import { CapsuleMark, EyeIcon } from "../components/Icons";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

/**
 * صفحة تسجيل الدخول.
 * تستقبل من الأب (App.jsx):
 * - lang        : اللغة الحالية ("ar" أو "en")
 * - onToggleLang: دالة لتبديل اللغة
 * - onGoToSignUp: دالة للتنقل إلى صفحة إنشاء الحساب
 */
// الخصائص التي يستقبلها المكون من الصفحة الرئيسية.
interface SignInProps {
  lang: string;
  onToggleLang: () => void;
  onGoToSignUp: () => void;
}

// المكون الرئيسي المسؤول عن تسجيل دخول المستخدم.
export default function SignIn({ lang, onToggleLang, onGoToSignUp }: SignInProps) {
  // تحديد ما إذا كانت كلمة المرور ظاهرة أو مخفية.
  const [showPw, setShowPw] = useState<boolean>(false);

const navigate = useNavigate();
const { login } = useAuth();

// تخزين البريد الإلكتروني الذي يدخله المستخدم.
const [email, setEmail] = useState<string>("");
// تخزين كلمة المرور المدخلة.
const [password, setPassword] = useState<string>("");

  const t = COPY[lang as keyof typeof COPY];
  const form = t.login;

// التحقق من بيانات تسجيل الدخول وتوجيه المستخدم إلى لوحة التحكم المناسبة.
const handleLogin = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Student
  if (email === "student@test.com" && password === "123456") {
    login("student");
    navigate("/student-dashboard");
    return;
  }

  // Trainer
  if (email === "trainer@test.com" && password === "123456") {
    login("trainer");
    navigate("/trainer-dashboard");
    return;
  }

  // Admin
  if (email === "admin@test.com" && password === "123456") {
    login("admin");
    navigate("/admin-dashboard");
    return;
  }

  // Company — Successfully updated to hit the dashboard directly
  if (email === "company@test.com" && password === "123456") {
    login("company");
    navigate("/company-dashboard"); 
    return;
  }

  alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
};


  return (
    <div className="auth-root" dir={t.dir} lang={lang}>
      <div className="auth-shell">
        {/* القسم الخاص بالشكل والتصميم */}
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

        {/* نموذج تسجيل الدخول */}
        <div className="auth-form-side">
          <div className="auth-form-wrap">
            <div className="auth-tabs">
              <button className="is-active">{t.tabs.login}</button>
              <button onClick={onGoToSignUp}>{t.tabs.signup}</button>
              <span className="tab-underline pos-1" />
            </div>

            <h2>{form.title}</h2>
            <p className="auth-subtitle">{form.subtitle}</p>

{/* نموذج إدخال بيانات تسجيل الدخول */}
<form className="auth-form" onSubmit={handleLogin}>
                {/* حقل البريد الإلكتروني */}
                {/* حقل كلمة المرور */}
              <div className="field">
                <label>{form.email}</label>
                <input
  type="email"
  placeholder={form.emailPh}
  value={email}
  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
/>
              </div>

              <div className="field">
                <label>{form.password}</label>
                <div className="password-input">
<input
  type={showPw ? "text" : "password"}
  placeholder={form.passwordPh}
  value={password}
  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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

              {/* خيارات تذكرني ورابط نسيت كلمة المرور */}
              <div className="row-between">
                <label className="checkbox">
                  <input type="checkbox" />
                  <span>{form.remember}</span>
                </label>
                <Link to="/forgot-password" className="link-muted">
  {form.forgot}
</Link>
              </div>

              <button type="submit" className="submit-btn">{form.submit}</button>
            </form>

            <div className="divider"><span>{form.or}</span></div>

            {/* أزرار تسجيل الدخول عبر وسائل التواصل */}
            <div className="social-row">
              {t.social.map((s: string, i: number) => (
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