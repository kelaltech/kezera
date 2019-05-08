import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { Button, ButtonProps, Image } from 'react-native-elements'

import styles from './header-styles'
import values from '../../../assets/styles/values'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { baseUrl } from '../../../app/configs/setup-axios'

type IHeaderProps = NavigationInjectedProps<{}> & {
  title: string

  /**
   * @default true if logged in, false if not.
   */
  showAccount?: boolean
  /**
   * @default false
   */
  showBack?: boolean
  backBtnProps?: ButtonProps
}

function Header({
  navigation,
  title,
  showAccount,
  showBack,
  backBtnProps = {}
}: IHeaderProps) {
  const { account } = useAccountState()

  return (
    <View style={styles.main}>
      {showBack && (
        <Button
          icon={{ name: 'arrow-back', color: values.color.white }}
          onPress={() => navigation.goBack()}
          buttonStyle={styles.backBtn}
          {...backBtnProps}
        />
      )}

      <Text style={styles.title}>{title}</Text>

      {account && (showAccount === undefined || showAccount) && (
        <TouchableOpacity
          style={styles.accountCircle}
          onPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({ routeName: 'AccountSettings' })
            )
          }
        >
          {account.photoUri ? (
            <Image
              style={styles.accountCircleImage}
              source={{ uri: `${baseUrl}${account.photoUri}` }}
              resizeMode={'contain'}
            />
          ) : (
            <Text style={styles.accountCircleText}>
              {account.displayName.substr(0, 1).toUpperCase()}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}

export default withNavigation(Header)
