import React, { PropsWithChildren } from 'react'

import { UserProvider } from '../stores/user/user-provider'

export default function AppProviders({ children }: PropsWithChildren<{}>) {
  return <UserProvider>{children}</UserProvider>
}
