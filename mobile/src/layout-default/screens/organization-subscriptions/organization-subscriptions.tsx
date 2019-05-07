import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import Header from '../../../shared/components/header/header'

function OrganizationSubscriptions({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['organization'])

  return (
    loading || (
      <>
        <Header title={t`organization:my-subscriptions`} />
        <Text>{t`app-name`}: OrganizationSubscriptions Screen (in LayoutDefault)</Text>
      </>
    )
  )
}

export default withNavigation(OrganizationSubscriptions)
