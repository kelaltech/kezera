import React, { useEffect, useState } from 'react'
import { Block, Button, Loading } from 'gerami'
import Axios, { CancelTokenSource } from 'axios'
import * as qs from 'qs'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { ISpamReportResponse } from '../../../../../api/modules/spam/spam.apiv'
import SpamReportCard from '../../../shared/components/spam-report-card/spam-report-card'
import SearchBar from '../../../shared/components/search-bar/search-bar'

const count = 10
let searchCancellation: CancelTokenSource | null = null

function SpamReports() {
  const { loading, t } = useLocale([])

  const [term, setTerm] = useState('')

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
        setSpamReports((since ? spamReports : []).concat(response.data))
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
        documentTitle={`Spam Reports`}
        title={`Spam Reports`}
        description={`Open to view these spam reports in detail, and then handle or ignore after thorough investigation of each.`}
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
        ) : !spamReports.length ? (
          <Block first className={'center fg-blackish'}>
            No spam report found
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
            <>
              {spamReports.map((spamReport, i) => (
                <SpamReportCard
                  key={i}
                  spamReport={spamReport}
                  className={'margin-bottom-normal'}
                />
              ))}
            </>

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
