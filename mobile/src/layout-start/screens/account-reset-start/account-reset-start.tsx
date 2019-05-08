import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { NavigationInjectedProps, ScrollView, withNavigation } from 'react-navigation'
import { IAccountResetStartRequest } from '../../../apiv/account.apiv'
import Axios from 'axios'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import Header from '../../../shared/components/header/header'
import classes from '../../../assets/styles/classes'

type Params = {
  email?: string
}

function AccountResetStart({ navigation }: NavigationInjectedProps<Params>) {
  const { loading, t } = useLocale([])

  const [state, setState] = useState<'INITIAL' | 'SENDING' | 'SENT'>('INITIAL')

  const [email, setEmail] = useState(navigation.getParam('email', '') || '')

  const handleResetStart = async (): Promise<void> => {
    setState('SENDING')

    const data: IAccountResetStartRequest = { emailTo: email }
    try {
      await Axios.post('/api/account/reset/start', data)
    } catch (e) {
      Alert.alert(
        t`error`,
        e.response && e.response.data
          ? e.response.data.prettyMessage || e.response.data.message
          : e.message
      )
      setState('INITIAL')
      return
    }

    setState('SENT')
  }

  return (
    loading || (
      <>
        <Header title={t`account:reset-account-password`} showBack />

        <ScrollView style={classes.padding}>
          {state === 'SENT' ? (
            <Text>{t`account:reset-email-sent-confirmation`}</Text>
          ) : (
            <>
              <Text>{t`account:reset-start-description`}</Text>

              <View style={classes.marginVerticalBig}>
                <Input
                  keyboardType={'email-address'}
                  placeholder={t`account:email`}
                  value={email}
                  onChangeText={setEmail}
                  editable={state === 'INITIAL'}
                  autoFocus
                />
              </View>

              <View>
                <Button
                  title={t`account:email-reset-link`}
                  onPress={handleResetStart}
                  disabled={state !== 'INITIAL'}
                />
              </View>
            </>
          )}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(AccountResetStart)
