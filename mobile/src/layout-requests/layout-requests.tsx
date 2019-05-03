import * as React from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'

import useLocale from '../shared/hooks/use-locale/use-locale'
import LayoutRequestsProviders from './configs/layout-requests-providers'
import LayoutRequestsNavigator from './configs/layout-requests-navigator'
import values from '../assets/styles/values'

function LayoutRequests({ navigation }: NavigationInjectedProps<{}>) {
  const { t } = useLocale(['request'])

  return (
    <LayoutRequestsProviders>
      {/* todo: shared Header goes here too */}
      <LayoutRequestsNavigator navigation={navigation} />
    </LayoutRequestsProviders>
  )
}
LayoutRequests.router = LayoutRequestsNavigator.router

LayoutRequests.navigationOptions = {
  tabBarIcon: ({ focused }: any) => (
    <Icon
      name={'monetization-on'}
      color={focused ? values.color.secondary : values.color.primary}
    />
  )
}

export default withNavigation(LayoutRequests)
