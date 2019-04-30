import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../hooks/use-locale/use-locale'

function TaskDetail() {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: TaskDetail Screen (in App/shared)</Text>
}

export default TaskDetail
