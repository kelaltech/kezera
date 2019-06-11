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
const VerifierSearchResult = lazy(() =>
  import('../pages/verifier-search-result/verifier-search-result')
)
const VerifierDescription = lazy(() =>
  import('../pages/verifier-description/verifier-description')
)

const RequestDetail = lazy(() =>
  import('../../shared/pages/request-detail/request-detail')
)
const EventDetail = lazy(() => import('../../shared/pages/event-detail/event-detail'))
const NewsDetail = lazy(() => import('../../shared/pages/news-detail/news-detail'))

const OrganizationDetail = lazy(() =>
  import('../../shared/pages/organization-detail/organization-detail')
)
const SeekHelp = lazy(() => import('../../shared/pages/seek-help/seek-help'))
const VolunteerProfile = lazy(() =>
  import('../../shared/pages/volunteer-profile/volunteer-profile')
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
          <Route exact path={`${p}/verifier-search`} component={VerifierSearchResult} />
          <Route exact path={`${p}/verifier/:_id`} component={VerifierDescription} />
        </Flex>
      )}

      <Route exact path={`${p}/request/:_id`} component={RequestDetail} />
      <Route exact path={`${p}/event/:_id`} component={EventDetail} />
      <Route exact path={`${p}/news/:_id`} component={NewsDetail} />

      <Route exact path={`${p}/v/:_id`} component={VolunteerProfile} />
      <Route exact path={`${p}/o/:_id`} component={OrganizationDetail} />
      <Route exact path={`${p}/seek-help/:organization_id`} component={SeekHelp} />

      <Route exact path={`${p}/about`} component={Landing} />
      <Route component={NotFound} />
    </Switch>
  )
}
