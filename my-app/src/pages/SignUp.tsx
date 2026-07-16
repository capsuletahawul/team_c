// صفحة إنشاء حساب جديد.
import React, { useState, ChangeEvent, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import { COPY } from "../i18n/copy";
import { CapsuleMark, EyeIcon } from "../components/Icons";
import "../styles/auth.css";

/**
 * صفحة إنشاء حساب.
 * تستقبل من الأب (App.jsx):
 * - lang        : اللغة الحالية ("ar" أو "en")
 * - onToggleLang: دالة لتبديل اللغة
 * - onGoToSignIn: دالة للتنقل إلى صفحة تسجيل الدخول
 */
// الخصائص التي يستقبلها المكون من الصفحة الرئيسية.
interface SignUpProps {
  lang: string;
  onToggleLang: () => void;
  onGoToSignIn: () => void;
}

// المكون الرئيسي المسؤول عن إنشاء حساب جديد.
export default function SignUp({ lang, onToggleLang, onGoToSignIn }: SignUpProps) {
  // تحديد ما إذا كانت كلمة المرور ظاهرة أو مخفية.
  const [showPw, setShowPw] = useState<boolean>(false);
  // تخزين كلمة المرور التي يدخلها المستخدم.
  const [pwValue, setPwValue] = useState<string>("");
  // تخزين نوع الحساب الذي يختاره المستخدم.
  const [role, setRole] = useState<number>(0);

  const navigate = useNavigate();

// تخزين اسم المستخدم.
const [name, setName] = useState<string>("");
// تخزين البريد الإلكتروني.
const [email, setEmail] = useState<string>("");


  const t = COPY[lang as keyof typeof COPY];
  const form = t.signup;

  // حساب مستوى قوة كلمة المرور.
  const pwStrength =
  pwValue.length < 6
    ? 0
    : pwValue.length < 10
    ? 1
    : 2;

// التحقق من استيفاء كلمة المرور لجميع الشروط المطلوبة.
const passwordChecks = {
  length: pwValue.length >= 8,
  uppercase: /[A-Z]/.test(pwValue),
  lowercase: /[a-z]/.test(pwValue),
  number: /[0-9]/.test(pwValue),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(pwValue),
};


// التحقق من صحة البيانات ثم إنشاء الحساب وتوجيه المستخدم حسب نوعه.
const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // نتأكد أن الحقول ليست فارغة
  if (!name || !email || !pwValue) {
    alert("يرجى تعبئة جميع الحقول");
    return;
  }

  const isPasswordValid =
  passwordChecks.length &&
  passwordChecks.uppercase &&
  passwordChecks.lowercase &&
  passwordChecks.number &&
  passwordChecks.special;

if (!isPasswordValid) {
  alert(
    "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير، وحرف صغير، ورقم، ورمز خاص."
  );
  return;
}

  // Student
  if (role === 0) {
    navigate("/student-dashboard");
    return;
  }

  // Trainer
  if (role === 1) {
    navigate("/trainer-dashboard");
    return;
  }

  // Company
  if (role === 2) {
    navigate("/company-dashboard");
    return;
  }
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

        {/* نموذج إنشاء الحساب */}
        <div className="auth-form-side">
          <div className="auth-form-wrap">
            <div className="auth-tabs">
              <button onClick={onGoToSignIn}>{t.tabs.login}</button>
              <button className="is-active">{t.tabs.signup}</button>
              <span className="tab-underline pos-2" />
            </div>

            <h2>{form.title}</h2>
            <p className="auth-subtitle">{form.subtitle}</p>


{/* نموذج إدخال بيانات إنشاء الحساب */}
<form className="auth-form" onSubmit={handleSignUp}>


              <div className="field">
                <label>{form.name}</label>
<input
  type="text"
  placeholder={form.namePh}
  value={name}
  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
/>

              </div>

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
                    value={pwValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPwValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPw(!showPw)}
                    aria-label="toggle password visibility"
                  >
                    <EyeIcon open={showPw} />
                  </button>
                </div>
                {pwValue.length > 0 && (
                  <div className="pw-strength">
                    <div className="pw-bars">
                      {[0, 1, 2].map((i: number) => (
                        <span key={i} className={`pw-bar ${i <= pwStrength ? `level-${pwStrength}` : ""}`} />
                      ))}
                    </div>
                    <span className="pw-label">
                      {t.strengthLabel}: {t.strength[pwStrength]}
                    </span>
                  </div>
                )}
                {pwValue.length === 0 && <span className="pw-hint">{t.passwordHint}</span>}
              </div>



 {/* عرض شروط كلمة المرور للمستخدم */}
 <div className="password-rules">

  <div className="rule">
    <span className={`rule-dot ${passwordChecks.length ? "valid" : ""}`}></span>
    <span>8 أحرف على الأقل</span>
  </div>

  <div className="rule">
    <span className={`rule-dot ${passwordChecks.uppercase ? "valid" : ""}`}></span>
    <span>حرف كبير (A-Z)</span>
  </div>

  <div className="rule">
    <span className={`rule-dot ${passwordChecks.lowercase ? "valid" : ""}`}></span>
    <span>حرف صغير (a-z)</span>
  </div>

  <div className="rule">
    <span className={`rule-dot ${passwordChecks.number ? "valid" : ""}`}></span>
    <span>رقم (0-9)</span>
  </div>

  <div className="rule">
    <span className={`rule-dot ${passwordChecks.special ? "valid" : ""}`}></span>
    <span>رمز خاص (!@#$)</span>
  </div>
   </div>



              <div className="field">
                <label>{form.role}</label>
                <div className="role-pills">
                  {form.roleOptions.map((r: string, i: number) => (
                    <button
                      type="button"
                      key={i}
                      className={role === i ? "is-active" : ""}
                      onClick={() => setRole(i)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <label className="checkbox terms-check">
                <input type="checkbox" />
                <span>{form.terms}</span>
              </label>

              <button type="submit" className="submit-btn">{form.submit}</button>
            </form>

            <div className="divider"><span>{form.or}</span></div>

            {/* أزرار التسجيل باستخدام وسائل التواصل */}
            <div className="social-row">
              {t.social.map((s: string, i: number) => (
                <button key={i} className="social-btn">
                  {s === "Google" ? "🔴" : "🔵"} {s}
                </button>
              ))}
            </div>

            <p className="switch-line">
              {form.haveAccount}{" "}
              <button className="switch-btn" onClick={onGoToSignIn}>
                {form.switchLink}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
