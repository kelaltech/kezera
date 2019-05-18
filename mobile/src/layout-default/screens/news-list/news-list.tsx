import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import Header from '../../../shared/components/header/header'
import NewsToday from '../../../shared/components/news-today/news-today'
function NewsList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['news'])

  return (
    loading || (
      <>
        <Header title={t`news:today`} />
        <Text>{t`app-name`}: NewsList Screen (in LayoutDefault)</Text>
        <NewsToday />
      </>
    )
  )
}

export default withNavigation(NewsList)
