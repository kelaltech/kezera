import './configs/axios-interceptors'

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import AppRoutes from './configs/app-routes'
import AppProviders from './configs/app-providers'
import { supportedNamespaces } from '../lib/language'

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  )
}

export default withTranslation(supportedNamespaces)(App) // for lib/languages' _
