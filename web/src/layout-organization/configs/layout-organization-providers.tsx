import React, { PropsWithChildren } from 'react'

import { MyOrganizationProvider } from '../stores/my-organization/my-organization-provider'
import { OrganizationsProvider } from '../../shared/stores/organizations/organizations-provider'
import { EventProvider } from '../stores/events/events.provider'

export default function LayoutOrganizationProviders({ children }: PropsWithChildren<{}>) {
  return (
    <OrganizationsProvider>
      <EventProvider>
        <MyOrganizationProvider>{children}</MyOrganizationProvider>
      </EventProvider>
    </OrganizationsProvider>
  )
  return <MyOrganizationProvider>{children}</MyOrganizationProvider>
}
