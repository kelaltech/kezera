import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Warning, Yoga } from 'gerami'
import Axios, { CancelTokenSource } from 'axios'
import * as qs from 'qs'

import useLocale from '../../../../hooks/use-locale/use-locale'
import {
  IOrganizationResponse,
  IOrganizationSubscriber
} from '../../../../../apiv/organization.apiv'
import SearchBar from '../../../../components/search-bar/search-bar'
import AccountChip from '../../../../components/account-chip/account-chip'

interface Props {
  organization: IOrganizationResponse
}

const count = 120
let searchCancellation: CancelTokenSource | null = null

function OrganizationDetailSubscribers({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const [term, setTerm] = useState('')

  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string>()

  const [subscribers, setSubscribers] = useState<
    (IOrganizationSubscriber & { selected?: boolean })[]
  >([])

  const load = async (since?: number): Promise<void> => {
    try {
      if (!subscribers.length) setReady(false)

      if (searchCancellation) searchCancellation.cancel()
      searchCancellation = Axios.CancelToken.source()
      const response = await Axios.get<
        (IOrganizationSubscriber & { selected?: boolean })[]
      >(
        `/api/organization/search-subscribers/${organization._id}?${qs.stringify({
          term,
          count,
          since
        })}`,
        { withCredentials: true, cancelToken: searchCancellation.token }
      )

      if (!Array.isArray(response.data)) {
        setError('Response is malformed.')
      } else {
        setError(undefined)
        setSubscribers(
          (since ? subscribers : []).concat(
            response.data.map(d => {
              d.selected = false
              return d
            })
          )
        )
        setReady(true)
      }
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
            {!subscribers.length ? (
              <div className={'padding-vertical-very-big center big fg-blackish'}>
                This organization has no subscribers yet.
              </div>
            ) : (
              <>
                <Yoga maxCol={4} className={'yoga-in-rich-page padding-normal'}>
                  {subscribers.map((s, i) => (
                    <AccountChip
                      key={i}
                      account={s}
                      anchorProps={{
                        to: `/v/${s.volunteerId}`,
                        target: '_blank' // todo: should be conditional
                      }}
                      selected={s.selected}
                      setSelected={
                        /* todo: should be conditional */
                        selected => {
                          subscribers[i].selected = selected
                          setSubscribers(
                            ([] as (IOrganizationSubscriber & {
                              selected?: boolean
                            })[]).concat(subscribers)
                          )
                        }
                      }
                    />
                  ))}
                </Yoga>
                {subscribers.length && subscribers.length % count === 0 && (
                  <Block last className={'center'}>
                    <Button
                      onClick={() =>
                        load(
                          new Date(
                            (subscribers[subscribers.length - 1] as any)._at
                          ).getTime()
                        )
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

export default OrganizationDetailSubscribers
