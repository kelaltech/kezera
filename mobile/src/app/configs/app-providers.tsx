import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from 'react-native-elements'

import theme from '../../assets/styles/theme'

export default function AppProviders({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeProvider theme={theme}>
      <>{children}</>
    </ThemeProvider>
  )
}
