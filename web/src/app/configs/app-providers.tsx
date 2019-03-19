import React, { PropsWithChildren } from 'react'

import { AccountProvider } from '../stores/account/account-provider'

export default function AppProviders({ children }: PropsWithChildren<{}>) {
  return <AccountProvider>{children}</AccountProvider>
}
