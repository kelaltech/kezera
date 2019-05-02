import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function FundraisingList() {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: FundraisingList Screen (in LayoutRequests)</Text>
}

export default FundraisingList
