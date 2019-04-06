import React, { PropsWithChildren } from 'react'

import { MyOrganizationProvider } from '../stores/my-organization/my-organization-provider'

export default function LayoutOrganizationProviders({ children }: PropsWithChildren<{}>) {
  return <MyOrganizationProvider>{children}</MyOrganizationProvider>
}
