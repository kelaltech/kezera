import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as qs from 'qs'

import { useAccountState } from '../../app/stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)
const AccountVolunteerRegister = lazy(() =>
  import('../pages/volunteer-register/volunteer-register')
)

export default function LayoutVolunteerRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      {account && <Redirect from={`${p}/register`} to={`/login/redirect/account`} />}

      {account ? (
        <Route exact path={`${p}/account`} component={AccountDetail} />
      ) : (
        <Redirect
          exact
          from={`${p}/account`}
          to={`/login?${qs.stringify({ continue: `${p}/account` })}`}
        />
      )}

      <Route exact path={`${p}/register`} component={AccountVolunteerRegister} />

      <Route component={NotFound} />
    </Switch>
  )
}
