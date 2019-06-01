import React, { useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { Button, Image, Input } from 'react-native-elements'

import styles from './account-login-styles'
import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'
import { login, logout } from '../../../app/stores/account/account-actions'
import Loading from '../../../shared/components/loading/loading'
import Footer from '../../../shared/components/footer/footer'

type Params = {
  email?: string
}

function AccountLogin({ navigation }: NavigationInjectedProps<Params>) {
  const { loading, t } = useLocale(['account'])

  const [sending, setSending] = useState(false)

  const [data, setData] = useState({
    email: navigation.getParam('email', '') || '',
    password: ''
  })

  const { account } = useAccountState()
  const accountDispatch = useAccountDispatch()

  const handleLogin = (): void => {
    setSending(true)
    login(
      accountDispatch,
      data,
      () => {
        setSending(false)
        setData({ ...data, password: '' })
        navigation.dispatch(NavigationActions.navigate({ routeName: 'Init' }))
      },
      e => {
        Alert.alert(
          t`error`,
          e.message === 'WRONG_CREDENTIALS'
            ? t`account:wrong-credentials`
            : e.response && e.response.data
            ? e.response.data.prettyMessage || e.response.data.message
            : e.message
        )
        setSending(false)
      }
    )
  }

  const handleLogout = (): void => {
    setSending(true)
    Alert.alert(
      t`are-you-sure-you-want-to-logout`,
      undefined,
      [
        {
          style: 'cancel',
          text: t`no`,
          onPress: () => {
            setSending(false)
          }
        },
        {
          style: 'default',
          text: t`yes`,
          onPress: () => {
            logout(
              accountDispatch,
              () => {
                setSending(false)
                navigation.dispatch(NavigationActions.navigate({ routeName: 'Init' }))
              },
              e => {
                Alert.alert(
                  t`error`,
                  e.response && e.response.data
                    ? e.response.data.prettyMessage || e.response.data.message
                    : e.message
                )
                setSending(false)
              }
            )
          }
        }
      ],
      { cancelable: true }
    )
  }

  return (
    loading ||
    (account === undefined ? (
      <Loading />
    ) : account === null ? (
      <ScrollView style={styles.main}>
        <View style={classes.grow} />

        <Image
          style={styles.logo}
          source={require('../../../assets/images/common/wordmark-512.png')}
        />

        <View style={styles.form}>
          <Text style={styles.title}>{t`account:login`}</Text>

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
        </View>

        <Footer style={classes.marginTopBig} />
      </ScrollView>
    ) : (
      <View style={{ ...styles.main, ...classes.paddingHorizontal }}>
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

        <Footer />

        <View style={classes.marginTopBig}>
          <Button
            onPress={() =>
              navigation.dispatch(NavigationActions.navigate({ routeName: 'Init' }))
            }
            title={t`go-home`}
          />
        </View>

        <View style={classes.marginTopBig}>
          <Button onPress={handleLogout} title={t`account:logout`} disabled={sending} />
        </View>
      </View>
    ))
  )
}

export default withNavigation(AccountLogin)
