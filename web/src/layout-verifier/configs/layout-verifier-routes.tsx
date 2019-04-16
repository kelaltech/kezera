import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import { useAccountState } from '../../app/stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)
const VerifierApplications = lazy(() =>
  import('../pages/verifier-applications/verifier-applications')
)
const VerifierApplicationDetail = lazy(() =>
  import('../pages/verifier-application-detail/verifier-application-detail')
)

export default function LayoutVerifierRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Route exact path={`${p}/account`} component={AccountDetail} />

      {account && (
        <>
          <Route exact path={`${p}/applications`} component={VerifierApplications} />
          <Route
            exact
            path={`${p}/application/:_id`}
            component={VerifierApplicationDetail}
          />
        </>
      )}

      <Route component={NotFound} />
    </Switch>
  )
}
