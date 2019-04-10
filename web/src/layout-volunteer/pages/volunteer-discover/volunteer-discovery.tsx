import React, { useEffect, useState } from 'react'
import './volunteer-discovery.scss'
import axios from 'axios'
import { Block } from 'gerami'
import PropTypes from 'prop-types'
import NewsCard from '../../../shared/components/news-card/news-card'
import { Input } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import newsTemp from '../../../assets/images/news-temp.jpg'
import EventCard from '../../../shared/components/event-card/event-card'
import OrganizationCard from '../../components/volunteer-my-organization/volunteer-my-organizattion'
import logo from '../../../assets/images/kelal-tech-logo.svg'
import tempNews from '../../../assets/images/news-temp.jpg'
import Slider from 'react-slick'
import RequestCard from '../../../shared/components/request/request-card'

const settings = {
  infinite: true,
  slidesToShow: 4,
  speed: 500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}
function DiscoveryPage() {
  const [news, setNews] = useState([])
  const [event, setEvent] = useState([])
  const [organization, setOrganization] = useState([])
  const [request, setRequest] = useState([])

  useEffect(() => {
    fetchOrganization()
    fetchEvent()
    fetchNews()
    fetchRequest()
  }, [])

  const fetchEvent = () => {
    axios
      .get('/api/event/recent')
      .then((event: any) => {
        setEvent(event.data)
      })
      .catch(e => console.log(e))
  }
  const fetchNews = () => {
    axios
      .get('/api/news/recent')
      .then((news: any) => {
        setNews(news.data)
      })
      .catch(e => console.log(e))
  }
  const fetchOrganization = () => {
    axios
      .get('/api/organization/recent')
      .then((o: any) => {
        setOrganization(o.data)
      })
      .catch(e => console.log(e))
  }
  const fetchRequest = () => {
    axios
      .get('/api/request/recent')
      .then((r: any) => {
        setRequest(r.data)
      })
      .catch(e => console.log(e))
  }
  return (
    <div>
      <div className={'discovery-container'}>
        <div className={'discovery-search-box'}>
          <div className={'discovery-search'}>
            <div className={'search-box'}>
              <Input
                type={'type'}
                disableUnderline={true}
                autoComplete={'something'}
                placeholder={'Search'}
              />
              <span>
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
        </div>

        <div className={'discovery-result-container'}>
          <div>
            <h1>News</h1>
            <div className={'dis-slider'}>
              <Slider {...settings}>
                {news.map((n: any) => (
                  <div className={'slider-list'}>
                    <NewsCard {...n} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className={'result '}>
            <h1>Event</h1>
            <div className={'dis-slider'}>
              <Slider {...settings}>
                {event.map((n: any) => (
                  <div className={'slider-list'}>
                    <EventCard event={n} role={'ORGANIZATION'} fetch={() => {}} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className={'result'}>
            <h1>Organization</h1>
            <div className={'dis-slider'}>
              <Slider {...settings}>
                {organization.map((o: any) => (
                  <div className={'slider-list'}>
                    <OrganizationCard {...o} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className={'result-request'}>
            <h1>Request</h1>
            <div className={'dis-slider'}>
              <Slider {...settings}>
                {request.map((r: any) => (
                  <div className={'slider-list'}>
                    <RequestCard {...r} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
DiscoveryPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default DiscoveryPage

/*
const data = [
  {
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
    coverImg: logo,
    profileImg: tempNews,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!',
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
    coverImg: logo,
    profileImg: tempNews,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!',
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
]*/
