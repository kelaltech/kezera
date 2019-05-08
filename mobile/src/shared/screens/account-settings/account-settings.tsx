import React, { useState } from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'

import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'
import { Button } from 'react-native-elements'
import { useAccountDispatch } from '../../../app/stores/account/account-provider'
import { logout } from '../../../app/stores/account/account-actions'
import classes from '../../../assets/styles/classes'

function AccountSettings({ navigation }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['account'])

  const [sending, setSending] = useState(false)

  const accountDispatch = useAccountDispatch()

  const handleLogout = (): void => {
    setSending(true)
    logout(
      accountDispatch,
      () => {
        setSending(false)
        navigation.dispatch(NavigationActions.navigate({ routeName: 'Init' }))
      },
      e => {
        Alert.alert(t`error`, e.message)
        setSending(false)
      }
    )
  }

  return (
    loading || (
      <>
        <Header title={t`account:account-settings`} showAccount={false} showBack />

        <ScrollView style={classes.padding}>
          <Text>{t`app-name`}: AccountSettings Screen (in App/shared)</Text>

          <Button title={t`account:logout`} onPress={handleLogout} disabled={sending} />
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(AccountSettings)
