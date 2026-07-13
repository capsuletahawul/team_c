import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StudentNavbar from '../components/StudentNavbar';
import Footer from '../components/Footer';
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';

// تعريف مسارات الصور مباشرة من مجلد public لضمان عملها 100% بدون كاش أو أخطاء استيراد
const applePayLogo = '/ApplePay.png';
const moyasarLogo = '/Moyassar.png';

export default function Payment() {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isRTL = lang === 'ar';

  const order = location.state || {
    courseName: "Full-Stack Generative AI & Digital Transformation Bootcamp",
    trainer: "Ahmed Mohammed",
    price: 450.00,
    discount: 200.00,
    totalAmount: 250.00
  };

  const [paymentMethod, setPaymentMethod] = useState('card');

  // كود الترجمات الشامل والديناميكي لجميع نصوص الصفحة بلا استثناء
  const t = {
    ar: { 
      title: 'إتمام الدفع', 
      subtitle: 'أكمل عملية الدفع بأمان لحجز مقعدك', 
      methodTitle: 'اختر طريقة الدفع', 
      orderSummary: 'ملخص الطلب', 
      course: 'الدورة', 
      instructor: 'المدرب', 
      originalPrice: 'السعر الأصلي', 
      discount: 'الخصم', 
      tax: 'ضريبة القيمة المضافة (15%)', 
      total: 'الإجمالي', 
      payBtn: 'إتمام الدفع بأمان', 
      cardHolder: 'اسم حامل البطاقة', 
      cardHolderPlaceholder: 'الاسم كما يظهر على البطاقة',
      cardNumber: 'رقم البطاقة', 
      expiry: 'تاريخ الانتهاء', 
      cvv: 'رمز التحقق (CVV)', 
      successMsg: 'شكراً لك! تم الدفع بنجاح.',
      creditCard: 'بطاقة ائتمانية',
      cardDetailsHeader: 'بيانات البطاقة',
      currency: 'ر.س',
      redirectApplePay: 'سيتم توجيهك بأمان لتأكيد عمليتك عبر Apple Pay عند الضغط على زر الدفع بالأسفل.',
      redirectMoyasar: 'سيتم توجيهك بأمان لتأكيد عمليتك عبر بوابة ميسر عند الضغط على زر الدفع بالأسفل.'
    },
    en: { 
      title: 'Checkout', 
      subtitle: 'Complete your payment securely to secure your spot', 
      methodTitle: 'Select Payment Method', 
      orderSummary: 'Order Summary', 
      course: 'Course', 
      instructor: 'Instructor', 
      originalPrice: 'Original Price', 
      discount: 'Discount', 
      tax: 'VAT (15%)', 
      total: 'Total Amount', 
      payBtn: 'Complete Secure Payment', 
      cardHolder: 'Cardholder Name', 
      cardHolderPlaceholder: 'Name as it appears on the card',
      cardNumber: 'Card Number', 
      expiry: 'Expiry Date', 
      cvv: 'CVV', 
      successMsg: 'Thank you! Payment successful.',
      creditCard: 'Credit Card',
      cardDetailsHeader: 'Card Details',
      currency: 'SAR',
      redirectApplePay: 'You will be securely redirected to confirm your transaction via Apple Pay when you click the button below.',
      redirectMoyasar: 'You will be securely redirected to confirm your transaction via Moyasar when you click the button below.'
    }
  }[lang] || { ar: {} };

  return (
    <div className="min-h-screen bg-capsule-bg flex flex-col font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      <StudentNavbar activePage="courses" />
      
      <main className="flex-grow">
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#164961] via-[#1a5570] to-[#2B636B] py-12 text-white text-center">
          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto px-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 mb-4 shadow-lg">
              <BanknotesIcon className="w-8 h-8 text-[#FFD369]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-2 leading-tight">{t.title}</h1>
            <p className="text-sm sm:text-base text-white/80">{t.subtitle}</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-capsule-teal to-cyan-500" />
                <h2 className="text-lg font-black text-capsule-navy mb-6 flex items-center gap-3">
                  <span className="w-2 h-5 rounded-full bg-capsule-teal" />
                  {t.methodTitle}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* الخيار 1: بطاقة ائتمانية */}
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all h-20 ${
                      paymentMethod === 'card'
                        ? 'border-capsule-teal bg-capsule-bg/30 text-capsule-navy shadow-xs font-bold'
                        : 'border-gray-100 hover:border-gray-200 text-gray-500 font-medium'
                    }`}
                  >
                    {paymentMethod === 'card' && <CheckCircleIcon className="absolute top-2 left-2 w-5 h-5 text-capsule-teal" />}
                    <CreditCardIcon className="w-6 h-6 mb-1 text-capsule-teal stroke-[2]" />
                    <span className="text-xs sm:text-sm">{t.creditCard}</span>
                  </button>

                  {/* الخيار 2: Apple Pay */}
                  <button
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all h-20 ${
                      paymentMethod === 'apple_pay'
                        ? 'border-capsule-teal bg-capsule-bg/30 text-black shadow-xs'
                        : 'border-gray-100 hover:border-gray-200 text-black/40'
                    }`}
                  >
                    {paymentMethod === 'apple_pay' && <CheckCircleIcon className="absolute top-2 left-2 w-5 h-5 text-capsule-teal" />}
                    <div className="flex items-center justify-center w-full h-full p-2">
                      <img 
                        src={applePayLogo} 
                        alt="Apple Pay" 
                        className="h-8 w-auto object-contain flex-shrink-0" 
                      />
                    </div>
                  </button>

                  {/* الخيار 3: Moyasar */}
                  <button
                    onClick={() => setPaymentMethod('moyasar')}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all h-20 ${
                      paymentMethod === 'moyasar'
                        ? 'border-capsule-teal bg-capsule-bg/30 shadow-xs'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {paymentMethod === 'moyasar' && <CheckCircleIcon className="absolute top-2 left-2 w-5 h-5 text-capsule-teal" />}
                    <div className="flex items-center justify-center w-full h-full p-2">
                      <img 
                        src={moyasarLogo} 
                        alt="Moyasar" 
                        className="h-8 w-auto object-contain flex-shrink-0" 
                      />
                    </div>
                  </button>
                </div>
              </div>

              {/* فورمة إدخال البيانات للبطاقة الائتمانية */}
              {paymentMethod === 'card' && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden transition-all duration-300">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
                  <h2 className="text-lg font-black text-capsule-navy mb-6 flex items-center gap-3">
                    <span className="w-2 h-5 rounded-full bg-purple-500" />
                    {t.cardDetailsHeader}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-capsule-navy/70 mb-1">{t.cardHolder}</label>
                      <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal/40" placeholder={t.cardHolderPlaceholder} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-capsule-navy/70 mb-1">{t.cardNumber}</label>
                      <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal/40" placeholder="1234 5678 9101 1121" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-capsule-navy/70 mb-1">{t.expiry}</label>
                        <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal/40" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-capsule-navy/70 mb-1">{t.cvv}</label>
                        <input type="password" maxLength="3" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-capsule-teal/40" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* رسائل التوجيه المترجمة ديناميكياً */}
              {paymentMethod !== 'card' && (
                <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-200 text-center text-sm font-semibold text-gray-500">
                  {paymentMethod === 'apple_pay' ? t.redirectApplePay : t.redirectMoyasar}
                </div>
              )}
            </div>

            {/* الجهة اليسرى: ملخص الفاتورة والطلب */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
              <h2 className="text-lg font-black text-capsule-navy mb-6 flex items-center gap-3">
                <span className="w-2 h-5 rounded-full bg-amber-500" />
                {t.orderSummary}
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm font-semibold text-capsule-navy/80 border-b border-gray-100 pb-5 mb-5">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-gray-400 font-bold">{t.course}</span>
                  <span className="text-start font-black max-w-[180px] leading-snug">{order.courseName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold">{t.instructor}</span>
                  <span className="font-bold">{order.trainer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold">{t.originalPrice}</span>
                  <span>{order.price.toFixed(2)} {t.currency}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span className="font-bold">{t.discount}</span>
                  <span>- {order.discount.toFixed(2)} {t.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold">{t.tax}</span>
                  <span>{((order.totalAmount) * 0.15).toFixed(2)} {t.currency}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-base font-black text-capsule-navy">{t.total}</span>
                <span className="text-2xl font-black text-capsule-navy">{(order.totalAmount).toFixed(2)} {t.currency}</span>
              </div>

              <button 
                onClick={() => { alert(t.successMsg); navigate('/courses-overview'); }}
                className="w-full bg-gradient-to-r from-capsule-navy to-[#2B636B] text-white font-black py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <SparklesIcon className="w-5 h-5 text-amber-400" />
                {t.payBtn}
              </button>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}