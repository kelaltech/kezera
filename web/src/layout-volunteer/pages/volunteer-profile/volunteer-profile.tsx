import React, { useEffect, useState } from 'react'
import { Block, Card, Content } from 'gerami'
import './volunteer-profile.scss'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { useVolunteerState } from '../../stores/volunteer/volunteer-provider'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import Slider from 'react-slick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faCertificate,
  faParachuteBox,
  faCalendarCheck,
  faToolbox,
  faHandHoldingUsd,
  faTasks,
  faHandHoldingHeart,
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import axios from 'axios'
import EventCard from '../../../shared/components/event-card/event-card'

function Profile() {
  const Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
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
  const { account } = useAccountState()
  const { volunteer } = useVolunteerState()
  const [events, setEvents] = useState([])
  useEffect(() => {
    axios
      .get('/api/event/all')
      .then(events => {
        setEvents(events.data)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <div className={'profile-container'}>
      <Block first />
      <Content className={'general-profile'}>
        <div>
          <div
            style={{
              backgroundImage: `url(${account!.photoUri})`
            }}
            className={'pro-acc-pic-back'}
          />
          <div
            style={{
              backgroundImage: `url(${account!.photoUri})`
            }}
            className={'pro-acc-pic'}
          />
        </div>

        <div>
          <div className={'account-head-display-name'}>
            <span className={'account-head-display-name-text'}>
              {account!.displayName}
            </span>
          </div>
        </div>
        <div className={'pro-general-info'}>
          <div>
            <span>{'Ethiopia'}</span>
            <span>{'22 years old'}</span>
          </div>
          <div>
            <span>{account!.email}</span>
            <span>{account!.phoneNumber}</span>
          </div>
        </div>
      </Content>

      {/*<Block first />*/}

      <Content className={'general-profile'}>
        <div className={'pro-activity-header'}>
          <span>Activities</span>
        </div>

        <div className={'pro-act-stat-cont'}>
          <div className={'pro-stat'}>
            <div>
              <List subheader={<ListSubheader>Achievements</ListSubheader>}>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faCertificate} />
                  </ListItemIcon>
                  <ListItemText primary="Certificate Achieved" />
                  <ListItemSecondaryAction>
                    {volunteer!.portfolio.certificate.length === 0
                      ? '-'
                      : volunteer!.portfolio.certificate.length}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faCalendarCheck} />
                  </ListItemIcon>
                  <ListItemText primary="Event Attended" />
                  <ListItemSecondaryAction>
                    {volunteer!.portfolio.events.length === 0
                      ? '-'
                      : volunteer!.portfolio.events.length}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faTasks} />
                  </ListItemIcon>
                  <ListItemText primary="Task Accomplished" />
                  <ListItemSecondaryAction>
                    {volunteer!.portfolio.tasks.length === 0
                      ? '-'
                      : volunteer!.portfolio.tasks.length}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faToolbox} />
                  </ListItemIcon>
                  <ListItemText primary="Material Donated" />
                  <ListItemSecondaryAction>
                    {volunteer!.portfolio.material.length === 0
                      ? '-'
                      : volunteer!.portfolio.material.length}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faHandHoldingUsd} />
                  </ListItemIcon>
                  <ListItemText primary="Money Donated" />
                  <ListItemSecondaryAction>
                    {volunteer!.portfolio.money.length === 0
                      ? '-'
                      : volunteer!.portfolio.money.length}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faHandHoldingHeart} />
                  </ListItemIcon>
                  <ListItemText primary="Organ Pledged" />
                  <ListItemSecondaryAction>
                    {volunteer!.portfolio.organ.length === 0
                      ? '-'
                      : volunteer!.portfolio.organ.length}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
          </div>
          <div className={'pro-icon-stat'}>
            <span>
              <FontAwesomeIcon icon={faParachuteBox} size={'10x'} />
            </span>
          </div>
        </div>
      </Content>

      {/*<Block first />*/}

      <Content className={'general-profile'}>
        <div className={'pro-activity-header event-header'}>
          <span>Recent Events</span>
        </div>
        <div className={'pro-event-attended'}>
          <Slider {...Settings}>
            <div>Anteneh is Responsible for this :( !</div>
            <div>Anteneh is Responsible for this :( !</div>
            <div>Anteneh is Responsible for this :( !</div>
            {/*  {events.map(e => (
              <div>
                <Block>
                  <EventCard event={e} />
                </Block>
              </div>
            ))}*/}
          </Slider>
        </div>
      </Content>

      {/*<Block first />*/}

      <Content className={'general-profile'}>
        <div className={'pro-activity-header '}>
          <span>Certificates</span>
        </div>
      </Content>
    </div>
  )
}

export default Profile
