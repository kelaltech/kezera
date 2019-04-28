import React, { useEffect, useState } from 'react'
import { Block, Button, Content, Flex, Input, Loading, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios, { CancelTokenSource } from 'axios'
import * as qs from 'qs'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import RichPage from '../../../shared/components/rich-page/rich-page'
import useField from '../../../shared/hooks/use-field/use-field'
import { ISpamReportResponse } from '../../../../../api/modules/spam/spam.apiv'

const count = 50
let searchCancellation: CancelTokenSource | null = null

function SpamReports() {
  const { loading, t } = useLocale([])

  const term = useField<HTMLInputElement>()

  const [ready, setReady] = useState(false)
  const [error, setError] = useState()
  const [spamReports, setSpamReports] = useState<ISpamReportResponse[]>([])

  const load = async (since?: number): Promise<void> => {
    try {
      if (!spamReports.length) setReady(false)

      if (searchCancellation) searchCancellation.cancel()
      searchCancellation = Axios.CancelToken.source()
      const response = await Axios.get<ISpamReportResponse[]>(
        `/api/spam/search-reports?${qs.stringify({
          term: term.value,
          count,
          since
        })}`,
        { withCredentials: true, cancelToken: searchCancellation.token }
      )

      setError(undefined)
      setSpamReports(response.data)
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
        documentTitle={`Spam Reports`}
        title={`Spam Reports`}
        description={`Open to view these spam reports in detail, and then handle or ignore after thorough investigation of each.`}
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
                    className={'margin-vertical-auto full-width'}
                    type={'search'}
                  />
                </form>
              </Flex>
            </Block>
          </label>
        </Content>

        {!ready ? (
          <Loading delay />
        ) : !spamReports.length ? (
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
              {spamReports.map((application, i) => ({
                /*<OrganizationCard
                  key={i}
                  organization={application}
                  isApplication={true}
                />todo*/
              }))}
            </Yoga>

            {spamReports.length % count === 0 && (
              <Block className={'center fg-blackish'}>
                <Button
                  className={''}
                  onClick={() => load(spamReports[spamReports.length - 1]._at)}
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

export default SpamReports
