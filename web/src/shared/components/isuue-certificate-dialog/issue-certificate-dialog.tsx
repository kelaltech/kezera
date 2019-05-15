import React, { useState } from 'react'
import { Block, Button, Warning } from 'gerami'
import { Dialog, TextField } from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'
import Axios from 'axios'

import { ICertificatePurpose } from '../../../../../api/models/certificate/certificate.model'
import { ICertificateRequest, ICertificateResponse } from '../../../apiv/certificate.apiv'

type Props = DialogProps & {
  purpose: ICertificatePurpose
  issueTo: string[] // volunteer _ids
}

function IssueCertificateDialog({ purpose, issueTo, ...dialogProps }: Props) {
  const [data, setData] = useState<ICertificateRequest>({
    purpose,
    issueTo,
    description: ''
  })

  const [sending, setSending] = useState(false)
  const [error, setError] = useState()

  const handleIssue = (): void => {
    setSending(true)
    setError(true)
    Axios.post<ICertificateResponse>('/api/certificate/issue', data, {
      withCredentials: true
    })
      .then(() => dialogProps.onClose && dialogProps.onClose(undefined as any))
      .catch(setError)
      .finally(() => setSending(false))
  }

  return (
    <Dialog {...dialogProps}>
      <div style={{ width: '100vh' }} />

      <Block first>
        <h4>Issue Certificate</h4>
      </Block>
      <hr />

      {error && (
        <Block>
          <Warning problem={error} shy={() => setError(undefined)} />
        </Block>
      )}

      <Block>
        <TextField
          rows={5}
          placeholder={`Message on the certificate`}
          className={'full-width'}
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
          disabled={sending}
          multiline
          autoFocus
        />
      </Block>

      <hr className={'margin-bottom-none'} />
      <div className={'padding-big right bg-whitish'}>
        <Button primary onClick={handleIssue} disabled={sending || !data.description}>
          Issue Certificate
        </Button>
      </div>
    </Dialog>
  )
}

export default IssueCertificateDialog
