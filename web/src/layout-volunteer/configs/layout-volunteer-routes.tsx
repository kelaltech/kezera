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
const Request = lazy(() => import('../pages/volunteer-request/volunteer-request'))
const Task = lazy(() => import('../pages/volunteer-task/volunteer-task'))
const SearchResult = lazy(() =>
  import('../pages/volunteer-search-result/volunteer-search-result')
)
const RequestDetail = lazy(() =>
  import('../../shared/pages/request-detail/request-detail')
)
const EventDetail = lazy(() => import('../../shared/pages/event-detail/event-detail'))
const OrganizationDetail = lazy(() =>
  import('../../shared/pages/organization-detail/organization-detail')
)
const SeekHelp = lazy(() => import('../../shared/pages/seek-help/seek-help'))

const NewsDetail = lazy(() => import('../../shared/pages/news-detail/news-detail'))

const VolunteerProfile = lazy(() =>
  import('../../shared/pages/volunteer-profile/volunteer-profile')
)

export default function LayoutVolunteerRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Redirect from={`${p}/register`} to={`/login/redirect/account`} />

      <Route exact path={`${p}/account`} component={AccountDetail} />
      <Route exact path={`${p}/events`} component={Event} />
      <Route exact path={`${p}/my-organization`} component={MyOrganization} />
      <Route exact path={`${p}/news`} component={News} />
      <Route exact path={`${p}/tasks`} component={Task} />
      <Route exact path={`${p}/requests`} component={Request} />
      <Route exact path={`${p}/search-result`} component={SearchResult} />

      <Route exact path={`${p}/request/:_id`} component={RequestDetail} />
      <Route exact path={`${p}/event/:_id`} component={EventDetail} />
      <Route exact path={`${p}/news/:_id`} component={NewsDetail} />
      <Route exact path={`${p}/organization/:_id`} component={OrganizationDetail} />

      <Route exact path={`${p}/v/:_id`} component={VolunteerProfile} />
      {/* exact path={`${p}/v/me`} is a specially supported Route by VolunteerProfile */}
      <Redirect exact from={`${p}/me`} to={`${p}/v/me`} />
      <Route exact path={`${p}/o/:_id`} component={OrganizationDetail} />
      <Route exact path={`${p}/seek-help/:organization_id`} component={SeekHelp} />

      <Route exact path={`${p}/discover`} component={Discovery} />
      <Route exact path={`${p}/`} component={Discovery} />

      <Redirect exact from={`${p}/register`} to={'/login/register'} />

      <Route exact path={`${p}/about`} component={Landing} />
      <Route component={NotFound} />
    </Switch>
  )
}
