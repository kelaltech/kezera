import * as React from 'react'
import { NavigationParams, NavigationProp, NavigationScreenProp } from 'react-navigation'

import LayoutRequestsProviders from './configs/layout-requests-providers'
import LayoutRequestsNavigator from './configs/layout-requests-navigator'

interface Props {
  navigation: NavigationScreenProp<{}, NavigationParams> & NavigationProp<{}>
}
function LayoutRequests({ navigation }: Props) {
  return (
    <LayoutRequestsProviders>
      <LayoutRequestsNavigator navigation={navigation} />
    </LayoutRequestsProviders>
  )
}
LayoutRequests.router = LayoutRequestsNavigator.router

export default LayoutRequests
