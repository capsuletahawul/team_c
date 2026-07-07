import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useLanguage } from "../context/LanguageContext"; 
import { CapsuleMark, EyeIcon } from "../components/Icons";

// Import your global layout components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/auth.css";

export default function SignIn() {
  const [showPw, setShowPw] = useState(false);
  
  const navigate = useNavigate();
  const { t, lang } = useLanguage(); 
  
  const form = t.login;

  return (
    <div dir={t.dir} className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      {/* 1. Global Navbar (Brings back the language toggle!) */}
      <Navbar activePage="login" showAuthButtons={false} />

      {/* 2. Main Content Wrapper */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        
        {/* Your original Auth Root */}
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
                  <button className="is-active">{t.tabs?.login || "Sign In"}</button>
                  <button onClick={() => navigate('/signup')}>{t.tabs?.signup || "Sign Up"}</button>
                  <span className="tab-underline pos-1" />
                </div>

                <h2>{form.title}</h2>
                <p className="auth-subtitle">{form.subtitle}</p>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="field">
                    <label>{form.email}</label>
                    <input type="email" placeholder={form.emailPh} />
                  </div>

                  <div className="field">
                    <label>{form.password}</label>
                    <div className="password-input">
                      <input type={showPw ? "text" : "password"} placeholder={form.passwordPh} />
                      <button
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
                  {(t.social || ["Google", "LinkedIn"]).map((s, i) => (
                    <button key={i} className="social-btn">
                      {s === "Google" ? "🔴" : "🔵"} {s}
                    </button>
                  ))}
                </div>

                <p className="switch-line">
                  {form.noAccount}{" "}
                  <button className="switch-btn" onClick={() => navigate('/signup')}>
                    {form.switchLink}
                  </button>
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer />
      
    </div>
  );
}