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
const VerifierOrganizations = lazy(() =>
  import('../pages/verifier-organizations/verifier-organizations')
)
const OrganizationDetail = lazy(() =>
  import('../../shared/pages/organization-detail/organization-detail')
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

          <Route exact path={`${p}/organizations`} component={VerifierOrganizations} />
          <Route exact path={`${p}/organization/:_id`} component={OrganizationDetail} />
        </>
      )}

      <Route component={NotFound} />
    </Switch>
  )
}
