import React from 'react'
import { Button, Platform, Text, View } from 'react-native'
import { withTranslation } from 'react-i18next'

import styles from './sample-styles'
import _, { defaultNamespaces, setLanguage } from '../../../lib/language'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

function Sample() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to {_`app-name`}!</Text>
      <Text style={styles.instructions}>To get started, edit App.tsx</Text>
      <Text style={styles.instructions}>{instructions}</Text>
      <View>
        <Button title={'አማርኛ'} onPress={() => setLanguage('am')} />
        <Button title={'English'} onPress={() => setLanguage('en')} />
      </View>
    </View>
  )
}

export default withTranslation(defaultNamespaces.concat([]))(Sample)
