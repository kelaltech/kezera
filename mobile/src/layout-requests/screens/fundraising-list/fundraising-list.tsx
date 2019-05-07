import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function FundraisingList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['fundraising'])

  return loading || <Text>{t`app-name`}: FundraisingList Screen (in LayoutRequests)</Text>
}

export default withNavigation(FundraisingList)
