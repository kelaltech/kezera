import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Button, Warning } from 'gerami'
import { withTranslation } from 'react-i18next'

import { defaultNamespaces } from '../lib/language'
import AppRoutes from './configs/app-routes'
import AppProviders from './configs/app-providers'

function App() {
  const [error, setError] = useState<any>(undefined)

  // todo: nothing is causing an error message at this level
  // ...   create a generalized dialog (also with error type) at this level
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
        {error && ( // todo: temp
          <div
            className="fixed padding-very-big bg-whitish"
            style={{ zIndex: 100, top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <Warning problem={error} shy={() => setError(undefined)} />
            <div className="padding-top-big right">
              <Button className="font-S" onClick={() => setError(undefined)}>
                Close Message
              </Button>
            </div>
          </div>
        )}
      </AppProviders>
    </BrowserRouter>
  )
}

export default withTranslation(defaultNamespaces)(App)
