import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import AsyncLoad from '../../shared/components/async-load/async-load'

// routes
import LayoutDefault from '../../layout-default/layout-default'
import LayoutOrganization from '../../layout-organization/layout-organization'
const NotFound = AsyncLoad(() => import('../../shared/pages/not-found/not-found'))

export default function AppRoutes() {
  return (
    <Switch>
      <Redirect exact path={`/index.html`} to={`/`} />

      <Route exact path={'/'} component={LayoutDefault} />
      <Route exact path={'/organization'} component={LayoutOrganization} />
      <Route component={NotFound} />
    </Switch>
  )
}
