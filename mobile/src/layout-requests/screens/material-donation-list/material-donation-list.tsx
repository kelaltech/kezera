import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { _ } from '../../../lib/language'
import values from '../../../assets/styles/values'
import classes from '../../../assets/styles/classes'

function MaterialDonationList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale([])

  return (
    loading || <Text>{t`app-name`}: MaterialDonationList Screen (in LayoutRequests)</Text>
  )
}

MaterialDonationList.navigationOptions = {
  tabBarLabel: () => (
    <Text style={{ ...classes.paddingSmall, color: values.color.white }}>
      {_`material-donation:material-donations`}
    </Text>
  )
}

export default withNavigation(MaterialDonationList)
