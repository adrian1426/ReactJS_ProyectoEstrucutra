import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import helpers from '../helpers';
import es_mx from './locales/es_mx/';
import es_co from './locales/es_co/';
import en from './locales/en/';
import pt from './locales/pt/';

const dictionaryMx = 'es_mx';
const lang = helpers.codigoIdioma;
const langInit = lang === 'es' ? dictionaryMx : lang;

i18n
  .use(initReactI18next).init({
    lng: langInit,
    fallbackLng: dictionaryMx,//use this if detected lng is not available
    resources: { es_mx, es_co, en, pt }
  });