import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const AccountLogin = lazy(() => import('../pages/account-login/account-login'))
const AccountReset = lazy(() => import('../pages/account-reset/account-reset'))

export default function LayoutDefaultRoutes({ prefix: p }: { prefix: string }) {
  return (
    <Switch>
      <Route exact path={`${p}/`} component={AccountLogin} />
      <Route exact path={`${p}/reset`} component={AccountReset} />

      <Route component={NotFound} />
    </Switch>
  )
}
