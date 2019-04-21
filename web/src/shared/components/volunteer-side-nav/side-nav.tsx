import React, { useState } from 'react'

import './side-nav.scss'
import { Button } from 'gerami'
import { Collapse, MenuItem } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNewspaper,
  faCalendarCheck,
  faTasks,
  faSuitcase
} from '@fortawesome/free-solid-svg-icons'

function Sidenav(props: any) {
  // const [wide, setWide] = useState(true)
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
  return (
    <div className={'sidenav-container'}>
      <div className={'btn-link'}>
        <Button to={'/requests'}>Donate!</Button>
      </div>
      <div className={'sidenav-links'}>
        <div className={'sid-link'}>
          <span className={'icon-link discovery '}>
            <FontAwesomeIcon icon={faNewspaper} />
          </span>
          <a>Discover</a>
        </div>
        <div className={'sid-link'}>
          <span className={'icon-link news'}>
            <FontAwesomeIcon icon={faNewspaper} />
          </span>
          <a>News</a>
        </div>
        <div className={'sid-link'}>
          <span className={'icon-link event'}>
            <FontAwesomeIcon icon={faCalendarCheck} />
          </span>
          <a>Events</a>
        </div>
        <div className={'sid-link'} onClick={handleTaskExpand}>
          <span className={'icon-link task'}>
            <FontAwesomeIcon icon={faTasks} />
          </span>
          <a>Tasks</a>
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
  )
}

export default Sidenav
