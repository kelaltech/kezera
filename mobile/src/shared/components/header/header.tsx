import React from 'react'
import { Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { Button, ButtonProps } from 'react-native-elements'

import styles from './header-styles'
import values from '../../../assets/styles/values'

type IHeaderProps = NavigationInjectedProps<{}> & {
  title: string

  showBack?: boolean
  backBtnProps?: ButtonProps
}

function Header({ navigation, title, showBack, backBtnProps = {} }: IHeaderProps) {
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
    </View>
  )
}

export default withNavigation(Header)
