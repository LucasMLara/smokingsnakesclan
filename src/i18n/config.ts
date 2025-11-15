import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

const getStoredLanguage = () => {
  const stored = localStorage.getItem('smoking-snakes-language');
  if (stored && ['pt', 'en', 'es'].includes(stored)) {
    return stored;
  }
  
  // Detect browser language
  const browserLang = navigator.language.split('-')[0];
  if (['pt', 'en', 'es'].includes(browserLang)) {
    return browserLang;
  }
  
  return 'pt'; // Default to Portuguese
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
    },
    lng: getStoredLanguage(),
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
