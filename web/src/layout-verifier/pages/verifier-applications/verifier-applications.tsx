import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Yoga } from 'gerami'
import Axios, { CancelTokenSource } from 'axios'
import * as qs from 'qs'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { IOrganizationResponse } from '../../../apiv/organization.apiv'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import SearchBar from '../../../shared/components/search-bar/search-bar'

const count = 12
let searchCancellation: CancelTokenSource | null = null

function VerifierApplications() {
  const { loading, t } = useLocale([])

  const [term, setTerm] = useState('')

  const [ready, setReady] = useState(false)
  const [error, setError] = useState()
  const [applications, setApplications] = useState<IOrganizationResponse[]>([])

  const load = async (since?: number): Promise<void> => {
    try {
      if (!applications.length) setReady(false)

      if (searchCancellation) searchCancellation.cancel()
      searchCancellation = Axios.CancelToken.source()
      const response = await Axios.get<IOrganizationResponse[]>(
        `/api/verifier/search-organization-applications?${qs.stringify({
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
        setApplications((since ? applications : []).concat(response.data))
        setReady(true)
      }
    } catch (e) {
      if (!Axios.isCancel(error)) setError(e)
    }
  }

  useEffect(() => {
    load().catch(setError)
  }, [term])

  return (
    loading || (
      <RichPage
        ready={true}
        documentTitle={`Organization Applications`}
        title={`Organization Applications`}
        description={`Open to view these applications in detail, and then approve or reject after thorough investigation of each, in order to register them as organizations.`}
        error={error}
        onErrorClose={setError}
      >
        <SearchBar
          onTerm={setTerm}
          onSearch={e => {
            e.preventDefault()
            setReady(false)
            load().catch(setError)
          }}
        />

        {!ready ? (
          <Loading delay />
        ) : !applications.length ? (
          <Block first className={'center fg-blackish'}>
            No organization application found
            {term && (
              <>
                {' '}
                using the term <q>{term}</q>
              </>
            )}
            .
          </Block>
        ) : (
          <>
            <Yoga maxCol={3} className={'yoga-in-rich-page'}>
              {applications.map((application, i) => (
                <OrganizationCard
                  key={i}
                  organization={application}
                  isApplication={true}
                />
              ))}
            </Yoga>

            {applications.length % count === 0 && (
              <Block className={'center fg-blackish'}>
                <Button
                  className={''}
                  onClick={() => load(applications[applications.length - 1]._at)}
                >
                  Load more...
                </Button>
              </Block>
            )}
          </>
        )}
      </RichPage>
    )
  )
}

export default VerifierApplications
