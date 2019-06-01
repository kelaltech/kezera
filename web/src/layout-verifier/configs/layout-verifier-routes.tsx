import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { useAccountState } from '../../app/stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const Landing = lazy(() => import('../../shared/pages/landing/landing'))

const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)

const VerifierApplications = lazy(() =>
  import('../pages/verifier-applications/verifier-applications')
)
const VerifierApplicationDetail = lazy(() =>
  import('../pages/verifier-application-detail/verifier-application-detail')
)

const SpamReports = lazy(() => import('../pages/spam-reports/spam-reports'))
const SpamReportDetail = lazy(() =>
  import('../pages/spam-report-detail/spam-report-detail')
)

const VerifierOrganizations = lazy(() =>
  import('../pages/verifier-organizations/verifier-organizations')
)

const RequestDetail = lazy(() =>
  import('../../shared/pages/request-detail/request-information')
)
const EventDetail = lazy(() => import('../../shared/pages/event-detail/event-detail'))
const NewsDetail = lazy(() => import('../../shared/pages/news-detail/news-detail'))

const VolunteerProfile = lazy(() =>
  import('../../shared/pages/volunteer-profile/volunteer-profile')
)
const OrganizationDetail = lazy(() =>
  import('../../shared/pages/organization-detail/organization-detail')
)

export default function LayoutVerifierRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Redirect exact from={`${p}/`} to={`${p}/applications`} />

      <Route exact path={`${p}/account`} component={AccountDetail} />

      <Route exact path={`${p}/applications`} component={VerifierApplications} />
      <Route exact path={`${p}/application/:_id`} component={VerifierApplicationDetail} />

      <Route exact path={`${p}/spam-reports`} component={SpamReports} />
      <Route exact path={`${p}/spam-report/:_id`} component={SpamReportDetail} />

      <Route exact path={`${p}/organizations`} component={VerifierOrganizations} />

      <Route exact path={`${p}/request/:_id`} component={RequestDetail} />
      <Route exact path={`${p}/event/:_id`} component={EventDetail} />
      <Route exact path={`${p}/news/:_id`} component={NewsDetail} />

      <Route exact path={`${p}/v/:_id`} component={VolunteerProfile} />
      <Route exact path={`${p}/o/:_id`} component={OrganizationDetail} />

      <Route exact path={`${p}/about`} component={Landing} />
      <Route component={NotFound} />
    </Switch>
  )
}
