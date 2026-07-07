import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { CapsuleMark, EyeIcon } from "../components/Icons";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/auth.css";

export default function SignUp() {
  const [showPw, setShowPw] = useState(false);
  const [pwValue, setPwValue] = useState("");
  const [role, setRole] = useState(0);

  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const form = t.signup;

  const pwStrength =
    pwValue.length === 0 ? -1 : pwValue.length < 6 ? 0 : pwValue.length < 10 ? 1 : 2;

  return (
    <div dir={t.dir} className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      <Navbar activePage="signup" showAuthButtons={false} />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="auth-root w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden" lang={lang}>
          <div className="auth-shell">
            
            {/* ---------- Visual Section ---------- */}
            <div className="auth-visual">
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

            {/* ---------- Form Section ---------- */}
            <div className="auth-form-side bg-white">
              <div className="auth-form-wrap">
                <div className="auth-tabs">
                  <button onClick={() => navigate('/login')}>{t.tabs?.login || "Sign In"}</button>
                  <button className="is-active">{t.tabs?.signup || "Sign Up"}</button>
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
                  {(t.social || ["Google", "LinkedIn"]).map((s, i) => (
                    <button key={i} className="social-btn">
                      {s === "Google" ? "🔴" : "🔵"} {s}
                    </button>
                  ))}
                </div>

                <p className="switch-line">
                  {form.haveAccount}{" "}
                  <button className="switch-btn" onClick={() => navigate('/login')}>
                    {form.switchLink}
                  </button>
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}