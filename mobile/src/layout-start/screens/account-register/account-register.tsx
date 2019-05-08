import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  ScrollView,
  withNavigation
} from 'react-navigation'
import Axios from 'axios'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import styles from './account-register-styles'
import { Button, Image, Input } from 'react-native-elements'
import { IAccountRequest } from '../../../apiv/account.apiv'
import { login } from '../../../app/stores/account/account-actions'
import { useAccountDispatch } from '../../../app/stores/account/account-provider'
import values from '../../../assets/styles/values'

type Params = {
  email?: string
}

function AccountRegister({ navigation }: NavigationInjectedProps<Params>) {
  const { loading, t } = useLocale([])

  const [sending, setSending] = useState(false)

  const initialData: IAccountRequest = {
    displayName: '',
    email: navigation.getParam('email', '') || '',
    password: '',
    phoneNumber: ''
  }
  const [data, setData] = useState({ ...initialData, repeatPassword: '' })

  const accountDispatch = useAccountDispatch()

  const handleRegister = (): void => {
    setSending(true)

    if (data.password !== data.repeatPassword) {
      Alert.alert(t`error`, t`account:passwords-do-not-match`)
      setSending(false)
      return
    }

    Axios.post<void>('/api/volunteer/register', data)
      .then(() =>
        login(
          accountDispatch,
          {
            email: data.email,
            password: data.password!
          },
          () => {
            setSending(false)
            navigation.dispatch(NavigationActions.navigate({ routeName: 'Init' }))
          },
          e => {
            Alert.alert(
              t`error` + '(' + t`account:login` + ')',
              e.response && e.response.data
                ? e.response.data.prettyMessage || e.response.data.message
                : e.message
            )
            setSending(false)
          }
        )
      )
      .catch(e => {
        Alert.alert(
          t`error`,
          e.response && e.response.data
            ? e.response.data.prettyMessage || e.response.data.message
            : e.message
        )
        setSending(false)
      })
  }

  return (
    loading || (
      <ScrollView style={styles.main}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/common/logo-128.png')}
        />

        <View style={styles.inputContainers}>
          <Input
            style={styles.inputs}
            placeholder={t`account:display-name`}
            value={data.displayName}
            onChangeText={displayName => setData({ ...data, displayName })}
            editable={!sending}
            autoFocus
          />
        </View>

        <View style={styles.inputContainers}>
          <Input
            style={styles.inputs}
            keyboardType={'email-address'}
            placeholder={t`account:email`}
            value={data.email}
            onChangeText={email => setData({ ...data, email })}
            editable={!sending}
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
        </View>

        <View style={styles.inputContainers}>
          <Input
            style={styles.inputs}
            secureTextEntry={true}
            placeholder={t`account:repeat-password`}
            value={data.repeatPassword}
            onChangeText={repeatPassword => setData({ ...data, repeatPassword })}
            editable={!sending}
          />
        </View>

        <View style={styles.inputContainers}>
          <Input
            style={styles.inputs}
            keyboardType={'phone-pad'}
            placeholder={t`account:phone-number` + ' (' + t`optional` + ')'}
            value={data.phoneNumber || ''}
            onChangeText={phoneNumber => setData({ ...data, phoneNumber })}
            editable={!sending}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title={t`account:register`}
            onPress={handleRegister}
            disabled={
              sending ||
              !data.displayName ||
              !data.email ||
              !data.password ||
              !data.repeatPassword
            }
          />
        </View>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'AccountLogin',
                params: { email: data.email }
              })
            )
          }
        >
          <Text>{t`account:already-have-an-account-login`}</Text>
        </TouchableOpacity>

        <View style={{ height: values.space.big }} />
      </ScrollView>
    )
  )
}

export default withNavigation(AccountRegister)
