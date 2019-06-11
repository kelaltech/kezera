import React from 'react'

import { View, Text } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

function TaskList({  }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['request'])
  return (
    loading || (
      <>
        <View>
          <Text>this is task list screen</Text>
        </View>
      </>
    )
  )
}

export default withNavigation(TaskList)
