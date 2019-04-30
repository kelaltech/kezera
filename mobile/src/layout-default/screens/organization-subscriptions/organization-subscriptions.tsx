import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function OrganizationSubscriptions() {
  const { loading, t } = useLocale([])

  return (
    loading || (
      <Text>{t`app-name`}: OrganizationSubscriptions Screen (in LayoutDefault)</Text>
    )
  )
}

export default OrganizationSubscriptions
