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
import OrganizationCard from '../../components/volunteer-my-organization/volunteer-my-organizattion'
import logo from '../../../assets/images/kelal-tech-logo.svg'
import tempNews from '../../../assets/images/news-temp.jpg'

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
          <div className={'result'}>
            <h1>News</h1>
            <div className={'result-news'}>
              {
                Data.map((n:any)=>(
                  <NewsCard
                    style={{
                      margin: '1px 3px'
                    }}
                    {...n}/>
                ))
              }
            </div>
          </div>
          <div className={'result '}>
            <h1>Event</h1>
            <div className={'result-event'}>
              {
                event.map((n:any)=>(
                    <EventCard event={n} role={'ORGANIZATION'} fetch={() => {}} />
                ))
              }
            </div>
          </div>
          <div className={'result'}>
            <h1>Organization</h1>
            <div className={'result-organization'}>
              {
                data.map((o:any)=>(
                  <OrganizationCard {...o} />
                ))
              }
            </div>
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

const data = [{
  coverImg: tempNews,
  profileImg: tempNews,
  name: 'Marry Joy International',
  type: 'Ngo',
  motto: 'More Heart More Impact!,Humanity Movement',
  location: 'Addis Ababa, Megegnagna',
  website: 'https://merryjoy.org'
},
  {
    coverImg: logo,
    profileImg: tempNews,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!',
    location: 'Addis Ababa, Megegnagna',
    website: 'https://merryjoy.org'
  },
  {
    coverImg: tempNews,
    profileImg: logo,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!',
    location: 'Addis Ababa, Megegnagna',
    website: 'https://merryjoy.org'
  }
]