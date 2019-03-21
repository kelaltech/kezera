import React, { Suspense } from 'react'
import { RouteComponentProps } from 'react-router'
import { Loading } from 'gerami'

import './layout-login.scss'
import Layout from '../shared/components/layout/layout'
import LayoutLoginProviders from './configs/layout-login-providers'
import layoutLoginNavigation from './configs/layout-login-navigation'
import LayoutLoginRoutes from './configs/layout-login-routes'
import { useAccountState } from '../app/stores/account/account-provider'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

function LayoutLogin({ error, match }: Props) {
  const ls = window.location.search.toLowerCase() || ''
  const accountState = useAccountState()

  return (
    <LayoutLoginProviders>
      <Layout
        noShell={ls.includes('no-shell=') ? ls.includes('no-shell=true') : undefined}
        preHeader={null}
        headerOptions={{
          navigation: layoutLoginNavigation(!!accountState.account),
          className: 'layout-login-header'
        }}
        error={error}
        nonContentHeight={164}
      >
        <Suspense fallback={<Loading delay />}>
          <LayoutLoginRoutes prefix={match.url} />
        </Suspense>
      </Layout>
    </LayoutLoginProviders>
  )
}

export default LayoutLogin
