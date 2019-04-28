import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import * as qs from 'qs'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { ISpamReportResponse } from '../../../../../api/modules/spam/spam.apiv'

function SpamReportDetail() {
  const { t, loading } = useLocale([])

  const [error, setError] = useState()
  const [spamReport, setSpamReport] = useState<ISpamReportResponse>()

  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const _id = query._id

  const load = async (): Promise<void> => {
    try {
      const response = await Axios.get<ISpamReportResponse>(
        `/api/spam/get-report/${_id}`,
        { withCredentials: true }
      )

      setError(undefined)
      setSpamReport(response.data)
    } catch (e) {
      setError(error)
    }
  }

  useEffect(() => {
    load().catch(setError)
  }, [_id])

  return (
    loading || (
      <RichPage
        ready={true}
        documentTitle={`Spam Report Detail`}
        title={`Spam Report Detail`}
        error={error}
        onErrorClose={setError}
      >
        {/*todo*/}// todo
      </RichPage>
    )
  )
}

export default SpamReportDetail
