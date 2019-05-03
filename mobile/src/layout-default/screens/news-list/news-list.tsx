import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import values from '../../../assets/styles/values'

function NewsList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: NewsList Screen (in LayoutDefault)</Text>
}

NewsList.navigationOptions = {
  tabBarIcon: ({ focused }: any) => (
    <Icon name={'home'} color={focused ? values.color.secondary : values.color.primary} />
  )
}

export default withNavigation(NewsList)
