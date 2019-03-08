import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import AsyncLoad from '../../shared/components/async-load/async-load'

// routes
const NotFound = AsyncLoad(() => import('../../shared/pages/not-found/not-found'))
const Home = AsyncLoad(() => import('../pages/home/home'))
const Login = AsyncLoad(() => import('../pages/login/login'))
const Account = AsyncLoad(() => import('../pages/account/account'))

export default function LayoutDefaultRoutes({ prefix: p }: { prefix: string }) {
  return (
    <Switch>
      <Redirect exact path={`${p}home`} to={`${p}`} />

      <Route exact path={`${p}`} component={Home} />
      <Route exact path={`${p}login`} component={Login} />
      <Route exact path={`${p}account`} component={Account} />

      <Route component={NotFound} />
    </Switch>
  )
}
