import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useAccountState } from '../app/stores/account/account-provider'
import DefaultPromotion from '../layout-default/components/default-promotion/default-promotion'
import LayoutOrganizationProviders from './configs/layout-organization-providers'
import Layout from '../shared/components/layout/layout'
import LayoutOrganizationRoutes from './configs/layout-orgainzation-routes'
import layoutDefaultNavigation from '../layout-default/configs/layout-default-navigation'

interface Props extends RouteComponentProps<{}> {
  error?: any
}

export default function LayoutOrganization({ error, match }: Props) {
  const [promo, setPromo] = useState<React.ReactNode>(undefined)

  const userState = useAccountState()

  const ls = window.location.search.toLowerCase() || ''

  useEffect(() => {
    if (window.sessionStorage.getItem('promoSeen') != 'true') {
      setPromo(<DefaultPromotion />)
      window.sessionStorage.setItem('promoSeen', 'true')
    }
  }, [])

  return (
    <LayoutOrganizationProviders>
      <Layout
        noShell={ls.includes('no-shell=') ? ls.includes('no-shell=true') : undefined}
        preHeader={promo}
        headerOptions={{ navigation: layoutDefaultNavigation(!!userState.account) }}
        error={error}
        nonContentHeight={164}
      >
        <LayoutOrganizationRoutes prefix={match.url} />
      </Layout>
    </LayoutOrganizationProviders>
  )
}
