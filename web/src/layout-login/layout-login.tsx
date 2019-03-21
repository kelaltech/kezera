import React, { Suspense } from 'react'
import { RouteComponentProps } from 'react-router'

import './layout-login.scss'
import Translate from '../shared/components/translate/translate'
import Layout from '../shared/components/layout/layout'
import LayoutLoginProviders from './configs/layout-login-providers'
import layoutLoginNavigation from './configs/layout-login-navigation'
import LayoutLoginRoutes from './configs/layout-login-routes'
import { useAccountState } from '../app/stores/account/account-provider'
import { Loading } from 'gerami'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

export default function LayoutLogin({ error, match }: Props) {
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
          <Translate namespaces={['account']}>
            <LayoutLoginRoutes prefix={match.url} />
          </Translate>
        </Suspense>
      </Layout>
    </LayoutLoginProviders>
  )
}
