import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'

function VolunteerPortfolio({
  navigation
}: NavigationInjectedProps<{ volunteer_id: string }>) {
  const { loading, t } = useLocale(['volunteer'])

  return (
    loading || (
      <>
        <Header
          title={t`volunteer:volunteer` + ' ' + /* todo */ 'TODO LAST_NAME'.split(' ')[0]}
          showBack
        />

        <Text>
          {t`app-name`}: VolunteerPortfolio Screen (in App/shared) (volunteer_id:{' '}
          {navigation.getParam('volunteer_id')})
        </Text>
      </>
    )
  )
}

export default withNavigation(VolunteerPortfolio)
