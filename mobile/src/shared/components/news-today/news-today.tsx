import React, { useState } from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { View, Text, TouchableOpacity, ImageURISource } from 'react-native'
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
}

function NewsToday({
  navigation,
  img,
  likes,
  title,
  description,
  comment,
  share
}: NavigationInjectedProps & INewsToday) {
  const [like, setLike] = useState([])
  const [error, setError] = useState()

  const handleLike = () => {
    Axios.put('...')
      .then(data => data.data)
      .then((data: any) => {
        setLike(data.numberOfLikes)
      })
      .catch(e => {
        setError(e)
      })
  }

  const handleShare = () => {}
  return (
    <>
      <View style={newsStyle.newsTodayParent}>
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'NewsDetail'
              })
            )
          }
        >
          <Card
            containerStyle={newsStyle.cardStyle}
            image={img}
            imageStyle={newsStyle.imageStyle}
            imageProps={{ resizeMode: 'cover' }}
          />
        </TouchableOpacity>
        <View style={newsStyle.actionStyle}>
          <View style={newsStyle.actionChild}>
            <Icon
              onPress={handleLike}
              name={'heart-outline'}
              type={'material-community'}
            />
            <Text style={classes.paddingHorizontalSmall}>{likes}</Text>
          </View>
          <View style={newsStyle.actionChild}>
            <Icon name={'comment-outline'} type={'material-community'} />
            <Text style={classes.paddingHorizontalSmall}>{comment}</Text>
          </View>
          <View style={newsStyle.actionChild}>
            <Icon
              onPress={handleShare}
              name={'share-variant'}
              type={'material-community'}
            />
            <Text style={classes.paddingHorizontalSmall}>{share}</Text>
          </View>
        </View>
        <View style={classes.paddingHorizontal}>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                NavigationActions.navigate({
                  routeName: 'NewsDetail'
                })
              )
            }
          >
            <Text
              style={{
                ...classes.head1,
                color: values.color.black
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                ...classes.sub1,
                color: values.color.blackish
              }}
            >
              {description}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default withNavigation(NewsToday)
