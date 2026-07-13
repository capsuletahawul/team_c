import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StudentNavbar from '../components/StudentNavbar';
import Footer from '../components/Footer';
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';

// استيراد اللوقوهات الرسمية بالطريقة القياسية لـ Vite
import applePayLogo from '../assets/ApplePay.png';
import moyasarLogo from '../assets/Moyassar.png';

export default function Payment() {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isRTL = lang === 'ar';

  // استقبال البيانات القادمة من السلة (أو استخدام قيم افتراضية في حال الدخول المباشر)
  const order = location.state || {
    courseName: "Full-Stack Generative AI & Digital Transformation Bootcamp",
    trainer: "Ahmed Mohammed",
    price: 450.00,
    discount: 200.00,
    totalAmount: 250.00
  };

  const [paymentMethod, setPaymentMethod] = useState('card');

  // حالات إدخال بيانات البطاقة والتحذيرات
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // نخزن هنا "مفتاح الخطأ" فقط (مثال: 'errHolderRequired') لضمان ترجمته الفورية تلقائياً عند تغيير اللغة
  const [errors, setErrors] = useState({});

  // كود الترجمات الشامل لجميع النصوص والتحذيرات والقيود بالصفحة
  const translations = {
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
      redirectMoyasar: 'سيتم توجيهك بأمان لتأكيد عمليتك عبر بوابة ميسر عند الضغط على زر الدفع بالأسفل.',
      // رسائل القيود
      errHolderRequired: 'يجب إدخال اسم حامل البطاقة المكتوب عليها.',
      errCardRequired: 'يجب إدخال رقم البطاقة الائتمانية.',
      errCardLength: 'يجب أن يتكون رقم البطاقة من 16 رقماً.',
      errExpiryRequired: 'يجب إدخال تاريخ انتهاء صلاحية البطاقة.',
      errExpiryFormat: 'صيغة التاريخ غير صحيحة، يجب أن تكون MM/YY (مثال: 12/28).',
      errCvvRequired: 'يجب إدخال رمز التحقق الخلفي للبطاقة.',
      errCvvLength: 'يجب أن يتكون رمز التحقق من 3 أرقام.'
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
      redirectMoyasar: 'You will be securely redirected to confirm your transaction via Moyasar when you click the button below.',
      // Validation Warnings
      errHolderRequired: 'Cardholder name is required.',
      errCardRequired: 'Card number is required.',
      errCardLength: 'Card number must be exactly 16 digits.',
      errExpiryRequired: 'Expiry date is required.',
      errExpiryFormat: 'Expiry format must be MM/YY (e.g., 12/28).',
      errCvvRequired: 'CVV is required.',
      errCvvLength: 'CVV must be exactly 3 digits.'
    }
  };

  const t = translations[lang] || translations['ar'];

  // دوال لتنسيق المدخلات تلقائياً أثناء الكتابة
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
    if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiryDate(value);
    if (errors.expiryDate) setErrors(prev => ({ ...prev, expiryDate: '' }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCvv(value);
    if (errors.cvv) setErrors(prev => ({ ...prev, cvv: '' }));
  };

  // دالة التحقق من قيود وصلاحية بيانات البطاقة وتخزين المفاتيح
  const validateForm = () => {
    let tempErrors = {};
    if (paymentMethod === 'card') {
      if (!cardholderName.trim()) {
        tempErrors.cardholderName = 'errHolderRequired';
      }
      
      const cleanCardNumber = cardNumber.replace(/\s+/g, '');
      if (!cleanCardNumber) {
        tempErrors.cardNumber = 'errCardRequired';
      } else if (cleanCardNumber.length !== 16) {
        tempErrors.cardNumber = 'errCardLength';
      }

      if (!expiryDate) {
        tempErrors.expiryDate = 'errExpiryRequired';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        tempErrors.expiryDate = 'errExpiryFormat';
      }

      if (!cvv) {
        tempErrors.cvv = 'errCvvRequired';
      } else if (cvv.length !== 3) {
        tempErrors.cvv = 'errCvvLength';
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // دالة الضغط على زر الدفع
  const handlePaymentSubmit = () => {
    if (paymentMethod === 'card') {
      if (validateForm()) {
        alert(t.successMsg);
        navigate('/courses-overview');
      }
    } else {
      alert(t.successMsg);
      navigate('/courses-overview');
    }
  };

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
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all h-24 sm:h-28 ${
                      paymentMethod === 'card'
                        ? 'border-capsule-teal bg-capsule-bg/30 text-capsule-navy shadow-xs font-bold'
                        : 'border-gray-100 hover:border-gray-200 text-gray-500 font-medium'
                    }`}
                  >
                    {paymentMethod === 'card' && <CheckCircleIcon className="absolute top-2 left-2 w-5 h-5 text-capsule-teal" />}
                    <CreditCardIcon className="w-8 h-8 mb-2 text-capsule-teal stroke-[2]" />
                    <span className="text-sm font-black">{t.creditCard}</span>
                  </button>

                  {/* الخيار 2: Apple Pay */}
                  <button
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all h-24 sm:h-28 ${
                      paymentMethod === 'apple_pay'
                        ? 'border-capsule-teal bg-capsule-bg/30 shadow-xs'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {paymentMethod === 'apple_pay' && <CheckCircleIcon className="absolute top-2 left-2 w-5 h-5 text-capsule-teal" />}
                    <div className="flex items-center justify-center w-full h-full">
                      <img 
                        src={applePayLogo} 
                        alt="Apple Pay" 
                        className="h-14 sm:h-16 w-auto object-contain flex-shrink-0" 
                      />
                    </div>
                  </button>

                  {/* الخيار 3: Moyasar */}
                  <button
                    onClick={() => setPaymentMethod('moyasar')}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all h-24 sm:h-28 ${
                      paymentMethod === 'moyasar'
                        ? 'border-capsule-teal bg-capsule-bg/30 shadow-xs'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {paymentMethod === 'moyasar' && <CheckCircleIcon className="absolute top-2 left-2 w-5 h-5 text-capsule-teal" />}
                    <div className="flex items-center justify-center w-full h-full">
                      <img 
                        src={moyasarLogo} 
                        alt="Moyasar" 
                        className="h-13 sm:h-15 w-auto object-contain flex-shrink-0" 
                      />
                    </div>
                  </button>
                </div>
              </div>

              {/* فورمة إدخال البيانات للبطاقة الائتمانية مع تفعيل القيود والتحذيرات */}
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
                      <input 
                        type="text" 
                        value={cardholderName}
                        onChange={(e) => {
                          setCardholderName(e.target.value);
                          if (errors.cardholderName) setErrors(prev => ({ ...prev, cardholderName: '' }));
                        }}
                        className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 ${
                          errors.cardholderName ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-capsule-teal/40'
                        }`} 
                        placeholder={t.cardHolderPlaceholder} 
                      />
                      {/* استدعاء الترجمة ديناميكياً من المفتاح المخزن */}
                      {errors.cardholderName && <p className="text-red-500 text-xs mt-1 font-semibold">{t[errors.cardholderName]}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-capsule-navy/70 mb-1">{t.cardNumber}</label>
                      <input 
                        type="text" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 ${
                          errors.cardNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-capsule-teal/40'
                        }`} 
                        placeholder="1234 5678 9101 1121" 
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1 font-semibold">{t[errors.cardNumber]}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-capsule-navy/70 mb-1">{t.expiry}</label>
                        <input 
                          type="text" 
                          value={expiryDate}
                          onChange={handleExpiryChange}
                          className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 ${
                            errors.expiryDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-capsule-teal/40'
                          }`} 
                          placeholder="MM/YY" 
                        />
                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1 font-semibold">{t[errors.expiryDate]}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-capsule-navy/70 mb-1">{t.cvv}</label>
                        <input 
                          type="password" 
                          value={cvv}
                          onChange={handleCvvChange}
                          className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 ${
                            errors.cvv ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-capsule-teal/40'
                          }`} 
                          placeholder="123" 
                        />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1 font-semibold">{t[errors.cvv]}</p>}
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
                onClick={handlePaymentSubmit}
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