import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import AppRoutes from './configs/app-routes'
import AppProviders from './configs/app-providers'
import Translate from '../shared/components/translate/translate'
import { allNamespaces } from '../lib/language'

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Translate namespaces={['common']}>
          <AppRoutes />
        </Translate>
      </AppProviders>
    </BrowserRouter>
  )
}

export default withTranslation(allNamespaces)(App)
