import React, { PropsWithChildren } from 'react'

import { MyOrganizationProvider } from '../stores/my-organization/my-organization-provider'
import { OrganizationsProvider } from '../../shared/stores/organizations/organizations-provider'

export default function LayoutOrganizationProviders({ children }: PropsWithChildren<{}>) {
  return (
    <OrganizationsProvider>
      <MyOrganizationProvider>{children}</MyOrganizationProvider>
    </OrganizationsProvider>
  )
}
