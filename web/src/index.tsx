import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import AOS from 'aos'
import initReactFastclick from 'react-fastclick'
import { Loading } from 'gerami'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import App from './app/app'
import fontawesomeLibrary from './assets/scripts/fontawesome-library'
import * as serviceWorker from './assets/scripts/service-worker'
import './assets/styles/index.scss'
import {
  defaultLanguage,
  defaultNamespaces,
  loadNamespaces,
  setLanguage
} from './lib/language'

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
        <Suspense fallback={<Loading delay />}>
          <App />
        </Suspense>
      </StrictMode>,
      document.getElementById('root')
    )
  })
  .catch(console.error)

serviceWorker.register()
