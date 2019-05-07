import * as React from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../shared/hooks/use-locale/use-locale'
import Header from '../shared/components/header/header'
import LayoutRequestsProviders from './configs/layout-requests-providers'
import LayoutRequestsNavigator from './configs/layout-requests-navigator'

function LayoutRequests({ navigation }: NavigationInjectedProps<{}>) {
  const { t } = useLocale(['request'])

  return (
    <LayoutRequestsProviders>
      <Header title={t`request:requests`} />
      <LayoutRequestsNavigator navigation={navigation} />
    </LayoutRequestsProviders>
  )
}

LayoutRequests.router = LayoutRequestsNavigator.router

export default withNavigation(LayoutRequests)
