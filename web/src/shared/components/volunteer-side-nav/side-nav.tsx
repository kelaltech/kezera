import React, { useState } from 'react'

import './side-nav.scss'
import { Button } from 'gerami'
import { Collapse } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNewspaper,
  faCalendarCheck,
  faTasks,
  faSuitcase,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons'
import MiniNav from '../../../layout-volunteer/components/volunteer-mini-nav/volunteer-mini-nav'
import { async } from 'q'

function Sidenav(props: any) {
  const [mini, setMini] = useState(false)
  const [open, setOpen] = useState({
    task: false,
    organization: false
  })
  const handleTaskExpand = () => {
    setOpen({ ...open, ['task']: !open.task })
  }
  const handleOrganizationExpand = () => {
    setOpen({ ...open, ['organization']: !open.organization })
  }

  const handleSideNavWidth = () => {
    setMini(!mini)
  }

  return (
    <div
      className={`sidenav-container ${mini ? 'mini-width' : 'wide-width'}`}
      id={'sidenav-vol'}
    >
      {mini ? (
        <MiniNav />
      ) : (
        <div>
          <div className={'btn-link'}>
            <Button to={'/requests'}>Donate!</Button>
          </div>
          <div className={'sidenav-links'}>
            <div className={'sid-link'}>
              <a href="/discovery" className={'a'}>
                <span className={'icon-link discovery '}>
                  <FontAwesomeIcon icon={faNewspaper} />
                </span>
                <span>Discover</span>
              </a>
            </div>
            <div className={'sid-link'}>
              <a href="/news" className={'a'}>
                <span className={'icon-link news'}>
                  <FontAwesomeIcon icon={faNewspaper} />
                </span>
                <span>News</span>
              </a>
            </div>
            <div className={'sid-link'}>
              <a href="/events" className={'a'}>
                <span className={'icon-link event'}>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                </span>
                <span>Events</span>
              </a>
            </div>
            <div className={'sid-link'} onClick={handleTaskExpand}>
              <a href="/tasks" className={'a'}>
                <span className={'icon-link task'}>
                  <FontAwesomeIcon icon={faTasks} />
                </span>
                <span>Tasks</span>
              </a>
            </div>
            <div className={'sid-link-sub'}>
              <Collapse in={open.task} timeout="auto" unmountOnExit>
                <div className={'task-sub-title'}>
                  <h5>pending tasks</h5>
                </div>
                <hr />
                <div className={'task-sub-links'}>
                  <a>title will be displayed here!</a>
                  <a>this is task title</a>
                  <a>this is task title</a>
                  <a>this is task title</a>
                  <a>this is task title</a>
                  <a>this is task title</a>
                </div>
              </Collapse>
            </div>
            <div className={'sid-link'} onClick={handleOrganizationExpand}>
              <span className={'icon-link organization'}>
                <FontAwesomeIcon icon={faSuitcase} />
              </span>
              <a>Organization</a>
            </div>
            <div className={'sid-link-sub'}>
              <Collapse in={open.organization} timeout="auto" unmountOnExit>
                <div className={'task-sub-title'}>
                  <h5>joined organizations</h5>
                </div>
                <hr />
                <div className={'task-sub-links'}>
                  <a>Merry joy</a>
                  <a>Macedonian</a>
                  <a>Abebech Gobena</a>
                  <a>Muday </a>
                  <a>Rotracter</a>
                  <a>We believe in God</a>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      )}
      <div onClick={handleSideNavWidth} className={'sidenav-close-bar'}>
        <span>
          <FontAwesomeIcon icon={mini ? faAngleDoubleRight : faAngleDoubleLeft} />
          {mini ? '' : ' Collapse: sidebar'}
        </span>
      </div>
    </div>
  )
}

export default Sidenav
