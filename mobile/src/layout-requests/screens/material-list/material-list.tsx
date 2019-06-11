import React from 'react'

import { View, Text } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

function MaterialList({  }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['request']) //todo change language mapping
  return (
    loading || (
      <>
        <View>
          <Text>this is Material list page</Text>
        </View>
      </>
    )
  )
}

export default withNavigation(MaterialList)
