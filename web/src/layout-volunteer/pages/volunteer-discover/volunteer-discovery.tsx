import React, { useEffect, useState } from 'react'
import './volunteer-discovery.scss'
import axios from 'axios'
import PropTypes from 'prop-types'
import NewsCard from '../../../shared/components/news-card/news-card'
import { Input } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import EventCard from '../../../shared/components/event-card/event-card'
import Slider from 'react-slick'
import RequestCard from '../../../shared/components/request/request-card'
import { Block, Yoga } from 'gerami'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { richTextToDisplayText } from '../../../lib/richTextConverter'

function DiscoveryPage() {
  const [news, setNews] = useState([])
  const [event, setEvent] = useState([])
  const [organization, setOrganization] = useState([])
  const [request, setRequest] = useState([])

  const settings = {
    infinite: true,
    slidesToShow: 3,
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
  const settingsNews = { infinite: news.length > 1 }
  const settingsOrganization = { infinite: organization.length > 1, slidesToShow: 1 }
  const settingsRequest = { infinite: request.length > 1 }
  const settingsEvents = { infinite: event.length > 1 }
  useEffect(() => {
    fetchOrganization()
    fetchEvent()
    fetchNews()
    fetchRequest()
  }, [])

  const fetchEvent = () => {
    axios
      .get('/api/event/recent?count=5')
      .then((event: any) => {
        setEvent(event.data)
      })
      .catch(e => console.log(e))
  }
  const fetchNews = () => {
    axios
      .get('/api/news/recent?count=5')
      .then((news: any) => {
        setNews(richTextToDisplayText(news.data))
      })
      .catch(e => console.log(e))
  }
  const fetchOrganization = () => {
    axios
      .get('/api/organization/search?count=5')
      .then((o: any) => {
        setOrganization(o.data)
      })
      .catch(e => console.log(e))
  }
  const fetchRequest = () => {
    axios
      .get('/api/request/recent?count=5')
      .then((r: any) => {
        setRequest(r.data)
      })
      .catch(e => console.log(e))
  }
  return (
    <RichPage title={'Discovery'} description={'discover the wold of SPVA'} >
      <div className={'discovery-container'}>
        <div className={'discovery-result-container'}>
          <div>
            <h2>News</h2>
            <div className={'dis-slider'}>
              {news.length === 0 ? (
                <Block className={'fg-blackish'}>There is no News ..!</Block>
              ) : (
                <div>
                  Most recent...
                  <Slider {...settings} {...settingsNews}>
                    {news.map((n: any) => (
                      <div className={'slider-list'}>
                        <NewsCard
                          _id={n._id}
                          commentCount={n.comments.length}
                          imgSrc={`/api/news/${n._id}/pic`}
                          title={n.title}
                          likeCount={n.likes.length}
                          description={n.description}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          </div>
          <div className={'result '}>
            <h2>Event</h2>
            <div className={'dis-slider'}>
              {event.length === 0 ? (
                <Block className={'fg-blackish'}>There are no events ..!</Block>
              ) : (
                <Slider {...settings} {...settingsEvents}>
                  {event.map((n: any) => (
                    <div className={'slider-list'}>
                      <EventCard event={n} />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
          <div className={'result'}>
            <h2>Organization</h2>
            <div className={'dis-slider dis-sli-event'}>
              {organization.length === 0 ? (
                <Block className={'fg-blackish'}>There are no organizations ..!</Block>
              ) : (
                <Slider {...settings} {...settingsOrganization}>
                  <div className={'slider-list'}>
                    {organization.map((o: any) => (
                      <OrganizationCard organization={o} />
                    ))}
                  </div>
                </Slider>
              )}
            </div>
          </div>
          <div className={'result-request'}>
            <h2>Request</h2>
            <div className={'dis-slider'}>
              {request.length === 0 ? (
                <Block className={'fg-blackish'}>There are no requests ..!</Block>
              ) : (
                <Slider {...settings} {...settingsRequest}>
                  {request.map((r: any) => (
                    <div className={'slider-list'}>
                      <RequestCard {...r} />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </RichPage>
  )
}
DiscoveryPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default DiscoveryPage
