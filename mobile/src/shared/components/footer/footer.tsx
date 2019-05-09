import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import values from '../../../assets/styles/values'
import classes from '../../../assets/styles/classes'
import { setLanguage } from '../../../lib/language'

function Footer() {
  return (
    <>
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
    </>
  )
}

export default Footer
