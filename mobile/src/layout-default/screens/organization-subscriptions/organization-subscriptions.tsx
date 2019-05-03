import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import values from '../../../assets/styles/values'
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

OrganizationSubscriptions.navigationOptions = {
  tabBarIcon: ({ focused }: any) => (
    <Icon name={'work'} color={focused ? values.color.secondary : values.color.primary} />
  )
}

export default withNavigation(OrganizationSubscriptions)
