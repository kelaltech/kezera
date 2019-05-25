import React, { useEffect, useState } from 'react'
import { Image, Title, Block, Yoga, Content, Anchor, Button } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EventTabs from './event-tabs/event-tabs'
import axios from 'axios'
import { Switch } from '@material-ui/core'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../hooks/use-locale/use-locale'
import SpamReportDrop from '../../components/spam-report-drop/spam-report-drop'

export default function EventDetail(props: any) {
  let [event, setEvent] = useState()
  let [isSpamReportDropOpen, setIsSpamReportDropOpen] = useState(false)
  let [toggle, setToggle] = useState(false)
  let account = useAccountState()
  let { t } = useLocale(['event'])
  let months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.'
  ]
  let FetchDetail = function() {
    axios
      .get('/api/event/' + props.match.params._id)
      .then((resp: any) => {
        setEvent(resp.data)
        console.log(props.match.params._id)
      })
      .catch(console.error)
  }

  let handleGoing = function() {
    axios
      .put(`/api/event/${props.match.params._id}/going`)
      .then(resp => {
        setToggle(!toggle)
        FetchDetail()
      })
      .catch(console.error)
  }

  let isGoing = function() {
    axios
      .get(`/api/event/${props.match.params._id}/isGoing`)
      .then(resp => setToggle(resp.data.going))
      .catch()
  }
  useEffect(() => {
    FetchDetail()
    isGoing()
  }, [])

  return (
    <>
      {event ? (
        <>
          <Image
            style={{ backgroundSize: 'cover', width: '100%', height: '40vh' }}
            src={`/api/event/${event._id}/picture`}
          />
          <Content transparent size={'3XL'}>
            <Block className="">
              <Title size={'XXL'} className="inline-block">
                {event.title}
              </Title>
              <div className="inline-block" style={{ float: 'right' }}>
                <Title size={'M'} className={'inline-block'}>
                  {event.goingVolunteers.length <=
                  Number.parseInt(event.amountOfPeople) ? (
                    <>
                      {Number.parseInt(event.amountOfPeople) -
                        event.goingVolunteers.length}{' '}
                      {t`seats remaining`} &emsp;
                    </>
                  ) : (
                    <> {t`event full`} </>
                  )}
                </Title>
                {account && account!.account!.role == 'VOLUNTEER' ? (
                  <label>
                    {!(event.goingVolunteers.length >= event.amountOfPeople) ? (
                      <>
                        <Title className="inline-block">
                          {' '}
                          <b> {t`going`} </b>{' '}
                        </Title>
                        <Switch checked={toggle} onChange={() => handleGoing()} />
                      </>
                    ) : (
                      <> {t`event full`} </>
                    )}
                  </label>
                ) : (
                  ''
                )}

                {account && account!.account!.role == 'VOLUNTEER' ? (
                  <>
                    <Button
                      onClick={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
                    >
                      Report
                    </Button>
                    <SpamReportDrop
                      type={'EVENT'}
                      ids={[event._id]}
                      open={isSpamReportDropOpen}
                      onClose={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
                    />
                  </>
                ) : (
                  ''
                )}

                {account && account!.account!.role == 'ORGANIZATION' ? (
                  <>
                    <Anchor
                      to={`/event/${props.match.params._id}/attendance/verify`}
                      button
                    >
                      <FontAwesomeIcon icon={['far', 'user-circle']} />
                      &nbsp; {t`attending`}
                    </Anchor>
                    &emsp;
                    <Anchor to={`/event/${props.match.params._id}/attended`} button>
                      <FontAwesomeIcon icon={'check-circle'} /> &nbsp;{t`attended`}
                    </Anchor>
                  </>
                ) : (
                  ''
                )}
              </div>
            </Block>
            <Block>
              <p>{event.description}</p>
            </Block>
            <Yoga maxCol={2}>
              <Block>
                <label className="flex padding-small">
                  <FontAwesomeIcon
                    className={'margin-top-small margin-right-big'}
                    icon={'calendar'}
                  />
                  <Content transparent>
                    {' '}
                    From {months[new Date(`${event.startDate}`).getMonth()]}{' '}
                    {new Date(`${event.startDate}`).getDate()}
                    &nbsp; to &nbsp; {
                      months[new Date(`${event.endtDate}`).getMonth()]
                    }{' '}
                    &nbsp; {new Date(`${event.endDate}`).getDate()} &nbsp;{' '}
                    {new Date(`${event.endDate}`).getFullYear()}{' '}
                  </Content>
                </label>
                <label className={'flex padding-small'}>
                  <FontAwesomeIcon
                    className={'margin-top-small margin-right-big'}
                    icon={'map-marker'}
                  />
                  <Content transparent>
                    <Anchor
                      href={`https://www.google.com/maps?q=${
                        event.location.geo.coordinates[1]
                      },${event.location.geo.coordinates[0]}`}
                      target={'_blank'}
                      rel={'noopener'}
                    >
                      {event.location!.address
                        ? event.location!.address
                        : event.location!.geo.coordinates}
                    </Anchor>
                  </Content>
                </label>
              </Block>
              <Block>
                <label className={'flex padding-small'}>
                  <FontAwesomeIcon
                    className={'margin-top-small margin-right-big'}
                    icon={'smile'}
                  />
                  <Content transparent className={'full-width'}>
                    {event.interestedVolunteers.length >= 0
                      ? event.interestedVolunteers.length
                      : 0}
                    &emsp;{t`people interested`}
                  </Content>
                </label>

                <label className={'flex padding-small'}>
                  <FontAwesomeIcon
                    className={'margin-top-small margin-right-big'}
                    icon={['far', 'user-circle']}
                  />
                  <Content className={'full-width'} transparent>
                    {event.amountOfPeople} {t`people invited`}
                  </Content>
                </label>
              </Block>
            </Yoga>
            <EventTabs id={props.match.params._id} />
          </Content>
        </>
      ) : (
        <Title size={'L'}>{t`event doesn't exist`} </Title>
      )}
    </>
  )
}
