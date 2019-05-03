import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { _ } from '../../../lib/language'
import values from '../../../assets/styles/values'
import classes from '../../../assets/styles/classes'

function OrganDonationList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['organ-donation'])

  return (
    loading || <Text>{t`app-name`}: OrganDonationList Screen (in LayoutRequests)</Text>
  )
}

OrganDonationList.navigationOptions = {
  tabBarLabel: () => (
    <Text style={{ ...classes.paddingVerticalSmall, color: values.color.white }}>
      {_`organ-donation:organ-donations`}
    </Text>
  )
}

export default withNavigation(OrganDonationList)
