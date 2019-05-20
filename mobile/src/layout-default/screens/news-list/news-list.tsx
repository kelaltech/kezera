import React, { useEffect, useState } from 'react'
import { ImageURISource, ScrollView, Text } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import Axios from 'axios'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import Header from '../../../shared/components/header/header'
import NewsToday from '../../../shared/components/news-today/news-today'
import { richTextToDisplayText } from '../../../lib/richTextConverter'
import { baseUrl } from '../../../app/configs/setup-axios'

const kelal = require('../../../assets/images/common/logo-128.png')

function NewsList({  }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['news'])
  const [news, setNews] = useState([])
  const [error, setError] = useState<any>(null)
  useEffect(() => {
    Axios.get('/api/news/allnews')
      .then(news => news.data)
      .then(data => {
        setNews(richTextToDisplayText(data))
      })
      .catch(e => {
        setError('check your connection and try again')
      })
  }, [])
  return (
    loading || (
      <>
        <Header title={t`news:today`} />
        <Text>{t`app-name`}: NewsList Screen (in LayoutDefault)</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {news.map((n: any, k) => (
            <NewsToday
              key={k}
              _id={n._id}
              img={{ uri: `${baseUrl}/api/news/${n._id}/pic?size=250&quality=80` }}
              description={n.description}
              title={n.title}
              likes={n.likes.length}
              comment={n.comments.length}
              share={n.share.length}
            />
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(NewsList)
