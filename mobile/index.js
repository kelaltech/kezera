/**
 * @format
 */

import React, { Suspense } from 'react'
import { AppRegistry } from 'react-native'

import App from './src/app/app'
import { name as appName } from './app.json'

function SuspendedApp() {
  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  )
}

AppRegistry.registerComponent(appName, () => SuspendedApp)
