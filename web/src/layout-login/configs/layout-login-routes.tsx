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
const OrganizationApply = lazy(() =>
  import('../pages/organization-apply/organization-apply')
)
const VolunteerRegister = lazy(() =>
  import('../pages/volunteer-register/volunteer-register')
)

export default function LayoutLoginRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      {account ? (
        <Redirect
          exact
          from={`${p}/redirect/account`}
          to={`/${account.role.toLowerCase()}/account`}
        />
      ) : (
        <Redirect
          exact
          from={`${p}/redirect/account`}
          to={`/login?${qs.stringify({ continue: `${p}/redirect/account` })}`}
        />
      )}

      <Route exact path={`${p}/`} component={AccountLogin} />

      <Redirect exact from={`${p}/reset`} to={`${p}/reset/start`} />
      {account ? (
        <Redirect exact from={`${p}/reset/start`} to={`${p}/redirect/account`} />
      ) : (
        <Route exact path={`${p}/reset/start`} component={AccountResetStart} />
      )}
      <Route exact path={`${p}/reset/finish`} component={AccountResetFinish} />

      <Route exact path={`${p}/apply`} component={OrganizationApply} />
      <Route exact path={`${p}/register`} component={VolunteerRegister} />

      <Route component={NotFound} />
    </Switch>
  )
}
