import React, { useState } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Sidenav from '../shared/components/volunteer-side-nav/side-nav'
import MiniNav from './components/volunteer-mini-nav/volunteer-mini-nav'
import { Page } from 'gerami'
import LayoutVolunteerSidenavProviders from './configs/layout-vlunteer-sidenav-priovider'
interface Props extends RouteComponentProps<{}> {
  error?: any
}

function LayoutVolunteer({ error, match }: Props) {
  const { t } = useLocale()
  const { account } = useAccountState()

  const [iconRight, setIcon] = useState(false)
  const [mini, setMini] = useState(false)
  const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })['no-shell']
  const noShell = q ? q == 'true' : undefined

  const handleSidenavWidth = () => {
    const sidenav = document.getElementById('sidenav-vol')
    if (sidenav!.style.width == '220px') {
      sidenav!.style.width = '50px'
      setMini(true)
      setIcon(true)
    } else {
      sidenav!.style.width = '220px'
      setMini(false)
      setIcon(false)
    }
  }

  return (
    <LayoutVolunteerProviders>
      <LayoutVolunteerSidenavProviders>
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
            <div className={'vol-sidenav-container'} id={'sidenav-vol'}>
              <Sidenav />
            </div>
            <div className={'vol-content-container'}>
              <LayoutVolunteerRoutes prefix={match.url.replace(/\/$/, '')} />
            </div>
          </div>
        </Layout>
      </LayoutVolunteerSidenavProviders>
    </LayoutVolunteerProviders>
  )
}

export default LayoutVolunteer

/*
*   <div className={'arrow-sidenav'} onClick={handleSidenavWidth}>
              <span>
                {iconRight ? (
                  <FontAwesomeIcon icon={faChevronLeft} />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} />
                )}
              </span>
            </div>
            {mini ? <MiniNav /> : <Sidenav />}*/
