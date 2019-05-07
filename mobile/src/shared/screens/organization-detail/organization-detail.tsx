import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'

function OrganizationDetail({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale([])

  return (
    loading || (
      <>
        <Header title={t`organization:organization`} showBack />
        <Text>{t`app-name`}: OrganizationDetail Screen (in App/shared)</Text>
      </>
    )
  )
}

export default withNavigation(OrganizationDetail)
