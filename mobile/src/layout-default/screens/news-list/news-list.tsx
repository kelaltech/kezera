import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import Header from '../../../shared/components/header/header'

function NewsList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['news'])

  return (
    loading || (
      <>
        <Header title={t`news:today`} />
        <Text>{t`app-name`}: NewsList Screen (in LayoutDefault)</Text>
      </>
    )
  )
}

export default withNavigation(NewsList)
