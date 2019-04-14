import React from 'react'
import { RouteComponentProps } from 'react-router'
import * as qs from 'qs'

import useLocale from '../shared/hooks/use-locale/use-locale'
import { useAccountState } from '../app/stores/account/account-provider'
import LayoutVerifierProviders from './configs/layout-verifier-providers'
import Layout from '../shared/components/layout/layout'
import layoutVerifierNavigation from './configs/layout-verifier-navigation'
import LayoutVerifierRoutes from './configs/layout-verifier-routes'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

function LayoutVerifier({ error, match }: Props) {
  const { t } = useLocale()
  const { account } = useAccountState()

  const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })['no-shell']
  const noShell = q ? q == 'true' : undefined

  return (
    <LayoutVerifierProviders>
      <Layout
        noShell={noShell}
        preHeader={null}
        headerOptions={{ navigation: layoutVerifierNavigation(t, account) }}
        error={error}
        nonContentHeight={164}
      >
        <LayoutVerifierRoutes prefix={match.url.replace(/\/$/, '')} />
      </Layout>
    </LayoutVerifierProviders>
  )
}

export default LayoutVerifier
