import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import AsyncLoad from '../../shared/components/async-load/async-load'
import requestAdd from '../pages/request/request-add'

// routes
const NotFound = AsyncLoad(() => import('../../shared/pages/not-found/not-found'))
const Summary = AsyncLoad(() => import('../pages/summary/summary'))
const Account = AsyncLoad(() => import('../pages/account/account'))
const Donation = AsyncLoad(() => import('../pages/donation/donation'))
const News = AsyncLoad(() => import('../pages/news/news'))
const Event = AsyncLoad(() => import('../pages/event/event'))
//const Login = AsyncLoad(() => import('../../layout-default/pages/login/login'))
const Request = AsyncLoad(() =>
  import('../../layout-organization/pages/request/request-add')
)
//Todo change the login page import maybe
//Todo add the rest of the pages here

export default function LayoutOrganizationRoutes({ prefix: p }: { prefix: string }) {
  return (
    <Switch>
      <Route exact path={`${p}/`} component={Summary} />
      {/*<Route exact path={`${p}/login`} component={Login} />*/}
      <Route exact path={`${p}/news`} component={News} />
      <Route exact path={`${p}/event`} component={Event} />
      <Route exact path={`${p}/donation`} component={Donation} />
      <Route exact path={`${p}/account`} component={Account} />
      <Route exact path={`${p}/request`} component={Request} />
      {/*todo add te routes here */}
      <Route component={NotFound} />
    </Switch>
  )
}
