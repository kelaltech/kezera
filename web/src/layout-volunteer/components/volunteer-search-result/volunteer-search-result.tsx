import React, { useState, useEffect } from 'react'
import { Tabs } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import { Block } from 'gerami'

import './volunteer-search-result.scss'
import NewsCard from '../../../shared/components/news-card/news-card'
import EventCard from '../../../shared/components/event-card/event-card'
import VolunteerEventCard from '../../components/volunteer-event-card/volunteer-event-card'

function VolunteerSearchResult() {
  let [value, setValue] = useState(0)

  return (
    <div>
      <div className="search-result-container">
        <div>
          <h4>Filter</h4>
        </div>
        <div>
          <Tabs
            value={value}
            onChange={(e, v) => setValue(v)}
            indicatorColor={'primary'}
            textColor={'primary'}
            variant="scrollable"
            //  scrollButtons="auto"
          >
            <Tab label={'All'} />
            <Tab label={'News'} />
            <Tab label={'Event'} />
            <Tab label={'Task'} />
            <Tab label={'Donations'} />
            <Tab label={'Organization'} />
            <Tab label={'Volunteer'} />
          </Tabs>

          {value === 0 && <Block>All</Block>}
          {value === 1 && (
            <Block>
              <NewsSearchResult />
            </Block>
          )}
          {value === 2 && (
            <Block>
              <EventsSearchResult />
            </Block>
          )}
          {value === 3 && (
            <Block>
              <TaskSearchResult />
            </Block>
          )}
          {value === 4 && (
            <Block>
              <DonationSearchResult />
            </Block>
          )}
          {value === 5 && (
            <Block>
              <OrganizationSearchResult />
            </Block>
          )}
          {value === 6 && (
            <Block>
              <VSearchResult />
            </Block>
          )}
        </div>
      </div>
    </div>
  )
}

function NewsSearchResult() {
  const [news, setNews] = useState([])

  useEffect(() => {
    //fetch search result from back
  }, [])
  return (
    <div>
      <h1>News Search result</h1>

      <div>
        {Data.map(n => (
          <Block>
            <NewsCard
              title={n.title}
              likeCount={n.likeCount}
              commentCount={n.commentCount}
              description={n.description}
              imgSrc={n.imgSrc}
              _id={n.id}
            />
          </Block>
        ))}
      </div>
    </div>
  )
}

function EventsSearchResult() {
  return (
    <div>
      <h1>Events Search result</h1>
      <div>

      </div>
    </div>
  )
}

function DonationSearchResult() {
  return (
    <div>
      <h1>Donation Search result</h1>
    </div>
  )
}

function TaskSearchResult() {
  return (
    <div>
      <h1>Task Search result</h1>
    </div>
  )
}

function OrganizationSearchResult() {
  return (
    <div>
      <h1>Organization Search result</h1>
    </div>
  )
}
function VSearchResult() {
  return (
    <div>
      <h1>Volunteer Search result</h1>
    </div>
  )
}

const Data = [
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/300/300/?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/200/300/?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/400/300/?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. A ipsum impedit odit incidunt. Delectus alias nihil minus  ab eligendi nemo earum tempora! Recusandae neque quia error  commodi tempore earum similique? ',
    imgSrc: 'https://picsum.photos/300/300/?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/500?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/300/200/?random',
    id: 'id'
  }
]

export default VolunteerSearchResult
