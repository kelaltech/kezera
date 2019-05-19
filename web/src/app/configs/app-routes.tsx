import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAccountState } from '../stores/account/account-provider'
import { Loading } from 'gerami'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const LayoutAdmin = lazy(() => import('../../layout-admin/layout-admin'))
const LayoutLogin = lazy(() => import('../../layout-login/layout-login'))
const LayoutOrganization = lazy(() =>
  import('../../layout-organization/layout-organization')
)
const LayoutVerifier = lazy(() => import('../../layout-verifier/layout-verifier'))
const LayoutVolunteer = lazy(() => import('../../layout-volunteer/layout-volunteer'))

export default function AppRoutes() {
  const { account } = useAccountState()

  return (
    <Switch>
      <Redirect exact path={`/index.html`} to={`/`} />

      {/* todo: change LayoutVolunteer below to LayoutDefault */}
      <Route path={'/default'} component={LayoutVolunteer} />
      <Route path={'/login'} component={LayoutLogin} />

      {account && account.role === 'VOLUNTEER' ? (
        <Route path={'/verifier'} component={LayoutVerifier} />
      ) : null}
      {account && account.role === 'ORGANIZATION' ? (
        <Route path={'/organization'} component={LayoutOrganization} />
      ) : null}
      {account && account.role === 'VERIFIER' ? (
        <Route path={'/verifier'} component={LayoutVerifier} />
      ) : null}
      {account && account.role === 'ADMIN' ? (
        <Route path={'/admin'} component={LayoutAdmin} />
      ) : null}

      <Route
        path={''}
        component={
          account === undefined
            ? () => <Loading delay />
            : account === null
            ? LayoutVolunteer /* todo: ...change to LayoutDefault */
            : account.role === 'VOLUNTEER'
            ? LayoutVolunteer
            : account.role === 'ORGANIZATION'
            ? LayoutOrganization
            : account.role === 'VERIFIER'
            ? LayoutVerifier
            : account.role === 'ADMIN'
            ? LayoutAdmin
            : NotFound
        }
      />

      <Route component={NotFound} />
    </Switch>
  )
}
