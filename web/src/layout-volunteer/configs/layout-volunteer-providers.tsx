import React, { PropsWithChildren } from 'react'

import { OrganizationsProvider } from '../../shared/stores/organizations/organizations-provider'

export default function LayoutVolunteerProviders({ children }: PropsWithChildren<{}>) {
  return <OrganizationsProvider>{children}</OrganizationsProvider>
}
