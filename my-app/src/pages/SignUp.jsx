// src/pages/SignUp.jsx
import React from "react";
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
export default function SignUp({ lang, onToggleLang, onGoToSignIn }) {
  const [showPw, setShowPw] = React.useState(false);
  const [pwValue, setPwValue] = React.useState("");
  const [role, setRole] = React.useState(0);

  const t = COPY[lang];
  const form = t.signup;

  const pwStrength =
    pwValue.length === 0 ? -1 : pwValue.length < 6 ? 0 : pwValue.length < 10 ? 1 : 2;

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
              <button onClick={onGoToSignIn}>{t.tabs.login}</button>
              <button className="is-active">{t.tabs.signup}</button>
              <span className="tab-underline pos-2" />
            </div>

            <h2>{form.title}</h2>
            <p className="auth-subtitle">{form.subtitle}</p>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label>{form.name}</label>
                <input type="text" placeholder={form.namePh} />
              </div>

              <div className="field">
                <label>{form.email}</label>
                <input type="email" placeholder={form.emailPh} />
              </div>

              <div className="field">
                <label>{form.password}</label>
                <div className="password-input">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder={form.passwordPh}
                    value={pwValue}
                    onChange={(e) => setPwValue(e.target.value)}
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
                      {[0, 1, 2].map((i) => (
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

              <div className="field">
                <label>{form.role}</label>
                <div className="role-pills">
                  {form.roleOptions.map((r, i) => (
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

            <div className="social-row">
              {t.social.map((s, i) => (
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
