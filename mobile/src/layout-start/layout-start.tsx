import * as React from 'react'
import { NavigationParams, NavigationProp, NavigationScreenProp } from 'react-navigation'

import LayoutStartProviders from './configs/layout-start-providers'
import LayoutStartNavigator from './configs/layout-start-navigator'

interface Props {
  navigation: NavigationScreenProp<{}, NavigationParams> & NavigationProp<{}>
}
function LayoutStart({ navigation }: Props) {
  return (
    <LayoutStartProviders>
      <LayoutStartNavigator navigation={navigation} />
    </LayoutStartProviders>
  )
}
LayoutStart.router = LayoutStartNavigator.router

export default LayoutStart
