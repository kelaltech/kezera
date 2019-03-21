import React from 'react'
import { Block, Content, Page, Yoga } from 'gerami'

import RequestCard from '../../../shared/components/request/request-card'
import NewsTemp from '../../../assets/images/news-temp.jpg'

export default function Request() {
  const data = [
    {
      title: 'Teaching of Disabled Children',
      description:
        'The president has promised 3 percent growth for the next decade, but a new\n' +
        '              report indicates that won’t happen without a big infrastructure bill, more\n' +
        '              tax cuts and additional deregulation, the House.',
      image: `${NewsTemp}`,
      startDate: 5 / 10 / 2019,
      endDate: 5 / 30 / 2019
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
