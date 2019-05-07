import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function OrganDonationList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['organ-donation'])

  return (
    loading || <Text>{t`app-name`}: OrganDonationList Screen (in LayoutRequests)</Text>
  )
}

export default withNavigation(OrganDonationList)
