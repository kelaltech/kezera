import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import { useAccountState } from '../../app/stores/account/account-provider'
import VerifierApplications from '../pages/verifier-applications/verifier-applications'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)

export default function LayoutVerifierRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Route exact path={`${p}/account`} component={AccountDetail} />

      {account && (
        <Route exact path={`${p}/applications`} component={VerifierApplications} />
      )}

      <Route component={NotFound} />
    </Switch>
  )
}
