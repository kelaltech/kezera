import React from 'react'

import './volunteer-mini-nav.scss'
import { Button } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarCheck,
  faNewspaper,
  faSuitcase,
  faTasks,
  faSearchPlus
} from '@fortawesome/free-solid-svg-icons'

export default function MiniNav() {
  return (
    <div>
      <div className={'mini-sidenav-container'}>
        <div className={'mini-sidenav-links'}>
          <div title={'discover'} className={'sid-link'}>
            <span className={'fg-blackish icon-link discovery '}>
              <a href="/">
                <FontAwesomeIcon icon={faSearchPlus} />
              </a>
            </span>
          </div>
          <div title={'news'} className={'sid-link'}>
            <span className={'fg-blackish icon-link discovery '}>
              <a href="/news">
                <FontAwesomeIcon icon={faNewspaper} />
              </a>
            </span>
          </div>
          <div title={'events'} className={'sid-link'}>
            <span className={'fg-blackish icon-link event '}>
              <a href="/events">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </a>
            </span>
          </div>
          <div title={'tasks'} className={'sid-link'}>
            <span className={' fg-blackish icon-link task '}>
              <a href="/tasks">
                <FontAwesomeIcon icon={faTasks} />
              </a>
            </span>
          </div>
          <div title={'organizations'} className={'sid-link'}>
            <span className={'fg-blackish icon-link organization '}>
              <a href="/my-organization">
                <FontAwesomeIcon icon={faSuitcase} />
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
