import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { defaultNamespaces } from '../lib/language'
import AppRoutes from './configs/app-routes'
import AppProviders from './configs/app-providers'

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  )
}

export default withTranslation(defaultNamespaces)(App)
