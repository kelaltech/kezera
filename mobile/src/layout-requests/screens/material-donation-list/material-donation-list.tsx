import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function MaterialDonationList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['material-donation'])

  return (
    loading || <Text>{t`app-name`}: MaterialDonationList Screen (in LayoutRequests)</Text>
  )
}

export default withNavigation(MaterialDonationList)
