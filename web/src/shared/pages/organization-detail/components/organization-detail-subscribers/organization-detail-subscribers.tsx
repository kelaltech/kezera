import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Warning, Yoga } from 'gerami'
import Axios, { CancelTokenSource } from 'axios'
import * as qs from 'qs'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { IAccountResponse } from '../../../../../../../api/modules/account/account.apiv'
import SearchBar from '../../../../components/search-bar/search-bar'

interface Props {
  organization: IOrganizationResponse
}

const count = 10
let searchCancellation: CancelTokenSource | null = null

function OrganizationDetailSubscribers({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const [term, setTerm] = useState('')

  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string>()

  const [subscribers, setSubscribers] = useState<IAccountResponse[]>([])

  const load = async (since?: number): Promise<void> => {
    try {
      if (!subscribers.length) setReady(false)

      if (searchCancellation) searchCancellation.cancel()
      searchCancellation = Axios.CancelToken.source()
      const response = await Axios.get<IAccountResponse[]>(
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
        setSubscribers((since ? subscribers : []).concat(response.data))
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
                    <div key={i}>{s.displayName}</div>
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
