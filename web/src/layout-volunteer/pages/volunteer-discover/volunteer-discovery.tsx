import React, { useEffect, useState } from 'react'
import './volunteer-discovery.scss'
import axios from 'axios'
import {Block} from 'gerami'
import PropTypes from 'prop-types';
import NewsCard from '../../../shared/components/news-card/news-card'
import { Input } from '@material-ui/core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch} from  '@fortawesome/free-solid-svg-icons'

import newsTemp from '../../../assets/images/news-temp.jpg'
import EventCard from '../../../shared/components/event-card/event-card'

function DiscoveryPage() {
  const [term, setTerm] = useState()
  const [news, setNews] = useState([])
  const [event, setEvent] = useState([])
  const handleSearchChange = (e:any)=>{
    setTerm(e.target.value)
  }
  useEffect(()=>{
    axios
      .get('/api/news/all')
      .then((news:any)=>{
        setNews(news.data)
      })
      .catch(e=>console.log(e))

    axios
      .get('/api/event/all')
      .then((event:any)=>{
        setEvent(event.data)
      })
      .catch(e=>console.log(e))
  },[])
  return (

    <div>
      <div className={'discovery-container'}>
        <div className={'discovery-search-box'}>
          <div className={'discovery-search'}>
            <div
             className={'search-box'}
            >
              <Input
                type={'type'}
                disableUnderline={true}
                autoComplete={'something'}
                placeholder={'Search'}
                onChange={handleSearchChange}
              />
              <span>
                <FontAwesomeIcon icon={faSearch}/>
              </span>
            </div>
          </div>
        </div>

        <div className={'discovery-result-container'}>
          <div className={'result result-news'}>
            <h1>News</h1>
            <div>
              {
                Data.map((n:any)=>(
                  <div>
                  <NewsCard
                    {...n}/>
                  </div>
                ))
              }
            </div>
          </div>
          <div className={'result result-event'}>
            <h1>Event</h1>
            <div>
              {
                event.map((n:any)=>(
                  <div>
                    <EventCard event={n} role={'ORGANIZATION'} fetch={() => {}} />
                  </div>
                ))
              }
            </div>
          </div>
          <div className={'result-organization'}>
            <h1>Organization</h1>
          </div>
          <div className={'result-request'}>
            <h1>Request</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
DiscoveryPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default DiscoveryPage

const Data = [
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: newsTemp,
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: newsTemp,
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: newsTemp,
    id: 'id'
  }
]