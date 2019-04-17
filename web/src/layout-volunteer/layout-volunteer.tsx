import React from 'react'
import { RouteComponentProps } from 'react-router'
import * as qs from 'qs'

import useLocale from '../shared/hooks/use-locale/use-locale'
import { useAccountState } from '../app/stores/account/account-provider'
import LayoutVolunteerProviders from './configs/layout-volunteer-providers'
import Layout from '../shared/components/layout/layout'
import layoutVolunteerNavigation from './configs/layout-volunteer-navigation'
import LayoutVolunteerRoutes from './configs/layout-volunteer-routes'
import Search from '../shared/components/search/search'
import './layout-volunteer.scss'
import Sidenav from '../shared/components/volunteer-side-nav/side-nav'
interface Props extends RouteComponentProps<{}> {
  error?: any
}

function LayoutVolunteer({ error, match }: Props) {
  const { t } = useLocale()
  const { account } = useAccountState()

  const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })['no-shell']
  const noShell = q ? q == 'true' : undefined

  return (
    <LayoutVolunteerProviders>
      <Layout
        noShell={noShell}
        preHeader={null}
        headerOptions={{
          navigation: layoutVolunteerNavigation(t, account),
          centerNode: <Search to={'/volunteer/search-result'} />
        }}
        error={error}
        nonContentHeight={164}
      >
        <div className={'volunteer-layout-container'}>
          <div className={'vol-sidenav-container'}>
            <Sidenav />
          </div>
          <div className={'vol-content-container'}>
            <LayoutVolunteerRoutes prefix={match.url.replace(/\/$/, '')} />
          </div>
        </div>
      </Layout>
    </LayoutVolunteerProviders>
  )
}

export default LayoutVolunteer
