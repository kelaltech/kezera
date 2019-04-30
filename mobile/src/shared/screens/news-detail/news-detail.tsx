import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../hooks/use-locale/use-locale'

function NewsDetail() {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: NewsDetail Screen (in App/shared)</Text>
}

export default NewsDetail
