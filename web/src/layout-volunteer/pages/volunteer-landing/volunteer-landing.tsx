import React from 'react'

import './volunteer-landing.scss'
function Landing() {
  return (
    <div className={'landing-container'}>
      <div className={'intro-svg'} />
      <div className={'intro-card-top-svg'} />

      <div className={'vol-cards-container'}>
        <div className={'vol-cards donate-card'} />
        <div className={'vol-cards material-card'} />
        <div className={'vol-cards task-card'} />
        <div className={'vol-cards news-card'} />
      </div>
    </div>
  )
}

export default Landing
