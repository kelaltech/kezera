import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { useAccountState } from '../../app/stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)
const AccountVolunteerRegister = lazy(() =>
  import('../pages/account-volunteer-register/account-volunteer-register')
)

export default function LayoutVolunteerRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      {account && <Redirect from={`${p}/register`} to={`/login/redirect/account`} />}

      <Route exact path={`${p}/account`} component={AccountDetail} />
      <Route exact path={`${p}/register`} component={AccountVolunteerRegister} />

      <Route component={NotFound} />
    </Switch>
  )
}
