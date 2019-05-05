import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { Button, Image, Input } from 'react-native-elements'

import styles from './account-login-styles'
import classes from '../../../assets/styles/classes'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

function AccountLogin({ navigation }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['account'])

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = (): void => {
    // todo

    navigation.dispatch(NavigationActions.navigate({ routeName: 'LayoutDefault' }))
  }

  return (
    loading || (
      <View style={styles.main}>
        <View style={classes.grow} />

        <Image
          style={styles.logo}
          source={require('../../../assets/images/common/logo-128.png')}
        />

        <View style={styles.inputContainers}>
          <Input
            style={styles.inputs}
            keyboardType={'email-address'}
            placeholder={t`account:email`}
            value={data.email}
            onChangeText={email => setData({ ...data, email })}
          />
        </View>

        <View style={styles.inputContainers}>
          <Input
            style={styles.inputs}
            secureTextEntry={true}
            placeholder={t`account:password`}
            value={data.password}
            onChangeText={password => setData({ ...data, password })}
          />
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() =>
              navigation.dispatch(
                NavigationActions.navigate({ routeName: 'AccountResetStart' })
              )
            }
          >
            <Text>{t`account:forgot-password`}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.button} title={t`account:login`} onPress={handleLogin} />
        </View>

        <TouchableOpacity
          style={styles.createNewAccount}
          onPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({ routeName: 'AccountRegister' })
            )
          }
        >
          <Text>{t`account:create-new-account`}</Text>
        </TouchableOpacity>

        <View style={classes.grow} />
      </View>
    )
  )
}

export default withNavigation(AccountLogin)
