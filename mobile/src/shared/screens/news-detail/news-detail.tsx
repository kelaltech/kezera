import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import Axios from 'axios'
import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'
import { richTextToDisplayDetail } from '../../../lib/richTextConverter'
import { Icon, Image, Tile } from 'react-native-elements'
import { baseUrl } from '../../../app/configs/setup-axios'
import detailStyle from './news-detail-style'
import newsStyle from '../../components/news-today/news-today-style'
import classes from '../../../assets/styles/classes'
function NewsDetail({ navigation }: NavigationInjectedProps<{ _id: string }>) {
  const { loading, t } = useLocale([])
  const [news, setNews] = useState<any>([])
  const [error, setError] = useState([])
  useEffect(() => {
    Axios.get(`/api/news/${navigation.getParam('_id')}`)
      .then(news => news.data)
      .then(data => {
        setNews(richTextToDisplayDetail(data))
      })
      .catch(e => {
        setError(e)
      })
  }, [])

  return (
    loading || (
      <>
        <Header title={t`news:news`} showBack />
        <ScrollView>
          <View style={detailStyle.imageCont}>
            <Tile
              imageSrc={{ uri: `${baseUrl}/api/news/${navigation.getParam('_id')}/pic` }}
              title={news.title}
              featured
              contentContainerStyle={detailStyle.newsImage}
            />
          </View>
          <View>
            <Text style={detailStyle.by}>{'merry-joy'}</Text>
            <View style={detailStyle.actionStyle}>
              <View style={detailStyle.actionChild}>
                <Icon name={'heart-outline'} type={'material-community'} />
                <Text style={classes.paddingHorizontalSmall}>{'like'}</Text>
              </View>
              <View style={detailStyle.actionChild}>
                <Icon name={'comment-outline'} type={'material-community'} />
                <Text style={classes.paddingHorizontalSmall}>{'comment'}</Text>
              </View>
              <View style={detailStyle.actionChild}>
                <TouchableOpacity>
                  <Icon name={'share-variant'} type={'material-community'} />
                </TouchableOpacity>
                <Text style={classes.paddingHorizontalSmall}>{'share'}</Text>
              </View>
            </View>
          </View>

          <View style={classes.paddingHorizontalBig}>
            <Text>{news.description}</Text>
          </View>
          <View style={classes.paddingVerticalBig} />
          <View style={classes.paddingHorizontalBig}>
            <Text>{news.article}</Text>
          </View>
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(NewsDetail)
