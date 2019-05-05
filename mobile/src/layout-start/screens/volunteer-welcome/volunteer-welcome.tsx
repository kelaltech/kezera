import React from 'react'
import { Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { Button } from 'react-native-elements'

import styles from './volunteer-welcome-styles'
import classes from '../../../assets/styles/classes'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

function VolunteerWelcome({ navigation }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['volunteer'])

  return (
    loading || (
      <View style={styles.main}>
        <Text style={classes.grow}>
          {t`app-name`}: VolunteerWelcome Screen (in LayoutStart) {/* todo */}
        </Text>
        <Button
          title={t`volunteer:get-started`}
          onPress={() =>
            navigation.push(
              'AccountLogin' /* todo: link to AccountRegister instead */,
              {}
            )
          }
        />
      </View>
    )
  )
}

export default withNavigation(VolunteerWelcome)
