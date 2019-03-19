import React, { PropsWithChildren } from 'react'

import { AccountProvider } from '../stores/account/account-provider'

// todo: create a generalized dialog custom hook
//       with support for buttons, titles & d/t types like info, error...
export default function AppProviders({ children }: PropsWithChildren<{}>) {
  return <AccountProvider>{children}</AccountProvider>
}
