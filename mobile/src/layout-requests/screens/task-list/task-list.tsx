import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function TaskList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['task'])

  return loading || <Text>{t`app-name`}: TaskList Screen (in LayoutRequests)</Text>
}

export default withNavigation(TaskList)
