import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

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
  return (
    <Switch>
      <Redirect exact path={`/index.html`} to={`/`} />

      <Route path={'/admin'} component={LayoutAdmin} />
      <Route path={'/login'} component={LayoutLogin} />
      <Route path={'/organization'} component={LayoutOrganization} />
      <Route path={'/verifier'} component={LayoutVerifier} />
      <Route path={'/volunteer'} component={LayoutVolunteer} />
      <Route path={''} component={LayoutVolunteer} />

      <Route component={NotFound} />
    </Switch>
  )
}
