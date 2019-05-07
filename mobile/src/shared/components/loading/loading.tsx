import React from 'react'
import { Platform, ProgressBarAndroid, ProgressViewIOS, View } from 'react-native'

import classes from '../../../assets/styles/classes'

type Props = {}

function Loading({  }: Props) {
  return Platform.select({
    android: (
      <View style={{ ...classes.grow, ...classes.row, justifyContent: 'center' }}>
        <View style={{ alignSelf: 'center' }}>
          <ProgressBarAndroid />
        </View>
      </View>
    ),
    ios: (
      <View style={{ ...classes.grow, ...classes.row, justifyContent: 'center' }}>
        <View style={{ ...classes.grow, alignSelf: 'center' }}>
          <ProgressViewIOS />
        </View>
      </View>
    ),
    default: <>{null}</>
  })
}

export default Loading
