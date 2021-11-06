import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import lang_es from '../../i18next/locales/es_mx/';

i18n
  .use(initReactI18next)
  .init({
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    },
    resources: {
      es: lang_es
    }
  });

export default i18n;