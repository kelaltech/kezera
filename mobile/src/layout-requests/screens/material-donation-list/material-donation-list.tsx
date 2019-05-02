import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function MaterialDonationList() {
  const { loading, t } = useLocale([])

  return (
    loading || <Text>{t`app-name`}: MaterialDonationList Screen (in LayoutRequests)</Text>
  )
}

export default MaterialDonationList
