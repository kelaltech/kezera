import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function VolunteerWelcome({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: VolunteerWelcome Screen (in LayoutStart)</Text>
}

export default withNavigation(VolunteerWelcome)
