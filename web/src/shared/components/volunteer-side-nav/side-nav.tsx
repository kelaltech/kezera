import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './side-nav.scss'
import { Button, Warning } from 'gerami'
import { Collapse } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNewspaper,
  faCalendarCheck,
  faTasks,
  faSuitcase,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faSearchPlus
} from '@fortawesome/free-solid-svg-icons'
import MiniNav from '../../../layout-volunteer/components/volunteer-mini-nav/volunteer-mini-nav'
import {
  useSidenavDispatch,
  useSidenavState
} from '../../../layout-volunteer/stores/sidenav/sidenav-provider'
import { useAccountState } from '../../../app/stores/account/account-provider'

function Sidenav(props: any) {
  const [open, setOpen] = useState({
    task: false,
    organization: false
  })
  const [errorForT, setErrorForT] = useState<any>(null)
  const [errorForO, setErrorForO] = useState<any>(null)
  const [task, setTask] = useState([])
  const [organization, setOrganization] = useState([])
  const { account } = useAccountState()
  const { mini } = useSidenavState()
  const miniDispatch = useSidenavDispatch()

  useEffect(() => {
    Axios.get('/api/tasks/me')
      .then(tasks => tasks.data)
      .then(data => {
        // setTask(data) todo uncomment this after ashe delivers the api
        setTask([])
      })
      .catch(() => {
        setErrorForT('cant load Tasks! check your connection')
      })

    Axios.get('/api/organization/subscriptions')
      .then(o => o.data)
      .then(data => {
        setOrganization(data)
      })
      .catch(() => {
        setErrorForO('cant load Organizations! check your connection')
      })
  }, [])

  const handleTaskExpand = () => {
    setOpen({ ...open, ['task']: !open.task })
  }
  const handleOrganizationExpand = () => {
    setOpen({ ...open, ['organization']: !open.organization })
  }

  const handleSideNavWidth = () => {
    miniDispatch({ type: 'set' })
  }
  return (
    <div
      className={`sidenav-container ${mini ? 'mini-width' : 'wide-width'}`}
      id={'sidenav-vol'}
    >
      {mini ? (
        <MiniNav />
      ) : (
        <div className={'wide-sidenav-cont'}>
          <div className={'btn-link'}>
            <Button to={'/requests'}>Donate!</Button>
          </div>
          <div className={'sidenav-links'}>
            <div className={'sid-link'}>
              <a href="/discovery" className={'a'}>
                <span className={'icon-link fg-blackish discovery '}>
                  <FontAwesomeIcon icon={faSearchPlus} />
                </span>
                <span>Discover</span>
              </a>
            </div>
            <div className={'sid-link'}>
              <a href="/news" className={'a'}>
                <span className={'icon-link fg-blackish news'}>
                  <FontAwesomeIcon icon={faNewspaper} />
                </span>
                <span>News</span>
              </a>
            </div>
            <div className={'sid-link'}>
              <a href="/events" className={'a'}>
                <span className={'icon-link fg-blackish event'}>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                </span>
                <span>Events</span>
              </a>
            </div>
            <div className={'sid-link'} onClick={handleTaskExpand}>
              <span className={'icon-link fg-blackish  task'}>
                <FontAwesomeIcon icon={faTasks} />
              </span>
              <span>Tasks</span>
            </div>
            <div className={'sid-link-sub'}>
              <Collapse in={open.task} timeout="auto" unmountOnExit>
                <div className={'task-sub-title'}>
                  <a href="/tasks" className={'a'}>
                    <h5>pending tasks</h5>
                  </a>
                </div>
                <hr />
                <div className={'task-sub-links'}>
                  {errorForT ? (
                    <Warning problem={errorForT} shy />
                  ) : (
                    task.map((t: any, k) => (
                      <a key={k} href={`/request/${t._id}`}>
                        {t.title}
                      </a>
                    ))
                  )}
                </div>
              </Collapse>
            </div>
            <div className={'sid-link'} onClick={handleOrganizationExpand}>
              <span className={'icon-link fg-blackish organization'}>
                <FontAwesomeIcon icon={faSuitcase} />
              </span>
              <span>Organization</span>
            </div>
            <div className={'sid-link-sub'}>
              <Collapse in={open.organization} timeout="auto" unmountOnExit>
                <div className={'task-sub-title'}>
                  <a href="/my-organization" className={'a'}>
                    <h5>joined organizations</h5>
                  </a>
                </div>
                <hr />
                <div className={'task-sub-links'}>
                  {errorForO ? (
                    <Warning problem={errorForO} shy />
                  ) : (
                    organization.map((o: any, k) => (
                      <a key={k} href={`/organization/${o._id}`}>
                        {o.account.displayName}
                      </a>
                    ))
                  )}
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
