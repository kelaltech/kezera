import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../hooks/use-locale/use-locale'

function OrganizationDetail() {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: OrganizationDetail Screen (in App/shared)</Text>
}

export default OrganizationDetail
