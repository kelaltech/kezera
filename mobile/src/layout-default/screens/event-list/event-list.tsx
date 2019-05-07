import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import Header from '../../../shared/components/header/header'

function EventList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['event'])

  return (
    loading || (
      <>
        <Header title={t`event:events`} />
        <Text>{t`app-name`}: EventList Screen (in LayoutDefault)</Text>
      </>
    )
  )
}

export default withNavigation(EventList)
