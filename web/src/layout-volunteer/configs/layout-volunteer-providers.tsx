import React, { PropsWithChildren } from 'react'
import { VolunteerProvider } from '../stores/volunteer/volunteer-provider'

export default function LayoutVolunteerProviders({ children }: PropsWithChildren<{}>) {
  return <VolunteerProvider>{children}</VolunteerProvider>
}
