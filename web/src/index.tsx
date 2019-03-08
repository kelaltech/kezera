import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import AOS from 'aos'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import fontawesomeLibrary from './shared/configs/fontawesome-library'
import initReactFastclick from 'react-fastclick'
import {
  defaultLanguage,
  defaultNamespaces,
  loadNamespaces,
  setLanguage
} from './app/lib/language'
import App from './app/app'
import * as serviceWorker from './assets/scripts/service-worker'
import './assets/styles/index.scss'

AOS.init() // animation on scroll
fontawesomeLibrary() // fontawesome icons
initReactFastclick() // touch events

i18n
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

    ReactDOM.render(
      <StrictMode>
        <App />
      </StrictMode>,
      document.getElementById('root')
    )
  })

serviceWorker.register()
