import React, { lazy } from 'react'
import { Route, Switch } from 'react-router'

// routes
const NotFound = lazy(() => import('../../shared/pages/not-found/not-found'))

const Summary = lazy(() => import('../pages/summary/summary'))

const News = lazy(() => import('../pages/news/news'))

const Event = lazy(() => import('../pages/event/event'))
const EventDetail = lazy(() => import('../../shared/pages/event-detail/event-detail'))

const RequestList = lazy(() => import('../../shared/components/request/request'))
const RequestAdd = lazy(() =>
  import('../../layout-organization/pages/request/request-add')
)
const RequestDetail = lazy(() =>
  import('../../shared/pages/request-detail/request-detail')
)

//Todo add the rest of the pages here

export default function LayoutOrganizationRoutes({ prefix: p }: { prefix: string }) {
  return (
    <Switch>
      <Route exact path={`${p}/news`} component={News} />

      <Route exact path={`${p}/event/:_id`} component={EventDetail} />
      <Route exact path={`${p}/event`} component={Event} />

      <Route exact path={`${p}/request/list`} component={RequestList} />
      <Route exact path={`${p}/request/add`} component={RequestAdd} />
      <Route exact path={`${p}/request/:_id`} component={RequestDetail} />

      <Route exact path={`${p}/`} component={Summary} />
      {/*todo add te routes here */}
      <Route component={NotFound} />
    </Switch>
  )
}
