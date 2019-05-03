/**
 * @format
 */

import React, { Suspense } from 'react'
import { AppRegistry } from 'react-native'
import { SafeAreaView } from 'react-navigation'

import App from './src/app/app'
import { name as appName } from './app.json'
import classes from './src/assets/styles/classes'

function SuspendedApp() {
  return (
    <SafeAreaView style={classes.grow}>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </SafeAreaView>
  )
}

AppRegistry.registerComponent(appName, () => SuspendedApp)
