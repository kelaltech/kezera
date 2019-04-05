import React, { lazy } from 'react'
import { Route, Switch } from 'react-router'

import { useAccountState } from '../../app/stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))

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

const OrganizationCertificateDesign = lazy(() =>
  import('../pages/organization-certificate-design/organization-certificate-design')
)
const OrganizationPortfolio = lazy(() =>
  import('../pages/organization-portfolio/organization-portfolio')
)
const OrganizationSummary = lazy(() =>
  import('../pages/organization-summary/organization-summary')
)

export default function LayoutOrganizationRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Route exact path={`${p}/account`} component={AccountDetail} />

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

      <Route
        exact
        path={`${p}/certificate-design`}
        component={OrganizationCertificateDesign}
      />
      <Route exact path={`${p}/portfolio`} component={OrganizationPortfolio} />
      <Route exact path={`${p}/summary`} component={OrganizationSummary} />
      <Route exact path={`${p}/`} component={OrganizationSummary} />

      <Route component={NotFound} />
    </Switch>
  )
}
