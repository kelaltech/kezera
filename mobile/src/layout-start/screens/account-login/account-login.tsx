import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { Button, Image, Input } from 'react-native-elements'
import Axios from 'axios'

import styles from './account-login-styles'
import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'
import { logout, reloadAccount } from '../../../app/stores/account/account-actions'
import Loading from '../../../shared/components/loading/loading'

function AccountLogin({ navigation }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['account'])

  const [sending, setSending] = useState(false)

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const { account } = useAccountState()
  const accountDispatch = useAccountDispatch()

  const handleLogin = (): void => {
    setSending(true)
    Axios.post<void>('/api/account/login', data)
      .then(response => {
        const responseUrl: string = response.request.responseURL.toLowerCase()
        if (
          responseUrl.includes('success=false') &&
          responseUrl.includes('code=wrong_credentials')
        ) {
          Alert.alert(t`error`, t`account:wrong-credentials`)
        } else {
          reloadAccount(accountDispatch)
          setData({ ...data, password: '' })
          navigation.dispatch(NavigationActions.navigate({ routeName: 'LayoutDefault' }))
        }
      })
      .catch(e => Alert.alert(t`error`, e.message))
      .finally(() => setSending(false))
  }

  const handleLogout = (): void => {
    setSending(true)
    logout(accountDispatch, () => {
      setSending(false)
      navigation.dispatch(NavigationActions.navigate({ routeName: 'VolunteerWelcome' }))
    })
  }

  return (
    loading ||
    (account === undefined ? (
      <Loading />
    ) : account === null ? (
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
            editable={!sending}
            autoFocus
          />
        </View>

        <View style={styles.inputContainers}>
          <Input
            style={styles.inputs}
            secureTextEntry={true}
            placeholder={t`account:password`}
            value={data.password}
            onChangeText={password => setData({ ...data, password })}
            editable={!sending}
          />
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() =>
              navigation.dispatch(
                NavigationActions.navigate({
                  routeName: 'AccountResetStart',
                  params: { email: data.email }
                })
              )
            }
          >
            <Text>{t`account:forgot-password`}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title={t`account:login`}
            onPress={handleLogin}
            disabled={sending || !data.email || !data.password}
          />
        </View>

        <TouchableOpacity
          style={styles.createNewAccount}
          onPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'AccountRegister',
                params: { email: data.email }
              })
            )
          }
        >
          <Text>{t`account:create-new-account`}</Text>
        </TouchableOpacity>

        <View style={classes.grow} />
      </View>
    ) : (
      <View style={{ ...styles.main }}>
        <View style={{ ...classes.marginVerticalBig, ...classes.grow }}>
          <Text style={{ fontSize: values.fontSize.big }}>
            {t`account:logged-in-as`}
            {'\n'}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                NavigationActions.navigate({ routeName: 'AccountSettings' })
              )
            }
          >
            <Text
              style={{ color: values.color.secondary, fontSize: values.fontSize.big }}
            >
              {account.email}
            </Text>
          </TouchableOpacity>
        </View>
        <Button onPress={handleLogout} title={t`account:logout`} disabled={sending} />
      </View>
    ))
  )
}

export default withNavigation(AccountLogin)
