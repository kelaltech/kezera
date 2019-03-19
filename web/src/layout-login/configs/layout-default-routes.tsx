import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AsyncLoad from '../../shared/components/async-load/async-load'

// routes
const NotFound = AsyncLoad(() => import('../../shared/pages/not-found/not-found'))
const AccountLogin = AsyncLoad(() => import('../pages/account-login/account-login'))
const AccountReset = AsyncLoad(() => import('../pages/account-reset/account-reset'))

export default function LayoutDefaultRoutes({ prefix: p }: { prefix: string }) {
  return (
    <Switch>
      <Route exact path={`${p}/`} component={AccountLogin} />
      <Route exact path={`${p}/reset`} component={AccountReset} />

      <Route component={NotFound} />
    </Switch>
  )
}
