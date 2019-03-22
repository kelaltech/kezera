import React, { Suspense } from 'react'
import { RouteComponentProps } from 'react-router'
import { Loading } from 'gerami'
import * as qs from 'qs'

import useLocale from '../shared/hooks/use-locale/use-locale'
import { useAccountState } from '../app/stores/account/account-provider'
import LayoutAdminProviders from './configs/layout-admin-providers'
import Layout from '../shared/components/layout/layout'
import layoutAdminNavigation from './configs/layout-admin-navigation'
import LayoutAdminRoutes from './configs/layout-admin-routes'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

function LayoutAdmin({ error, match }: Props) {
  const { t } = useLocale()
  const { account } = useAccountState()

  const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })['no-shell']
  const noShell = q ? q == 'true' : undefined

  return (
    <LayoutAdminProviders>
      <Layout
        noShell={noShell}
        preHeader={null}
        headerOptions={{ navigation: layoutAdminNavigation(t, account) }}
        error={error}
        nonContentHeight={164}
      >
        <Suspense fallback={<Loading delay />}>
          <LayoutAdminRoutes prefix={match.url.replace(/\/$/, '')} />
        </Suspense>
      </Layout>
    </LayoutAdminProviders>
  )
}

export default LayoutAdmin
