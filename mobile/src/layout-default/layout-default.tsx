import * as React from 'react'
import { NavigationParams, NavigationProp, NavigationScreenProp } from 'react-navigation'

import LayoutDefaultProviders from './configs/layout-default-providers'
import LayoutDefaultNavigator from './configs/layout-default-navigator'

interface Props {
  navigation: NavigationScreenProp<{}, NavigationParams> & NavigationProp<{}>
}
function LayoutDefault({ navigation }: Props) {
  return (
    <LayoutDefaultProviders>
      <LayoutDefaultNavigator navigation={navigation} />
    </LayoutDefaultProviders>
  )
}
LayoutDefault.router = LayoutDefaultNavigator.router

export default LayoutDefault
