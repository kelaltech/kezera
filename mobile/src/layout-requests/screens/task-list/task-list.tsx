import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { _ } from '../../../lib/language'
import values from '../../../assets/styles/values'
import classes from '../../../assets/styles/classes'

function TaskList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['task'])

  return loading || <Text>{t`app-name`}: TaskList Screen (in LayoutRequests)</Text>
}

TaskList.navigationOptions = {
  tabBarLabel: () => (
    <Text style={{ ...classes.paddingVerticalSmall, color: values.color.white }}>
      {_`task:tasks`}
    </Text>
  )
}

export default withNavigation(TaskList)
