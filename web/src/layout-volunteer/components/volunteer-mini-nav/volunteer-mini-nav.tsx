import React from 'react'

import './volunteer-mini-nav.scss'
import { Button } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarCheck,
  faNewspaper,
  faSuitcase,
  faTasks
} from '@fortawesome/free-solid-svg-icons'

export default function MiniNav() {
  return (
    <div>
      <div className={'mini-sidenav-container'}>
        <div className={'mini-sidenav-links'}>
          <div className={'sid-link'}>
            <span className={'icon-link discovery '}>
              <a title={'discover'} href="/discovery">
                <FontAwesomeIcon icon={faNewspaper} />
              </a>
            </span>
          </div>
          <div className={'sid-link'}>
            <span className={'icon-link discovery '}>
              <a title={'news'} href="/news">
                <FontAwesomeIcon icon={faNewspaper} />
              </a>
            </span>
          </div>
          <div className={'sid-link'}>
            <span className={'icon-link event '}>
              <a title={'events'} href="/events">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </a>
            </span>
          </div>
          <div className={'sid-link'}>
            <span className={'icon-link task '}>
              <a title={'tasks'} href="/tasks">
                <FontAwesomeIcon icon={faTasks} />
              </a>
            </span>
          </div>
          <div className={'sid-link'}>
            <span className={'icon-link organization '}>
              <a title={'organizations'} href="/my-organization">
                <FontAwesomeIcon icon={faSuitcase} />
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
