import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAccountState } from '../../app/stores/account/account-provider'
import * as qs from 'qs'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const AccountLogin = lazy(() => import('../pages/account-login/account-login'))
const AccountResetStart = lazy(() =>
  import('../pages/account-reset-start/account-reset-start')
)
const AccountResetFinish = lazy(() =>
  import('../pages/account-reset-finish/account-reset-finish')
)

export default function LayoutLoginRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Redirect
        from={`${p}/redirect/account`}
        to={
          account
            ? `/${account.role.toLowerCase()}/account`
            : `/login?${qs.stringify({ continue: '/login/account' })}`
        }
      />
      <Redirect exact from={`${p}/reset`} to={`${p}/reset/start`} />

      <Route exact path={`${p}/`} component={AccountLogin} />
      <Route exact path={`${p}/reset/start`} component={AccountResetStart} />
      <Route exact path={`${p}/reset/finish`} component={AccountResetFinish} />

      <Route component={NotFound} />
    </Switch>
  )
}
