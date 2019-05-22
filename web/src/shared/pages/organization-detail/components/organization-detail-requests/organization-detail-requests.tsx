import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Warning, Yoga } from 'gerami'
import Axios, { CancelTokenSource } from 'axios'
import * as qs from 'qs'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import RequestCard from '../../../../components/request/request-card'
import SearchBar from '../../../../components/search-bar/search-bar'

interface Props {
  organization: IOrganizationResponse
}

const count = 10
let searchCancellation: CancelTokenSource | null = null

function OrganizationDetailRequest({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const [term, setTerm] = useState('')

  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string>()

  const [requests, setRequests] = useState<IRequestResponse[]>([])

  const load = async (since?: number): Promise<void> => {
    try {
      if (!requests.length) setReady(false)

      if (searchCancellation) searchCancellation.cancel()
      searchCancellation = Axios.CancelToken.source()
      const response = await Axios.get<IRequestResponse[]>(
        `/api/organization/search-requests/${organization._id}?${qs.stringify({
          term,
          count,
          since
        })}`,
        { withCredentials: true, cancelToken: searchCancellation.token }
      )

      setError(undefined)
      setRequests((since ? requests : []).concat(response.data))
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
            {!requests.length ? (
              <div className={'padding-vertical-very-big center big fg-blackish'}>
                This organization has not posted requests yet.
              </div>
            ) : (
              <>
                <Yoga maxCol={4} className={'yoga-in-rich-page padding-normal'}>
                  {requests.map((r, i) => (
                    <RequestCard key={i} request={r} />
                  ))}
                </Yoga>
                {requests.length && requests.length % count === 0 && (
                  <Block last className={'center'}>
                    <Button
                      onClick={() =>
                        load(
                          new Date((requests[requests.length - 1] as any)._at).getTime()
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

export default OrganizationDetailRequest
