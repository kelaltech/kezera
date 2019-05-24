import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as qs from 'qs'

import { useAccountState } from '../../app/stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const Landing = lazy(() => import('../../shared/pages/landing/landing'))
const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)
const Discovery = lazy(() => import('../pages/volunteer-discover/volunteer-discovery'))
const Event = lazy(() => import('../pages/volunteer-event/volunteer-event'))
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
const RequestGoing = lazy(() =>
  import('../../shared/pages/request-detail/request-going/request-going')
)
const RequestInformation = lazy(() =>
  import('../../shared/pages/request-detail/request-information')
)
const EventDetail = lazy(() => import('../../shared/pages/event-detail/event-detail'))
const OrganizationDetail = lazy(() =>
  import('../../shared/pages/organization-detail/organization-detail')
)

const NewsDetail = lazy(() => import('../../shared/pages/news-detail/news-detail'))

export default function LayoutVolunteerRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      {account && <Redirect from={`${p}/register`} to={`/login/redirect/account`} />}

      {account ? (
        <>
          <Route exact path={`${p}/account`} component={AccountDetail} />
          <Route exact path={`${p}/events`} component={Event} />
          <Route exact path={`${p}/my-organization`} component={MyOrganization} />
          <Route exact path={`${p}/news`} component={News} />
          <Route exact path={`${p}/tasks`} component={Task} />
          <Route exact path={`${p}/me`} component={Profile} />
          <Route exact path={`${p}/requests`} component={Request} />
          <Route exact path={`${p}/search-result`} component={SearchResult} />

          <Route exact path={`${p}/request/:_id/going`} component={RequestGoing} />
          <Route exact path={`${p}/request/:_id`} component={RequestInformation} />
          <Route exact path={`${p}/event/:_id`} component={EventDetail} />
          <Route exact path={`${p}/news/:_id`} component={NewsDetail} />
          <Route exact path={`${p}/organization/:_id`} component={OrganizationDetail} />

          <Route exact path={`${p}/`} component={Discovery} />
        </>
      ) : (
        <Redirect
          exact
          from={`${p}/account`}
          to={`/login?${qs.stringify({ continue: `${p}/account` })}`}
        />
      )}

      <Redirect exact from={`${p}/register`} to={'/login/register'} />

      <Route exact path={`${p}/about`} component={Landing} />
      <Route component={NotFound} />
    </Switch>
  )
}
