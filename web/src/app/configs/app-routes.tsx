import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// routes
const LayoutLogin = lazy(() => import('../../layout-login/layout-login'))
const LayoutOrganization = lazy(() =>
  import('../../layout-organization/layout-organization')
)
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))

export default function AppRoutes() {
  return (
    <Switch>
      <Redirect exact path={`/index.html`} to={`/`} />

      <Route path={'/login'} component={LayoutLogin} />
      <Route path={'/organization'} component={LayoutOrganization} />

      <Route component={NotFound} />
    </Switch>
  )
}
