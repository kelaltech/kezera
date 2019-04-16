import React, { useEffect, useState } from 'react'
import { Block, Button, Content, Flex, Input, Yoga } from 'gerami'
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

function VerifierOrganizations() {
  const { loading, t } = useLocale([])

  const term = useField<HTMLInputElement>()

  const [error, setError] = useState()
  const [organizations, setOrganizations] = useState<IOrganizationResponse[]>([])

  const load = async (since?: number): Promise<void> => {
    try {
      if (searchCancellation) searchCancellation.cancel()

      searchCancellation = Axios.CancelToken.source()
      const response = await Axios.get<IOrganizationResponse[]>(
        `/api/organization/search?${qs.stringify({ term: term.value, count, since })}`,
        { withCredentials: true, cancelToken: searchCancellation.token }
      )

      setError(undefined)
      setOrganizations(response.data)
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
        documentTitle={`Approved Organizations`}
        title={`Approved Organizations`}
        description={`These are the verifier-approved organization on the system.`}
        error={error}
        onErrorClose={setError}
      >
        <Content
          className={'margin-bottom-normal bg-whitish'}
          style={{ borderRadius: '999px' }}
        >
          <label>
            <Block className={'padding-bottom-big'}>
              <Flex>
                <div className={'margin-top-auto padding-right-big fg-blackish'}>
                  <FontAwesomeIcon icon={'search'} />
                </div>
                <Input
                  {...term.inputProps}
                  inputRef={term.ref}
                  placeholder={`Search for Approved Organizations`}
                  className={'margin-vertical-auto full-width'}
                  type={'search'}
                />
              </Flex>
            </Block>
          </label>
        </Content>

        {!organizations.length ? (
          <Block first className={'center fg-blackish'}>
            No organization found
            {term.value && ` using the term "${term.value}"`}.
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
