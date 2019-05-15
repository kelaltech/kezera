import React from 'react'
import { Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import Header from '../../../shared/components/header/header'
import NewsToday from '../../../shared/components/news-today/news-today'

const kelal = require('../../../assets/images/common/logo-128.png')

function NewsList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['news'])

  return (
    loading || (
      <>
        <Header title={t`news:today`} />
        <Text>{t`app-name`}: NewsList Screen (in LayoutDefault)</Text>
        <NewsToday
          img={kelal}
          comment={12}
          likes={30}
          share={40}
          description={'this is a description'}
          title={'this is a title'}
        />
      </>
    )
  )
}

export default withNavigation(NewsList)
