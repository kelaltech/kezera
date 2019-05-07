import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function VolunteerSearch({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['volunteer'])

  // todo: a special type of header with the search bar embedded inside
  return loading || <Text>{t`app-name`}: VolunteerSearch Screen (in LayoutDefault)</Text>
}

export default withNavigation(VolunteerSearch)
