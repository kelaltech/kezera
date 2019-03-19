import React from 'react'
import { RouteComponentProps } from 'react-router'

import './layout-login.scss'
import Translate from '../shared/components/translate/translate'
import Layout from '../shared/components/layout/layout'
import LayoutDefaultProviders from './configs/layout-default-providers'
import layoutLoginNavigation from './configs/layout-login-navigation'
import LayoutDefaultRoutes from './configs/layout-default-routes'
import { useAccountState } from '../app/stores/account/account-provider'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

export default function LayoutLogin({ error, match }: Props) {
  const ls = window.location.search.toLowerCase() || ''
  const accountState = useAccountState()

  return (
    <Translate namespaces={['common', 'account']}>
      <LayoutDefaultProviders>
        <Layout
          noShell={ls.includes('no-shell=') ? ls.includes('no-shell=true') : undefined}
          preHeader={null}
          headerOptions={{
            navigation: layoutLoginNavigation(!!accountState.user),
            className: 'layout-login-header'
          }}
          error={error}
          nonContentHeight={164}
        >
          <LayoutDefaultRoutes prefix={match.url} />
        </Layout>
      </LayoutDefaultProviders>
    </Translate>
  )
}
