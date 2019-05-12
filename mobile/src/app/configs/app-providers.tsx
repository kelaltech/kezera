import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from 'react-native-elements'

import theme from '../../assets/styles/theme'
import { AccountProvider } from '../stores/account/account-provider'

export default function AppProviders({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeProvider theme={theme}>
      <AccountProvider>
        <>{children}</>
      </AccountProvider>
    </ThemeProvider>
  )
}
