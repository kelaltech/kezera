import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import Axios from 'axios'
import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'
import { richTextToDisplayDetail } from '../../../lib/richTextConverter'
import { Icon, Image, Tile } from 'react-native-elements'
import { baseUrl } from '../../../app/configs/setup-axios'
import detailStyle from './news-detail-style'
import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'
function NewsDetail({ navigation }: NavigationInjectedProps<{ _id: string }>) {
  const { loading, t } = useLocale([])
  const [news, setNews] = useState<any>([])
  const [like, setLike] = useState<any>(null)
  const [shares, setShare] = useState<any>(null)
  const [error, setError] = useState([])

  const id = navigation.getParam('_id')
  useEffect(() => {
    Axios.get(`/api/news/${id}`)
      .then(news => news.data)
      .then(data => {
        setNews(richTextToDisplayDetail(data))
      })
      .catch(e => {
        setError(e)
      })
  }, [])

  const handleLike = () => {
    Axios.put(`/api/news/${id}/like`)
      .then(data => {
        setLike(data.data.likes)
      })
      .catch(e => {
        setError(e)
      })
  }

  const handleShare = async () => {
    Share.share({
      message: 'Sharing sample data',
      title: 'Title for sharing '
    })
      .then(({ action, activityType }: any) => {
        if (action === Share.sharedAction) {
          if (activityType) {
            console.log('shared successfully with activity type')
          } else {
            // shared
            Axios.put(`/api/news/${id}/share`)
              .then(news => news.data)
              .then(data => {
                setShare(data.share)
              })
              .catch(e => {
                console.log(e) //todo handle error properly
              })
          }
        } else if (action === Share.dismissedAction) {
          // dismissed
          console.log('share dismissed')
        }
      })
      .catch(e => {
        console.log('failed !!!')
        Alert.alert('error', e)
      })
  }

  return (
    loading || (
      <>
        <Header title={t`news:news`} showBack />
        <ScrollView>
          <View style={detailStyle.imageCont}>
            <Tile
              activeOpacity={1}
              imageSrc={{ uri: `${baseUrl}/api/news/${navigation.getParam('_id')}/pic` }}
              title={news.title}
              featured
              contentContainerStyle={detailStyle.newsImage}
            />
          </View>
          <View>
            <Text style={detailStyle.by}>{`${news._by.account.displayName}`}</Text>
            <View style={detailStyle.actionStyle}>
              <TouchableOpacity onPress={handleLike}>
                <View style={detailStyle.actionChild}>
                  <Icon name={'heart-outline'} type={'material-community'} />
                  <Text style={classes.paddingHorizontalSmall}>{`like ${
                    like ? like : news.likes.length
                  }`}</Text>
                </View>
              </TouchableOpacity>
              <View style={detailStyle.actionChild}>
                <Icon
                  onPress={() =>
                    navigation.dispatch(
                      NavigationActions.navigate({
                        routeName: 'CommentList',
                        params: {
                          id: id
                        }
                      })
                    )
                  }
                  name={'comment-outline'}
                  type={'material-community'}
                />
                <Text style={classes.paddingHorizontalSmall}>{`comment ${
                  news.comments.length
                }`}</Text>
              </View>
              <TouchableOpacity onPress={handleShare}>
                <View style={detailStyle.actionChild}>
                  <Icon name={'share-variant'} type={'material-community'} />
                  <Text style={classes.paddingHorizontalSmall}>{`share ${
                    shares ? shares : news.share.length
                  }`}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={classes.paddingHorizontalBig}>
            <Text>{news.description}</Text>
          </View>
          <View style={classes.paddingVerticalBig} />
          <View
            style={{
              ...classes.paddingHorizontalBig,
              ...classes.marginBottomBig
            }}
          >
            <Text
              style={{
                lineHeight: values.space.big,
                fontFamily: 'Roboto sans',
                fontSize: values.fontSize.normal
              }}
            >
              {news.article}
            </Text>
          </View>
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(NewsDetail)
