import React from 'react'
import { Page, Yoga } from 'gerami'

import RequestCard from '../../../shared/components/request/request-card'
import promo from '../../../assets/images/login/promo-1.jpg'

export default function Request() {
  const data = [
    {
      _id: '1',
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
      _id: '2',
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
      _id: '3',
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
      _id: '4',
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
          <RequestCard {...request} />
        ))}
      </Yoga>
    </Page>
  )
}
