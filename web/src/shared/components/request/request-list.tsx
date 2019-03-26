import React from 'react'
import { Page, Yoga } from 'gerami'

import RequestCard from '../../../shared/components/request/request-card'
import promo from '../../../assets/images/login/promo-1.jpg'

export default function Request() {
  return (
    <Page>
      <Yoga maxCol={2}>
        <RequestCard />
      </Yoga>
    </Page>
  )
}
