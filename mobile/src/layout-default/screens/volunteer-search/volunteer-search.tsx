import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import values from '../../../assets/styles/values'

function VolunteerSearch({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['volunteer'])

  // todo: a special type of header with the search bar embedded inside
  return loading || <Text>{t`app-name`}: VolunteerSearch Screen (in LayoutDefault)</Text>
}

VolunteerSearch.navigationOptions = {
  tabBarIcon: ({ focused }: any) => (
    <Icon
      name={'search'}
      color={focused ? values.color.secondary : values.color.primary}
    />
  )
}

export default withNavigation(VolunteerSearch)
