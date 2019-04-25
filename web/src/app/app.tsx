import './configs/axios-interceptors'
import './configs/setup-i18n'

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import io from 'socket.io-client'

import AppRoutes from './configs/app-routes'
import AppProviders from './configs/app-providers'
import { supportedNamespaces } from '../lib/language'
import { useEffect } from 'react'

export let socket = io('http://localhost:8900')

let initSocket = function() {
  // socket.on('connection', () => {})
}

function App() {
  useEffect(() => {
    initSocket()
  })
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  )
}

export default withTranslation(supportedNamespaces)(App) // for (lib/languages)._
