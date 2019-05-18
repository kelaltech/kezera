import React, { PropsWithChildren } from 'react'
import { SidenavProvider } from '../stores/sidenav/sidenav-provider'

export default function LayoutVolunteerSidenavProviders({
  children
}: PropsWithChildren<{}>) {
  return <SidenavProvider>{children}</SidenavProvider>
}
