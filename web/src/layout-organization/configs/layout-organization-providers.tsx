import React, { PropsWithChildren } from 'react'

import { MyOrganizationProvider } from '../stores/my-organization/my-organization-provider'
import { EventProvider } from '../stores/events/events.provider'

export default function LayoutOrganizationProviders({ children }: PropsWithChildren<{}>) {
  return (
    <MyOrganizationProvider>
      <EventProvider>{children}</EventProvider>
    </MyOrganizationProvider>
  )
}
