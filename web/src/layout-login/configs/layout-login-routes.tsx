import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAccountState } from '../../app/stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const AccountLogin = lazy(() => import('../pages/account-login/account-login'))
const AccountReset = lazy(() => import('../pages/account-reset/account-reset'))

export default function LayoutLoginRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Redirect
        from={`${p}/account`}
        to={
          account
            ? `/${account.role.toLowerCase()}/account`
            : '/login?continue=/login/account'
        }
      />

      <Route exact path={`${p}/`} component={AccountLogin} />
      <Route exact path={`${p}/reset`} component={AccountReset} />

      <Route component={NotFound} />
    </Switch>
  )
}
