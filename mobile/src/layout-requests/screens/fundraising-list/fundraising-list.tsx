import React from 'react'

import { View, Text } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

function FundraisingList({  }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['request']) //todo change language mapping
  return (
    loading || (
      <>
        <View>
          <Text>this is Fundraising list screen</Text>
        </View>
      </>
    )
  )
}

export default withNavigation(FundraisingList)
