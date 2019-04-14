import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { defaultLanguage, defaultNamespaces, setLanguage } from '../../lib/language'

i18n
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    fallbackNS: defaultNamespaces,
    interpolation: { escapeValue: false },
    parseMissingKeyHandler: () => ''
  })
  .then(() => setLanguage())
  .catch(console.error)
