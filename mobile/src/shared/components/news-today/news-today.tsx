import React from 'react'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { View, Text, TouchableOpacity } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import newsStyle from './news-today-style'
import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'

const kelal = require('../../../assets/images/common/logo-128.png')
function NewsToday({ navigation }: NavigationInjectedProps) {
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
            image={kelal}
            imageStyle={newsStyle.imageStyle}
            imageProps={{ resizeMode: 'cover' }}
          />
        </TouchableOpacity>
        <View style={newsStyle.actionStyle}>
          <View style={newsStyle.actionChild}>
            <Icon
              onPress={() => console.log('pressed')}
              name={'heart-outline'}
              type={'material-community'}
            />
          </View>
          <View style={newsStyle.actionChild}>
            <Icon name={'comment-outline'} type={'material-community'} />
          </View>
          <View style={newsStyle.actionChild}>
            <Icon name={'share-variant'} type={'material-community'} />
          </View>
        </View>
        <View style={classes.paddingHorizontal}>
          <Text
            style={{
              ...classes.head1,
              color: values.color.black
            }}
          >
            this is the title
          </Text>
          <Text
            style={{
              ...classes.sub1,
              color: values.color.blackish
            }}
          >
            this is the description...
          </Text>
        </View>
      </View>
    </>
  )
}

export default withNavigation(NewsToday)
