import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function AccountRegister() {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: AccountRegister Screen (in LayoutStart)</Text>
}

export default AccountRegister
