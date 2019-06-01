import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router'

import { useAccountState } from '../../app/stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const Landing = lazy(() => import('../../shared/pages/landing/landing'))

const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)

const News = lazy(() => import('../pages/news/news/news'))
const NewsEditPage = lazy(() => import('../pages/news/news-edit'))
const NewsAddPage = lazy(() => import('../pages/news/news-add'))
const NewsDetailPage = lazy(() => import('../../shared/pages/news-detail/news-detail'))

const Event = lazy(() => import('../pages/event/event'))
const EventDetail = lazy(() => import('../../shared/pages/event-detail/event-detail'))
const EventSearchPage = lazy(() =>
  import('../../shared/pages/event-search-page/event-search-page')
)
const EventAttended = lazy(() =>
  import('../pages/event-attendance/event-attended/event-attended')
)
const EventVerification = lazy(() =>
  import('../pages/event-attendance/event-verification/event-verification')
)

const RequestList = lazy(() => import('../../shared/components/request/request-list'))
const RequestAdd = lazy(() =>
  import('../../layout-organization/pages/request/request-add')
)
const RequestInformation = lazy(() =>
  import('../../shared/pages/request-detail/request-information')
)
const RequestGoing = lazy(() =>
  import('../../shared/pages/request-detail/request-going/request-going')
)

const RequestEdit = lazy(() =>
  import('../../layout-organization/pages/request/request-edit')
)

const VolunteerProfile = lazy(() =>
  import('../../shared/pages/volunteer-profile/volunteer-profile')
)

const OrganizationDetail = lazy(() =>
  import('../../shared/pages/organization-detail/organization-detail')
)

export default function LayoutOrganizationRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Route exact path={`${p}/account`} component={AccountDetail} />

      <Redirect exact from={`${p}/apply`} to={'/login/apply'} />
      <Redirect exact from={`${p}/`} to={'/organization/me'} />

      <Route exact path={`${p}/news`} component={News} />
      <Route exact path={`${p}/news/create`} component={NewsAddPage} />
      <Route exact path={`${p}/news/:_id`} component={NewsDetailPage} />
      <Route exact path={`${p}/news/:_id/edit`} component={NewsEditPage} />

      <Route exact path={`${p}/event`} component={Event} />
      <Route exact path={`${p}/event/search`} component={EventSearchPage} />
      <Route
        exact
        path={`${p}/event/:_id/attendance/verify`}
        component={EventVerification}
      />
      <Route exact path={`${p}/event/:_id/attended`} component={EventAttended} />
      <Route exact path={`${p}/event/:_id`} component={EventDetail} />

      <Route exact path={`${p}/request/list`} component={RequestList} />
      <Route exact path={`${p}/request/add`} component={RequestAdd} />
      <Route exact path={`${p}/request/:_id`} component={RequestInformation} />
      <Route exact path={`${p}/request/:_id/edit`} component={RequestEdit} />
      <Route exact path={`${p}/request/:_id/going`} component={RequestGoing} />

      <Route exact path={`${p}/v/:_id`} component={VolunteerProfile} />
      <Route exact path={`${p}/o/:_id`} component={OrganizationDetail} />
      {/* exact path={`${p}/o/me`} is a specially supported Route by OrganizationDetail */}
      <Redirect exact from={`${p}/me`} to={`${p}/o/me`} />

      <Route exact path={`${p}/about`} component={Landing} />
      <Route component={NotFound} />
    </Switch>
  )
}
