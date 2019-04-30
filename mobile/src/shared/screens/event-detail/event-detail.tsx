import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../hooks/use-locale/use-locale'

function EventDetail() {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: EventDetail Screen (in App/shared)</Text>
}

export default EventDetail
