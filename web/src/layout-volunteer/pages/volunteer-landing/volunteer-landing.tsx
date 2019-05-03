import React from 'react'

import './volunteer-landing.scss'
import {
  faHandHoldingUsd,
  faArrowAltCircleDown,
  faToolbox,
  faCalendarCheck,
  faTasks,
  faHandHoldingHeart
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Content, Yoga, Button, Block } from 'gerami'
import LandingCard from './components/landing-card/landing-card'
import LandingCard2 from './components/landing-card-2/landing-card-2'
import CircularStat from './components/statistics/circular-stat'
// import { Button } from '@material-ui/core'
function Landing() {
  return (
    <div className={'landing-container'}>
      <div className={'top-hero-section'}>
        <div className={'hero-content'}>
          <div className={'hero-slogan'}>
            <Block>
              <h1>Love Humanity Love Voluntary Love us!</h1>
            </Block>
          </div>
        </div>
        <Content size={'S'} className={'card-top-container'}>
          <h1>Social</h1>
          <h1>Platform</h1>
          <h1>For</h1>
          <h1>Voluntary</h1>
          <h1>Actions</h1>
        </Content>
      </div>
      <div className={'l-volunteer-activities'}>
        <div className={'l-right-card'}>
          <LandingCard
            icon={faHandHoldingUsd}
            title={'Money'}
            actionTo={'/login'}
            actionName={'Donate'}
          />
          <LandingCard
            icon={faToolbox}
            title={'Material'}
            actionTo={'/login'}
            actionName={'Donate'}
          />
        </div>
        <div className={'l-center-text'}>
          <span>
            <h2>V</h2>
          </span>
          <span>
            <h2>O</h2>
          </span>
          <span>
            <h2>L</h2>
          </span>
          <span>
            <h2>N</h2>
          </span>
          <span>
            <h2>T</h2>
          </span>
          <span>
            <h2>E</h2>
          </span>
          <span>
            <h2>E</h2>
          </span>
          <span>
            <h2>R</h2>
          </span>
        </div>
        <div className={'l-left-card'}>
          <LandingCard
            icon={faTasks}
            title={'Tasks'}
            actionTo={'/login'}
            actionName={'Volunteer'}
          />
          <LandingCard
            icon={faHandHoldingHeart}
            title={'Organ'}
            actionTo={'/login'}
            actionName={'Pledge'}
          />
        </div>
      </div>

      <div className={'l-organization-hero'}>
        <h1>Get the latest News and Events!</h1>
      </div>

      <div className={'l-org-activity'}>
        <LandingCard2
          className={'l2-card-news'}
          description={'News updates from all organizations'}
          title={'News'}
          actionTo={'/login'}
          actionName={'Read more'}
        />
        <LandingCard2
          description={'Filtered Events based on your location and more'}
          title={'Events'}
          actionTo={'/login'}
          actionName={'Explore'}
        />
      </div>

      <div className={'l-stat-cont'}>
        <CircularStat count={'300'} title={'Events'} />
        <CircularStat count={'+12,300'} title={'Donations'} />
        <CircularStat count={'150'} title={'Organizations'} />
        <CircularStat count={'+1000'} title={'Volunteers'} />
      </div>

      <div className={'l-d-app'}>
        <div className={'l-d-title'}>
          <h1>For volunteers like you</h1>
          <p>Download the App and join the world of SPVA!</p>
        </div>

        <div className={'l-d-banner'}>
          <div className={'l-d-b-title'}>
            <h1>Start Volunteering today</h1>
            <p>by downloading the app..</p>
          </div>
          <Button className={'l-d-b-btn-cont'}>
            Download &nbsp;
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Landing
