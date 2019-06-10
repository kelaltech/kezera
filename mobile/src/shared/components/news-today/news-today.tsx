import React, { useState } from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { View, Text, TouchableOpacity, ImageURISource, Share, Alert } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import newsStyle from './news-today-style'
import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'
import Axios from 'axios'

interface INewsToday {
  img: ImageURISource
  title: string
  description: string
  likes: number
  comment: number
  share: number
  key?: any
  _id: any
}

function NewsToday({
  navigation,
  img,
  likes,
  title,
  description,
  comment,
  share,
  _id
}: NavigationInjectedProps & INewsToday) {
  const [like, setLike] = useState(likes)
  const [shares, setShare] = useState(share)
  const [error, setError] = useState<any>(null)

  const handleLike = () => {
    Axios.put(`/api/news/${_id}/like`)
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
            Axios.put(`/api/news/${_id}/share`)
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
    <>
      <View style={newsStyle.newsTodayParent}>
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'NewsDetail',
                params: {
                  _id: _id
                }
              })
            )
          }
        >
          <Card
            containerStyle={newsStyle.cardStyle}
            image={img}
            imageStyle={newsStyle.imageStyle}
            imageProps={{ resizeMode: 'cover' }}
          >
            <View >
              <Text
                style={{
                  ...classes.head1,
                  color: values.color.black
                }}
              >
                {title.slice(0, 100)}
              </Text>
              <Text
                style={{
                  ...classes.sub1,
                  color: values.color.blackish
                }}
              >
                {description.slice(0, 200)}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
        <View style={newsStyle.actionStyle}>
          <View style={newsStyle.actionChild}>
            <TouchableOpacity
              onPress={handleLike}
            >
            <Icon
              name={'heart-outline'}
              type={'material-community'}
            />
            </TouchableOpacity>
            <Text style={classes.paddingHorizontalSmall}>{like}</Text>
          </View>
          <View style={newsStyle.actionChild}>
            <Icon name={'comment-outline'} type={'material-community'} />
            <Text style={classes.paddingHorizontalSmall}>{comment}</Text>
          </View>
          <View style={newsStyle.actionChild}>
            <TouchableOpacity onPress={handleShare}>
              <Icon name={'share-variant'} type={'material-community'} />
            </TouchableOpacity>
            <Text style={classes.paddingHorizontalSmall}>{shares}</Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default withNavigation(NewsToday)
