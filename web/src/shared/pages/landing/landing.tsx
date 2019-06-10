import React from 'react'
import {
  faHandHoldingUsd,
  faArrowAltCircleDown,
  faToolbox,
  faTasks,
  faHandHoldingHeart
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Content, Button, Block } from 'gerami'

import './landing.scss'
import LandingCard from './components/landing-card/landing-card'
import LandingCard2 from './components/landing-card-2/landing-card-2'
import CircularStat from './components/statistics/circular-stat'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

function Landing() {
  const { loading, t } = useLocale(['landing'])
  return (
    loading || (
      <div className={'landing-container'}>
        <div className={'top-hero-section'}>
          <div className={'hero-content'}>
            <div className={'hero-slogan'}>
              <Block>
                <h1>{t`landing:motto`}</h1>
              </Block>
            </div>
          </div>
          <Content size={'S'} className={'card-top-container'}>
            <h1>{t`landing:social`}</h1>
            <h1>{t`landing:platform`}</h1>
            <h1>{t`landing:for`}</h1>
            <h1>{t`landing:voluntary`}</h1>
            <h1>{t`landing:actions`}</h1>
          </Content>
        </div>
        <div className={'l-volunteer-activities'}>
          <div className={'l-right-card'}>
            <LandingCard
              icon={faHandHoldingUsd}
              title={t`landing:card-title-money`}
              actionTo={'/login'}
              actionName={t`landing:action-donate`}
            />
            <LandingCard
              icon={faToolbox}
              title={t`landing:card-title-material`}
              actionTo={'/login'}
              actionName={t`landing:action-donate`}
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
              <h2>U</h2>
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
              title={t`landing:card-title-task`}
              actionTo={'/login'}
              actionName={t`landing:action-volunteer`}
            />
            <LandingCard
              icon={faHandHoldingHeart}
              title={t`landing:card-title-organ`}
              actionTo={'/login'}
              actionName={t`landing:action-pledge`}
            />
          </div>
        </div>

        <div className={'l-organization-hero'}>
          <h1>{t`landing:hero-2-title`}</h1>
        </div>

        <div className={'l-org-activity'}>
          <LandingCard2
            className={'l2-card-news'}
            description={t`landing:org-activity-n-description`}
            title={t`landing:org-activity-n-title`}
            actionTo={'/login'}
            actionName={t`landing:org-activity-n-action`}
          />
          <LandingCard2
            description={t`landing:org-activity-e-description`}
            title={t`landing:org-activity-e-title`}
            actionTo={'/login'}
            actionName={t`landing:org-activity-n-action`}
          />
        </div>

        <div className={'l-stat-cont'}>
          <CircularStat count={'300'} title={t`landing:stat-e-title`} />
          <CircularStat count={'+12,300'} title={t`landing:stat-d-title`} />
          <CircularStat count={'150'} title={t`landing:stat-o-title`} />
          <CircularStat count={'+1000'} title={t`landing:stat-v-title`} />
        </div>

        <div className={'l-d-app'}>
          <div className={'l-d-title'}>
            <h1>{t`landing:for-volunteers`}</h1>
            <p>{t`landing:download-motto`}</p>
          </div>

          <div className={'l-d-banner'}>
            <div className={'l-d-b-title'}>
              <h1>{t`landing:start-volunteering`}</h1>
              <p>{t`landing:downloading`}</p>
            </div>
            <Button className={'l-d-b-btn-cont'}>
              {t`landing:download-btn`}&nbsp;
              <FontAwesomeIcon icon={faArrowAltCircleDown} />
            </Button>
          </div>
        </div>
      </div>
    )
  )
}

export default Landing
