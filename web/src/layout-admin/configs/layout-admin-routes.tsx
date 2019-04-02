import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useAccountState } from '../../app/stores/account/account-provider'
import Statistics from '../pages/statistics/statistics'
import VerifierList from '../pages/verifier-list/verifier-list'
import VerifierDescription from '../pages/verifier-description/verifier-description'
import VerifierAdd from '../pages/verifier-add/verifier-add'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)

export default function LayoutAdminRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Route exact path={`${p}/account`} component={AccountDetail} />
      <Route exact path={`${p}/statistics`} component={Statistics} />
      <Route exact path={`${p}/verifiers`} component={VerifierList} />
      <Route exact path={`${p}/verifier/add`} component={VerifierAdd} />
      <Route exact path={`${p}/verifier/:_id`} component={VerifierDescription} />
      <Route component={NotFound} />
    </Switch>
  )
}
