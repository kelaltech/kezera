import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Loading } from 'gerami'
import AOS from 'aos'
import initReactFastclick from 'react-fastclick'

import './assets/styles/index.scss'
import App from './app/app'
import fontawesomeLibrary from './assets/scripts/fontawesome-library'
import * as serviceWorker from './assets/scripts/service-worker'

AOS.init() // animation on scroll
fontawesomeLibrary() // fontawesome icons
initReactFastclick() // touch events

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<Loading delay />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root')
)

serviceWorker.register()
