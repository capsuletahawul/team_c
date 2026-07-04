import React, { useState } from 'react';

function Navbar({ activePage = 'dashboard' }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'الرئيسية', href: '#' },
    { id: 'courses', label: 'الدورات', href: '#' },
    { id: 'bootcamps', label: 'المعسكرات', href: '#' },
    { id: 'companies', label: 'الشركات', href: '#' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* اللوغو والروابط الكبيرة */}
        <div className="flex items-center space-x-8 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-tr from-capsule-navy to-capsule-teal rounded-lg flex items-center justify-center text-white font-black text-xs">CT</div>
            <span className="text-base font-black text-capsule-navy">كبسولة تحول</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 space-x-reverse text-sm font-semibold text-gray-500">
            {navLinks.map(link => (
              <a 
                key={link.id} 
                href={link.href} 
                className={`transition pb-1 ${activePage === link.id ? 'text-capsule-teal border-b-2 border-capsule-teal' : 'hover:text-capsule-navy'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <span className="bg-capsule-navy text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-xs">بوابة الأعضاء</span>
        </div>

        {/* زر الـ Hamburger على الجوال */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-capsule-navy focus:outline-none text-xl p-1 cursor-pointer">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* قائمة الجوال المنسدلة والـ Responsive */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-50 rounded-xl p-4 flex flex-col space-y-3 font-semibold text-sm border border-gray-100">
          {navLinks.map(link => (
            <a 
              key={link.id} 
              href={link.href} 
              className={`p-2 rounded-lg ${activePage === link.id ? 'bg-capsule-teal/10 text-capsule-teal' : 'text-gray-600'}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;