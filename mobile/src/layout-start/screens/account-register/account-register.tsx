import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import styles from '../account-login/account-login-styles'

function AccountRegister({ navigation }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale([])

  return (
    loading || (
      <>
        <Text>{t`app-name`}: AccountRegister Screen (in LayoutStart)</Text>
        <TouchableOpacity
          style={styles.createNewAccount}
          onPress={() =>
            navigation.dispatch(NavigationActions.navigate({ routeName: 'AccountLogin' }))
          }
        >
          <Text>Click here to {t`account:login`} (Temp UI)</Text>
        </TouchableOpacity>
      </>
    )
  )
}

export default withNavigation(AccountRegister)
