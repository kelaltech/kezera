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
const Discovery = lazy(() => import('../pages/volunteer-discover/volunteer-discovery'))
const Event = lazy(() => import('../pages/volunteer-event/volunteer-event'))
const Landing = lazy(() => import('../pages/volunteer-landing/volunteer-landing'))
const MyOrganization = lazy(() =>
  import('../pages/volunteer-my-organization/volunteer-my-organization')
)
const News = lazy(() => import('../pages/volunteer-news/volunteer-news'))
const Profile = lazy(() => import('../pages/volunteer-profile/volunteer-profile'))
const Request = lazy(() => import('../pages/volunteer-request/volunteer-request'))
const Task = lazy(() => import('../pages/volunteer-task/volunteer-task'))
const SearchResult = lazy(() =>
  import('../pages/volunteer-search-result/volunteer-search-result')
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
      <Route exact path={`${p}/discovery`} component={Discovery} />
      <Route exact path={`${p}/events`} component={Event} />
      <Route exact path={`${p}/landing`} component={Landing} />
      {/*todo change the path to*/}
      <Route exact path={`${p}/my-organization`} component={MyOrganization} />
      <Route exact path={`${p}/news`} component={News} />
      <Route exact path={`${p}/tasks`} component={Task} />
      <Route exact path={`${p}/profile`} component={Profile} />
      <Route exact path={`${p}/request`} component={Request} />
      <Route exact path={`${p}/search-result`} component={SearchResult} />
      <Route component={NotFound} />
    </Switch>
  )
}
