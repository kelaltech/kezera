import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useAccountState } from '../../app/stores/account/account-provider'
import AdminDrawer from '../components/drawer/drawer'
import { Flex } from 'gerami'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const Landing = lazy(() => import('../../shared/pages/landing/landing'))
const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)
const Statistics = lazy(() => import('../pages/statistics/statistics'))
const VerifierList = lazy(() => import('../pages/verifier-list/verifier-list'))
const VerifierAdd = lazy(() => import('../pages/verifier-add/verifier-add'))
const VerifierDescription = lazy(() =>
  import('../pages/verifier-description/verifier-description')
)

export default function LayoutAdminRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      {account && (
        <Flex>
          <AdminDrawer />
          <Route exact path={`${p}/account`} component={AccountDetail} />
          <Route exact path={`${p}/`} component={Statistics} />
          <Route exact path={`${p}/verifiers`} component={VerifierList} />
          <Route exact path={`${p}/verifier/add`} component={VerifierAdd} />
          <Route exact path={`${p}/verifier/:_id`} component={VerifierDescription} />
        </Flex>
      )}

      <Route exact path={`${p}/about`} component={Landing} />
      <Route component={NotFound} />
    </Switch>
  )
}
