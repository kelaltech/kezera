import React, { PropsWithChildren } from 'react'

import { AccountProvider } from '../stores/account/account-provider'
import { MuiThemeProvider } from '@material-ui/core'
import { muiTheme } from './mui-theme'

// todo: create a generalized dialog custom hook
//       with support for buttons, titles & d/t types like info, error...
export default function AppProviders({ children }: PropsWithChildren<{}>) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <AccountProvider>{children}</AccountProvider>
    </MuiThemeProvider>
  )
}
