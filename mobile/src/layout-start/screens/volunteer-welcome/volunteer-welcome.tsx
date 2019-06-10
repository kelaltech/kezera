import React from 'react'
import { Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { Button, Image } from 'react-native-elements'

import styles from './volunteer-welcome-styles'
import classes from '../../../assets/styles/classes'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import values from '../../../assets/styles/values'

function VolunteerWelcome({ navigation }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['volunteer'])

  return (
    loading || (
      <View style={styles.main}>
        <View style={classes.grow} />

        <Image
          style={styles.wordmark}
          source={require('../../../assets/images/common/wordmark-512.png')}
        />
        <Text style={styles.motto}>{t`app-motto`}</Text>
        <Text style={styles.welcome}>{t`volunteer:welcome`}</Text>
        <Text style={styles.emoji}>🙌</Text>

        <View style={classes.grow} />

        <Button
          title={t`volunteer:get-started`}
          onPress={() => navigation.push('AccountRegister', {})}
        />
      </View>
    )
  )
}

export default withNavigation(VolunteerWelcome)
