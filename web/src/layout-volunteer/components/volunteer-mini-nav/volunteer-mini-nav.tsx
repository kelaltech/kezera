import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarCheck,
  faNewspaper,
  faSuitcase,
  faTasks,
  faSearchPlus
} from '@fortawesome/free-solid-svg-icons'

import './volunteer-mini-nav.scss'

export default function MiniNav() {
  return (
    <div>
      <div className={'mini-sidenav-container'}>
        <div className={'mini-sidenav-links'}>
          <div title={'discover'} className={'sid-link'}>
            <span className={'fg-blackish icon-link discovery '}>
              <Link to="/">
                <FontAwesomeIcon icon={faSearchPlus} />
              </Link>
            </span>
          </div>
          <div title={'news'} className={'sid-link'}>
            <span className={'fg-blackish icon-link discovery '}>
              <Link to="/news">
                <FontAwesomeIcon icon={faNewspaper} />
              </Link>
            </span>
          </div>
          <div title={'events'} className={'sid-link'}>
            <span className={'fg-blackish icon-link event '}>
              <Link to="/events">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </Link>
            </span>
          </div>
          <div title={'tasks'} className={'sid-link'}>
            <span className={' fg-blackish icon-link task '}>
              <Link to="/tasks">
                <FontAwesomeIcon icon={faTasks} />
              </Link>
            </span>
          </div>
          <div title={'organizations'} className={'sid-link'}>
            <span className={'fg-blackish icon-link organization '}>
              <Link to="/my-organization">
                <FontAwesomeIcon icon={faSuitcase} />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
