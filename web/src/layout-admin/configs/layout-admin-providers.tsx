import React, { PropsWithChildren } from 'react'
import { AdminProvider } from '../stores/admin-provider'

export default function LayoutAdminProviders({ children }: PropsWithChildren<{}>) {
  return <AdminProvider>{children}</AdminProvider>
}
