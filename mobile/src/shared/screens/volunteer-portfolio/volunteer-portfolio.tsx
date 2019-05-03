import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../hooks/use-locale/use-locale'

function VolunteerPortfolio({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: VolunteerPortfolio Screen (in App/shared)</Text>
}

export default withNavigation(VolunteerPortfolio)
