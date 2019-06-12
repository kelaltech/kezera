import React, { useEffect, useState } from 'react'
import './volunteer-discovery.scss'
import axios from 'axios'
import PropTypes from 'prop-types'
import NewsCard from '../../../shared/components/news-card/news-card'

import EventCard from '../../../shared/components/event-card/event-card'
import Slider from 'react-slick'
import RequestCard from '../../../shared/components/request/request-card'
import { Block } from 'gerami'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { richTextToDisplayText } from '../../../lib/richTextConverter'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

function DiscoveryPage() {
  const { loading, t } = useLocale(['volunteer-discovery'])
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
  const settingsNews = { infinite: news.length > 2 }
  const settingsOrganization = { infinite: organization.length > 2 }
  const settingsRequest = { infinite: request.length > 2 }
  const settingsEvents = { infinite: event.length > 2 }
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
      .get('/api/request/list')
      .then((r: any) => {
        setRequest(r.data)
      })
      .catch(e => console.log(e))
  }
  return (
    loading || (
      <RichPage
        title={t`volunteer-discovery:title`}
        description={t`volunteer-discovery:description`}
      >
        <div className={'discovery-container'}>
          <div className={'discovery-result-container'}>
            <div>
              <h2>{t`volunteer-discovery:news`}</h2>
              <div className={'dis-slider'}>
                {news.length === 0 ? (
                  <Block
                    className={'fg-blackish'}
                  >{t`volunteer-discovery:no-news`}</Block>
                ) : (
                  <div>
                    {t`volunteer-discovery:most-recent`}
                    <Slider {...settings} {...settingsNews}>
                      {news.map((n: any) => (
                        <div className={'slider-list'}>
                          <NewsCard
                            _id={n._id}
                            shareCount={n.share.length}
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
              <h2>{t`volunteer-discovery:event`}</h2>
              <div className={'dis-slider'}>
                {event.length === 0 ? (
                  <Block
                    className={'fg-blackish'}
                  >{t`volunteer-discovery:no-events`}</Block>
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
              <h2>{t`volunteer-discovery:organizations`}</h2>
              <div className={'dis-slider dis-sli-event'}>
                {organization.length === 0 ? (
                  <Block
                    className={'fg-blackish'}
                  >{t`volunteer-discovery:no-organizations`}</Block>
                ) : (
                  <Slider {...settings} {...settingsOrganization}>
                    {organization.map((o: any) => (
                      <div className={'slider-list'}>
                        <OrganizationCard className={'block'} organization={o} />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
            <div className={'result-request'}>
              <h2>{t`volunteer-discovery:request`}</h2>
              <div className={'dis-slider'}>
                {request.length === 0 ? (
                  <Block
                    className={'fg-blackish'}
                  >{t`volunteer-discovery:no-requests`}</Block>
                ) : (
                  <Slider {...settings} {...settingsRequest}>
                    {request.map((r: any) => (
                      <div className={'slider-list'}>
                        <RequestCard request={r} />
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
  )
}
DiscoveryPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default DiscoveryPage
