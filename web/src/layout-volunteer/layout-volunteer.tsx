import React, { Suspense } from 'react'
import { RouteComponentProps } from 'react-router'
import { Loading } from 'gerami'
import * as qs from 'qs'
import Search from '../shared/components/search/search'

import useLocale from '../shared/hooks/use-locale/use-locale'
import { useAccountState } from '../app/stores/account/account-provider'
import LayoutVolunteerProviders from './configs/layout-volunteer-providers'
import Layout from '../shared/components/layout/layout'
import layoutVolunteerNavigation from './configs/layout-volunteer-navigation'
import LayoutVolunteerRoutes from './configs/layout-volunteer-routes'

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
        headerOptions={{ navigation: layoutVolunteerNavigation(t, account) ,centerNode: <Search to={'/volunteer/search-result'}/>}}
        error={error}
        nonContentHeight={164}

      >
        <Suspense fallback={<Loading delay />}>
          <LayoutVolunteerRoutes prefix={match.url.replace(/\/$/, '')} />
        </Suspense>
      </Layout>
    </LayoutVolunteerProviders>
  )
}

export default LayoutVolunteer
