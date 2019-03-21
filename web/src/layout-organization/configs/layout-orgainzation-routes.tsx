import React from 'react'
import { Route, Switch } from 'react-router'

import AsyncLoad from '../../shared/components/async-load/async-load'
import EventDetail from '../../shared/pages/event-detail/event-detail'
import RequestDetail from '../../shared/pages/request-detail/request-detail'

// routes
const NotFound = AsyncLoad(() => import('../../shared/pages/not-found/not-found'))
const Summary = AsyncLoad(() => import('../pages/summary/summary'))
const Account = AsyncLoad(() => import('../pages/account/account'))
const Donation = AsyncLoad(() => import('../pages/donation/donation'))
const News = AsyncLoad(() => import('../pages/news/news'))
const Event = AsyncLoad(() => import('../pages/event/event'))
const RequestList = AsyncLoad(() => import('../../shared/components/request/request'))
const Request = AsyncLoad(() =>
  import('../../layout-organization/pages/request/request-add')
)
//Todo add the rest of the pages here

export default function LayoutOrganizationRoutes({ prefix: p }: { prefix: string }) {
  return (
    <Switch>
      <Route exact path={`${p}/`} component={Summary} />
      <Route exact path={`${p}/news`} component={News} />
      <Route exact path={`${p}/event/:_id`} component={EventDetail} />
      <Route exact path={`${p}/event`} component={Event} />
      <Route exact path={`${p}/donation`} component={Donation} />
      <Route exact path={`${p}/account`} component={Account} />
      <Route exact path={`${p}/request/list`} component={RequestList} />
      <Route exact path={`${p}/request/add`} component={Request} />
      <Route exact path={`${p}/request/:_id`} component={RequestDetail} />
      {/*todo add te routes here */}
      <Route component={NotFound} />
    </Switch>
  )
}
