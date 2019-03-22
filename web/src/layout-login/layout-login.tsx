import React, { Suspense } from 'react'
import { RouteComponentProps } from 'react-router'
import { Loading } from 'gerami'
import * as qs from 'qs'

import './layout-login.scss'
import useLocale from '../shared/hooks/use-locale/use-locale'
import { useAccountState } from '../app/stores/account/account-provider'
import LayoutLoginProviders from './configs/layout-login-providers'
import Layout from '../shared/components/layout/layout'
import layoutLoginNavigation from './configs/layout-login-navigation'
import LayoutLoginRoutes from './configs/layout-login-routes'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

function LayoutLogin({ error, match }: Props) {
  const { t } = useLocale()
  const { account } = useAccountState()

  const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })['no-shell']
  const noShell = q ? q == 'true' : undefined

  return (
    <LayoutLoginProviders>
      <Layout
        noShell={noShell}
        preHeader={null}
        headerOptions={{
          navigation: layoutLoginNavigation(t, account),
          className: 'layout-login-header'
        }}
        error={error}
        nonContentHeight={164}
      >
        <Suspense fallback={<Loading delay />}>
          <LayoutLoginRoutes prefix={match.url.replace(/\/$/, '')} />
        </Suspense>
      </Layout>
    </LayoutLoginProviders>
  )
}

export default LayoutLogin
