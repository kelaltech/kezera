import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { Button, ButtonProps } from 'react-native-elements'

import styles from './header-styles'
import values from '../../../assets/styles/values'
import { useAccountState } from '../../../app/stores/account/account-provider'

type IHeaderProps = NavigationInjectedProps<{}> & {
  title: string

  showBack?: boolean
  backBtnProps?: ButtonProps
}

function Header({ navigation, title, showBack, backBtnProps = {} }: IHeaderProps) {
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

      {account && (
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(
              NavigationActions.navigate({ routeName: 'AccountSettings' })
            )
          }
        >
          <Text>
            account{'\n'}circle{'\n'}(temp UI){/* todo */}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default withNavigation(Header)
