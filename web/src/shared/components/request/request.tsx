import React from 'react'
import { Block, Content, Page, Yoga } from 'gerami'

import RequestCard from '../../../shared/components/request/request-card'
import promo from '../../../assets/images/login/promo-1.jpg'

export default function Request() {
  const data = [
    {
      title: 'Teaching of Disabled Children',
      description:
        'The president has promise decade, but a new' +
        '               without a big infrastructure bill, more' +
        '              tax cuts and additional deregulation, the House.',
      image: `${promo}`,
      startDate: 2019,
      endDate: 2021
    },
    {
      title: 'Teaching of Disabled Children',
      description:
        'The president has promise decade, but a new' +
        '               without a big infrastructure bill, more' +
        '              tax cuts and additional deregulation, the House.',
      image: `${promo}`,
      startDate: 2019,
      endDate: 2021
    },
    {
      title: 'Teaching of Disabled Children',
      description:
        'The president has promise decade, but a new' +
        '               without a big infrastructure bill, more' +
        '              tax cuts and additional deregulation, the House.',
      image: `${promo}`,
      startDate: 2019,
      endDate: 2021
    },
    {
      title: 'Teaching of Disabled Children',
      description:
        'The president has promise decade, but a new' +
        '               without a big infrastructure bill, more' +
        '              tax cuts and additional deregulation, the House.',
      image: promo,
      startDate: 2019,
      endDate: 2021
    }
  ]
  return (
    <Page>
      <Yoga maxCol={2}>
        {data.map(request => (
          <RequestCard
            image={request.image}
            title={request.title}
            description={request.description}
            startDate={request.startDate}
            endDate={request.endDate}
          />
        ))}
      </Yoga>
    </Page>
  )
}
