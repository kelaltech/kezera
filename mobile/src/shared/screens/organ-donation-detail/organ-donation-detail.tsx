import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../hooks/use-locale/use-locale'

function OrganDonationDetail() {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: OrganDonationDetail Screen (in App/shared)</Text>
}

export default OrganDonationDetail
