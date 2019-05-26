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

function VerifierOrganizations() {
  const { loading, t } = useLocale([])

  const [term, setTerm] = useState('')

  const [ready, setReady] = useState(false)
  const [error, setError] = useState()
  const [organizations, setOrganizations] = useState<IOrganizationResponse[]>([])

  const load = async (since?: number): Promise<void> => {
    try {
      if (!organizations.length) setReady(false)

      if (searchCancellation) searchCancellation.cancel()
      searchCancellation = Axios.CancelToken.source()
      const response = await Axios.get<IOrganizationResponse[]>(
        `/api/organization/search?${qs.stringify({ term, count, since })}`,
        { withCredentials: true, cancelToken: searchCancellation.token }
      )

      if (!Array.isArray(response.data)) {
        setError('Response is malformed.')
      } else {
        setError(undefined)
        setOrganizations((since ? organizations : []).concat(response.data))
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
        documentTitle={`Approved Organizations`}
        title={`Approved Organizations`}
        description={`These are the verifier-approved organizations on the system.`}
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
        ) : !organizations.length ? (
          <Block first className={'center fg-blackish'}>
            No organization found
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
              {organizations.map((organization, i) => (
                <OrganizationCard key={i} organization={organization} />
              ))}
            </Yoga>

            {organizations.length % count === 0 && (
              <Block className={'center fg-blackish'}>
                <Button
                  className={''}
                  onClick={() => load(organizations[organizations.length - 1]._at)}
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

export default VerifierOrganizations
