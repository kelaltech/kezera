import React from 'react'
import ReactDOM from 'react-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import {
  defaultLanguage,
  defaultNamespaces,
  loadNamespaces,
  setLanguage
} from '../lib/language'
import fontawesomeLibrary from '../assets/scripts/fontawesome-library'
import App from './app'

beforeAll(() => {
  fontawesomeLibrary() // fontawesome icons

  return i18n
    .use(initReactI18next)
    .init({
      interpolation: { escapeValue: false },
      fallbackLng: defaultLanguage,
      fallbackNS: defaultNamespaces,
      lng: defaultLanguage
    })
    .then(async () => {
      await setLanguage()
      loadNamespaces(defaultNamespaces, defaultLanguage).catch() // just a backup/fallback
    })
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
