import React from 'react'
import { Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'

function TaskDetail({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale([])

  return loading || <View />
}

export default withNavigation(TaskDetail)
