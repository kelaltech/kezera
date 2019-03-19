import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'

import Layout from '../shared/components/layout/layout'
import LayoutDefaultProviders from './configs/layout-default-providers'
import layoutDefaultNavigation from './configs/layout-default-navigation'
import LayoutDefaultRoutes from './configs/layout-default-routes'
import { useAccountState } from '../app/stores/account/account-provider'
import DefaultPromotion from './components/default-promotion/default-promotion'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

export default function LayoutDefault({ error, match }: Props) {
  const [promo, setPromo] = useState<React.ReactNode>(undefined)

  const accountState = useAccountState()

  const ls = window.location.search.toLowerCase() || ''

  useEffect(() => {
    if (window.sessionStorage.getItem('promoSeen') != 'true') {
      setPromo(<DefaultPromotion />)
      window.sessionStorage.setItem('promoSeen', 'true')
    }
  }, [])

  return (
    <LayoutDefaultProviders>
      <Layout
        noShell={ls.includes('no-shell=') ? ls.includes('no-shell=true') : undefined}
        preHeader={promo}
        headerOptions={{ navigation: layoutDefaultNavigation(!!accountState.user) }}
        error={error}
        nonContentHeight={164}
      >
        <LayoutDefaultRoutes prefix={match.url} />
      </Layout>
    </LayoutDefaultProviders>
  )
}
