import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Warning, Yoga } from 'gerami'
import Axios, { CancelTokenSource } from 'axios'
import * as qs from 'qs'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { IOrganizationEventResponse } from '../../../../../apiv/event.apiv'
import EventCard from '../../../../components/event-card/event-card'
import SearchBar from '../../../../components/search-bar/search-bar'

interface Props {
  organization: IOrganizationResponse
}

const count = 10
let searchCancellation: CancelTokenSource | null = null

function OrganizationDetailEvent({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const [term, setTerm] = useState('')

  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string>()

  const [events, setEvents] = useState<IOrganizationEventResponse[]>([])

  const load = async (since?: number): Promise<void> => {
    try {
      if (!events.length) setReady(false)

      if (searchCancellation) searchCancellation.cancel()
      searchCancellation = Axios.CancelToken.source()
      const response = await Axios.get<IOrganizationEventResponse[]>(
        `/api/organization/search-events/${organization._id}?${qs.stringify({
          term,
          count,
          since
        })}`,
        { withCredentials: true, cancelToken: searchCancellation.token }
      )

      setError(undefined)
      setEvents((since ? events : []).concat(response.data))
      setReady(true)
    } catch (e) {
      if (!Axios.isCancel(error)) setError(error)
    }
  }

  useEffect(() => {
    load().catch(setError)
  }, [term])

  return (
    <div style={{ minHeight: '75vh' }}>
      <SearchBar
        className={'margin-top-big'}
        onTerm={setTerm}
        onSearch={e => {
          e.preventDefault()
          setReady(false)
          load().catch(setError)
        }}
      />

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
    </div>
  )
}

export default OrganizationDetailEvent
