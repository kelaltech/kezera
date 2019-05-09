import React from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import values from '../../../assets/styles/values'
import classes from '../../../assets/styles/classes'
import { setLanguage } from '../../../lib/language'

type Props = {
  style?: StyleProp<ViewStyle>
}

function Footer({ style = {} }: Props) {
  return (
    <View style={style}>
      <View style={classes.row}>
        <View style={{ ...classes.grow, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => setLanguage('am')}>
            <Text>አማርኛ</Text>
          </TouchableOpacity>
        </View>

        <View style={classes.paddingHorizontalBig}>
          <Text style={{ color: values.color.blackish }}>|</Text>
        </View>

        <View style={classes.grow}>
          <TouchableOpacity onPress={() => setLanguage('en')}>
            <Text>English</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: values.space.big * 2 }} />
    </View>
  )
}

export default Footer
