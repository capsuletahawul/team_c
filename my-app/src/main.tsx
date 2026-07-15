import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 استيراد الموجه هنا لحماية السياق بالكامل
import './index.css';
import { LanguageProvider } from './context/LanguageContext'; // حذفنا امتداد .jsx
import App from './App'; // حذفنا امتداد .jsx

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <LanguageProvider>
        {}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </StrictMode>,
  );
}