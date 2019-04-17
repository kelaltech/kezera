import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

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
const EventDetail = lazy(() => import('../../shared/pages/event-detail/event-detail'))
const OrganizationDetail = lazy(() =>
  import('../../shared/pages/organization-detail/organization-detail')
)

export default function LayoutVerifierRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Redirect exact from={`${p}/`} to={`${p}/applications`} />

      <Route exact path={`${p}/account`} component={AccountDetail} />

      <Route exact path={`${p}/applications`} component={VerifierApplications} />
      <Route exact path={`${p}/application/:_id`} component={VerifierApplicationDetail} />

      <Route exact path={`${p}/event/:_id`} component={EventDetail} />

      <Route exact path={`${p}/organizations`} component={VerifierOrganizations} />
      <Route exact path={`${p}/organization/:_id`} component={OrganizationDetail} />

      <Route component={NotFound} />
    </Switch>
  )
}
