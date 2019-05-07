import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function AccountRegister({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: AccountRegister Screen (in LayoutStart)</Text>
}

export default withNavigation(AccountRegister)
