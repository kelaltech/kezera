import './configs/setup-axios'
import './configs/setup-i18n'

import * as React from 'react'
import { createAppContainer } from 'react-navigation'
import { useScreens } from 'react-native-screens'

import AppProviders from './configs/app-providers'
import AppNavigator from './configs/app-navigator'

useScreens()

const AppContainer = createAppContainer(AppNavigator) // only here on the root

function App() {
  return (
    <AppProviders>
      <AppContainer />
    </AppProviders>
  )
}

export default App
