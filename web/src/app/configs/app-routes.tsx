import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAccountState } from '../stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const LayoutAdmin = lazy(() => import('../../layout-admin/layout-admin'))
const LayoutLogin = lazy(() => import('../../layout-login/layout-login'))
const LayoutOrganization = lazy(() =>
  import('../../layout-organization/layout-organization')
)
const LayoutVerifier = lazy(() => import('../../layout-verifier/layout-verifier'))
const LayoutVolunteer = lazy(() => import('../../layout-volunteer/layout-volunteer'))

export default function AppRoutes() {
  const { account } = useAccountState()

  return (
    <Switch>
      <Redirect exact path={`/index.html`} to={`/`} />

      <Route path={'/admin'} render={LayoutAdmin} />
      <Route path={'/login'} component={LayoutLogin} />
      <Route path={'/organization'} component={LayoutOrganization} />
      <Route path={'/verifier'} component={LayoutVerifier} />
      <Route path={'/volunteer'} component={LayoutVolunteer} />
      <Route path={''} component={LayoutVolunteer} />

      <Route component={NotFound} />
    </Switch>
  )
}
