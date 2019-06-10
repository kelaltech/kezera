import React from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { View, Text } from 'react-native'
import Header from '../../../shared/components/header/header'
import { Comment } from './comment/comment'
import classes from '../../../assets/styles/classes'

function CommentList ({navigation}: NavigationInjectedProps) {
  const id = navigation.getParam('id')
  return (
    <>
      <Header title={'Comments'} showBack/>
      <View
        style={
          classes.marginVerticalBig
        }
      >
        <Comment id={id}/>
      </View>
    </>
  )
}

export default withNavigation(CommentList)