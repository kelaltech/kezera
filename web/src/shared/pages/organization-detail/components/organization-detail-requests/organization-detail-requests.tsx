import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Warning, Yoga } from 'gerami'
import Axios from 'axios'
import * as qs from 'qs'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { IRequestResponse } from '../../../../../apiv/request.apiv'
import RequestCard from '../../../../components/request/request-card'

interface Props {
  organization: IOrganizationResponse
}

const count = 10

function OrganizationDetailRequest({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string>()

  const [requests, setRequests] = useState<IRequestResponse[]>([])

  const load = (since?: number): void => {
    Axios.get<IRequestResponse[]>(
      `/api/organization/requests/${organization._id}?${qs.stringify({ since, count })}`
    )
      .then(response => {
        setRequests(requests.concat(response.data))
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
    </>
  )
}

export default OrganizationDetailRequest
