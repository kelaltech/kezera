import React from 'react'
import { RouteComponentProps } from 'react-router'

import { useAccountState } from '../app/stores/account/account-provider'
import LayoutOrganizationProviders from './configs/layout-organization-providers'
import Layout from '../shared/components/layout/layout'
import LayoutOrganizationRoutes from './configs/layout-orgainzation-routes'
import layoutOrganizationNavigation from './configs/layout-organization-navigation'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

export default function LayoutOrganization({ error, match }: Props) {
  const userState = useAccountState()

  const ls = window.location.search.toLowerCase() || ''
  return (
    <LayoutOrganizationProviders>
      <Layout
        noShell={ls.includes('no-shell=') ? ls.includes('no-shell=true') : undefined}
        headerOptions={{ navigation: layoutOrganizationNavigation(!!userState.account) }}
        error={error}
        nonContentHeight={164}
      >
        <LayoutOrganizationRoutes prefix={match.url} />
      </Layout>
    </LayoutOrganizationProviders>
  )
}
