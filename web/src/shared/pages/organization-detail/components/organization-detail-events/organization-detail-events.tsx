import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Warning, Yoga } from 'gerami'
import Axios from 'axios'
import * as qs from 'qs'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { IOrganizationEventResponse } from '../../../../../apiv/event.apiv'
import EventCard from '../../../../components/event-card/event-card'

interface Props {
  organization: IOrganizationResponse
}

const count = 10

function OrganizationDetailEvent({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string>()

  const [events, setEvents] = useState<IOrganizationEventResponse[]>([])

  const load = (since?: number): void => {
    Axios.get<IOrganizationEventResponse[]>(
      `/api/organization/events/${organization._id}?${qs.stringify({ since, count })}`
    )
      .then(response => {
        setEvents(events.concat(response.data))
        setReady(true)
      })
      .catch(setError)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      {(error && (
        <Block first last>
          <Warning problem={error} />
        </Block>
      )) ||
        loading ||
        (!ready ? (
          <Loading delay />
        ) : (
          <>
            {!events.length ? (
              <div className={'padding-vertical-very-big center big fg-blackish'}>
                This organization has not posted events yet.
              </div>
            ) : (
              <>
                <Yoga maxCol={4} className={'yoga-in-rich-page padding-normal'}>
                  {events.map((e, i) => (
                    <EventCard key={i} event={e} />
                  ))}
                </Yoga>
                {events.length && events.length % count === 0 && (
                  <Block last className={'center'}>
                    <Button
                      onClick={() =>
                        load(new Date((events[events.length - 1] as any)._at).getTime())
                      }
                    >
                      Load More...
                    </Button>
                  </Block>
                )}
              </>
            )}
          </>
        ))}
    </>
  )
}

export default OrganizationDetailEvent
