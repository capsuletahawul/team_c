import React from 'react';
import { useLanguage } from '../context/LanguageContext';

import { Link } from "react-router-dom";

function Footer() {
  const { t } = useLanguage();

  // Dynamic classes for the input/button corners based on direction
  const inputCorners = t.dir === 'rtl' ? 'rounded-r-xl' : 'rounded-l-xl';
  const buttonCorners = t.dir === 'rtl' ? 'rounded-l-xl' : 'rounded-r-xl';

  return (
    <footer className="bg-capsule-footer text-white pt-12 pb-6 px-8 mt-24 border-t border-capsule-teal/20 font-sans" dir={t.dir}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm pb-8 border-b border-white/10">
        
        {/* Brand & Description */}
        <div>
          <h3 className="text-base font-black mb-3">🎓 {t.brand}</h3>
          <p className="text-gray-300 text-xs leading-relaxed">
            {t.footer.desc}
          </p>
        </div>

        {/* Quick Links */}
        <ul className="space-y-2 text-xs text-gray-300">
  <li>
    <Link to="/" className="hover:text-capsule-gold transition">
      {t.footer.home}
    </Link>
  </li>

  <li>
    <Link to="/courses-overview" className="hover:text-capsule-gold transition">
      {t.footer.courses}
    </Link>
  </li>

  <li>
    <Link to="/contact" className="hover:text-capsule-gold transition">
      {t.footer.howItWorks}
    </Link>
  </li>

  <li>
    <Link to="/contact" className="hover:text-capsule-gold transition">
      {t.footer.contact}
    </Link>
  </li>
</ul>

        {/* Social Media */}
        <div>
          <h4 className="font-bold mb-3 text-capsule-gold text-xs uppercase tracking-wider">{t.footer.social}</h4>
          <div className={`flex space-x-3 text-lg ${t.dir === 'rtl' ? 'space-x-reverse' : ''}`}>
            <a href="#" className="hover:text-capsule-gold transition">𝕏</a>
            <a href="#" className="hover:text-capsule-gold transition">💼</a>
            <a href="#" className="hover:text-capsule-gold transition">📸</a>
            <a href="#" className="hover:text-capsule-gold transition">🎥</a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-3 text-capsule-gold text-xs">{t.footer.newsletter}</h4>
          <div className="flex">
            <input 
              type="email" 
              placeholder={t.footer.emailPh} 
className={`px-4 py-2.5 w-full bg-white text-gray-800 text-sm placeholder-gray-400 border border-gray-300 ${inputCorners}`} ></input>            
            
            <button className={`bg-capsule-gold text-capsule-navy font-bold text-xs px-4 hover:bg-yellow-500 transition cursor-pointer ${buttonCorners}`}>
              {t.footer.subscribe}
            </button>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className={`max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-6 text-xs text-gray-400 gap-4 ${t.dir === 'rtl' ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
        <p>{t.footer.copyright1}</p>
        <p className="text-gray-500">{t.footer.copyright2}</p>
      </div>
    </footer>
  );
}

export default Footer;