import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { _ } from '../../../lib/language'
import values from '../../../assets/styles/values'
import classes from '../../../assets/styles/classes'

function FundraisingList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['fundraising'])

  return loading || <Text>{t`app-name`}: FundraisingList Screen (in LayoutRequests)</Text>
}
FundraisingList.navigationOptions = {
  tabBarLabel: () => (
    <Text style={{ ...classes.paddingVerticalSmall, color: values.color.white }}>
      {_`fundraising:fundraising`}
    </Text>
  )
}

export default withNavigation(FundraisingList)
