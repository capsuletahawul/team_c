import React from 'react';

function Footer() {
  return (
    <footer className="bg-capsule-footer text-white pt-12 pb-6 px-8 mt-24 border-t border-capsule-teal/20 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm pb-8 border-b border-white/10">
        
        <div>
          <h3 className="text-base font-black mb-3">🎓 كبسولة تحول</h3>
          <p className="text-gray-300 text-xs leading-relaxed">
            منصة سعودية تربط الطلاب بفرص التدريب العملي، وتبني جيلاً جاهزاً لسوق العمل المالي والتقني.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-capsule-gold text-xs uppercase tracking-wider">روابط سريعة</h4>
          <ul className="space-y-2 text-xs text-gray-300">
            <li><a href="#" className="hover:text-white transition">الرئيسية</a></li>
            <li><a href="#" className="hover:text-white transition">الدورات والمسارات</a></li>
            <li><a href="#" className="hover:text-white transition">كيف تعمل المنصة</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-capsule-gold text-xs uppercase tracking-wider">التواصل الاجتماعي</h4>
          <div className="flex space-x-3 space-x-reverse text-lg">
            <a href="#" className="hover:text-capsule-gold transition">𝕏</a>
            <a href="#" className="hover:text-capsule-gold transition">💼</a>
            <a href="#" className="hover:text-capsule-gold transition">📸</a>
            <a href="#" className="hover:text-capsule-gold transition">🎥</a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-capsule-gold text-xs">النشرة البريدية</h4>
          <div className="flex">
            <input type="email" placeholder="بريدك الإلكتروني" className="p-2 text-gray-800 text-xs rounded-r-xl w-full focus:outline-none" />
            <button className="bg-capsule-gold text-capsule-navy font-bold text-xs px-4 rounded-l-xl hover:bg-yellow-500 transition cursor-pointer">اشترك</button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-6 text-xs text-gray-400">
        <p>© ٢٠٢٦ كبسولة تحول. جميع الحقوق محفوظة.</p>
        <p className="text-gray-500">Copyright © 2026 by CS – GC. جميع الحقوق الفكرية محفوظة.</p>
      </div>
    </footer>
  );
}

export default Footer;