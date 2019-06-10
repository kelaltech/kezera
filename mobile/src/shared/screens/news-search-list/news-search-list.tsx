import React, { useEffect, useState } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { View, Text, ScrollView } from 'react-native'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import Header from '../../../shared/components/header/header'
import useLocale from '../../hooks/use-locale/use-locale'
import Axios from 'axios'
import { richTextToDisplayText } from '../../../lib/richTextConverter'
import { INewsResponse } from '../../../../../api/modules/news/news.apiv'
import NewsToday from '../../components/news-today/news-today'
import { baseUrl } from '../../../app/configs/setup-axios'
function NewsSearchList({ navigation }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['volunteer'])
  const [news, setNews] = useState([])
  const [error, setError] = useState<any>()
  const term = navigation.getParam('term')

  useEffect(() => {
    Axios.get(`/api/news/search?term=${term}`)
      .then(data => data.data)
      .then(news => {
        setNews(richTextToDisplayText(news))
      })
      .catch(e => {
        setError(e)
      })
  }, [])

  return (
    loading || (
      <>
        <Header showBack title={'news search list'} />
        <ScrollView
          style={{
            marginBottom: 10
          }}
        >
          {news.map((n: INewsResponse, k) => (
            <NewsToday
              share={n.share.length}
              comment={n.comments.length}
              likes={n.likes.length}
              description={n.description}
              title={n.title}
              img={{ uri: `${baseUrl}/api/news/${n._id}/pic?size=250&quality=80` }}
              key={k}
              _id={n._id}
            />
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(NewsSearchList)
