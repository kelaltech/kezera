import React, { useEffect, useState } from 'react'
import { Block, Button, Content, Flex, Input, Loading, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios, { CancelTokenSource } from 'axios'
import * as qs from 'qs'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { IOrganizationResponse } from '../../../apiv/organization.apiv'
import useField from '../../../shared/hooks/use-field/use-field'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'

const count = 12
let searchCancellation: CancelTokenSource | null = null

function VerifierApplications() {
  const { loading, t } = useLocale([])

  const term = useField<HTMLInputElement>()

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
          term: term.value,
          count,
          since
        })}`,
        { withCredentials: true, cancelToken: searchCancellation.token }
      )

      setError(undefined)
      setApplications(response.data)
      setReady(true)
    } catch (e) {
      if (!Axios.isCancel(error)) setError(error)
    }
  }

  useEffect(() => {
    load().catch(setError)
  }, [term.value])

  useEffect(() => {
    const timeout = setTimeout(() => term.ref.current && term.ref.current.focus(), 1000)
    return () => clearInterval(timeout)
  }, [loading])

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
        <Content className={'margin-bottom-normal'}>
          <label>
            <Block className={'padding-bottom-big padding-horizontal-big'}>
              <Flex>
                <div className={'margin-top-auto padding-right-big fg-accent'}>
                  <FontAwesomeIcon icon={'search'} />
                </div>
                <form
                  className={'margin-vertical-auto full-width'}
                  onSubmit={e => {
                    e.preventDefault()
                    setReady(false)
                    load().catch(setError)
                  }}
                >
                  <Input
                    {...term.inputProps}
                    inputRef={term.ref}
                    placeholder={`Search for Organization Applications`}
                    className={'full-width'}
                    type={'search'}
                  />
                </form>
              </Flex>
            </Block>
          </label>
        </Content>

        {!ready ? (
          <Loading delay />
        ) : !applications.length ? (
          <Block first className={'center fg-blackish'}>
            No organization application found
            {term.value && (
              <>
                {' '}
                using the term <q>{term.value}</q>
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
