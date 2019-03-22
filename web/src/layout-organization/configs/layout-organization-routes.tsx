import React, { lazy } from 'react'
import { Route, Switch } from 'react-router'

import { useAccountState } from '../../app/stores/account/account-provider'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))
const AccountDetail = lazy(() =>
  import('../../shared/pages/account-detail/account-detail')
)

const News = lazy(() => import('../pages/news/news'))
const NewsEditPage = lazy(() => import('../pages/news/news-edit'))
const NewsAddPage = lazy(() => import('../pages/news/news-add'))
const NewsDetailPage = lazy(() => import('../../shared/pages/news-detail/news-detail'))
const Event = lazy(() => import('../pages/event/event'))
const EventDetail = lazy(() => import('../../shared/pages/event-detail/event-detail'))

const RequestList = lazy(() => import('../../shared/components/request/request'))
const RequestAdd = lazy(() =>
  import('../../layout-organization/pages/request/request-add')
)
const RequestDetail = lazy(() =>
  import('../../shared/pages/request-detail/request-detail')
)

export default function LayoutOrganizationRoutes({ prefix: p }: { prefix: string }) {
  const { account } = useAccountState()

  return (
    <Switch>
      <Route exact path={`${p}/account`} component={AccountDetail} />

      <Route exact path={`${p}/news`} component={News} />
      <Route exact path={`${p}/news/creat`} component={NewsAddPage} />
      <Route exact path={`${p}/news/:_id`} component={NewsDetailPage} />
      <Route exact path={`${p}/news/:_id/edit`} component={NewsEditPage} />

      <Route exact path={`${p}/event/:_id`} component={EventDetail} />
      <Route exact path={`${p}/event`} component={Event} />

      <Route exact path={`${p}/request/list`} component={RequestList} />
      <Route exact path={`${p}/request/add`} component={RequestAdd} />
      <Route exact path={`${p}/request/:_id`} component={RequestDetail} />

      <Route component={NotFound} />
    </Switch>
  )
}
