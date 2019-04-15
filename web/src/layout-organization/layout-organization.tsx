import React from 'react'
import { RouteComponentProps } from 'react-router'
import * as qs from 'qs'

import useLocale from '../shared/hooks/use-locale/use-locale'
import { useAccountState } from '../app/stores/account/account-provider'
import LayoutOrganizationProviders from './configs/layout-organization-providers'
import Layout from '../shared/components/layout/layout'
import layoutOrganizationNavigation from './configs/layout-organization-navigation'
import LayoutOrganizationRoutes from './configs/layout-organization-routes'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

function LayoutOrganization({ error, match }: Props) {
  const { t } = useLocale()
  const { account } = useAccountState()

  const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })['no-shell']
  const noShell = q ? q == 'true' : undefined

  return (
    <LayoutOrganizationProviders>
      <Layout
        noShell={noShell}
        preHeader={null}
        headerOptions={{ navigation: layoutOrganizationNavigation(t, account) }}
        error={error}
        nonContentHeight={164}
      >
        <LayoutOrganizationRoutes prefix={match.url.replace(/\/$/, '')} />
      </Layout>
    </LayoutOrganizationProviders>
  )
}

export default LayoutOrganization
