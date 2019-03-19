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

      <Route path={'/organization'} component={LayoutOrganization} />
      <Route path={'/'} component={LayoutDefault} />

      <Route component={NotFound} />
    </Switch>
  )
}
