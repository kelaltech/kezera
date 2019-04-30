import React, { useState } from 'react'
import { Button, MenuDrop, Warning } from 'gerami'
import { IMenuDropProps } from 'gerami/src/components/MenuDrop/MenuDrop'
import { TextField } from '@material-ui/core'
import { TextFieldProps } from '@material-ui/core/TextField'
import Axios from 'axios'

import { ISpamReportType } from '../../../../../api/models/spam-report/spam-report.model'
import useLocale from '../../hooks/use-locale/use-locale'
import useField from '../../hooks/use-field/use-field'
import {
  ISpamReportRequestBase,
  ISpamReportResponse
} from '../../../../../api/modules/spam/spam.apiv'

type Props = IMenuDropProps & {
  type: ISpamReportType
  ids: string[]
}

function SpamReportDrop({ type, ids, ...menuDropProps }: Props) {
  const { t, loading } = useLocale([])

  const [error, setError] = useState()
  const [sending, setSending] = useState(false)

  const description = useField<TextFieldProps>({
    initialValue: '',
    maxLength: 500
  })

  const handleReport = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    try {
      setError(undefined)
      setSending(true)

      const data: ISpamReportRequestBase = {
        type,
        ids,

        description: description.value
      }
      await Axios.post<ISpamReportResponse>(
        `/api/spam/report/${type.toLowerCase()}`,
        data,
        { withCredentials: true }
      )

      if (menuDropProps.onClose) menuDropProps.onClose()
    } catch (e) {
      setError(e)
      setSending(false)
    }
  }

  return (
    loading || (
      <MenuDrop {...menuDropProps}>
        <form
          onSubmit={handleReport}
          className={'padding-vertical-normal padding-horizontal-big'}
        >
          {error && (
            <div className={'margin-bottom-big'}>
              <Warning problem={error} shy={() => setError(undefined)} />
            </div>
          )}

          <h4>Spam Report</h4>

          <div className={'margin-vertical-normal'}>
            <TextField
              {...description.textAreaProps}
              placeholder={`Please, describe why you think this is a spam.`}
              className={'full-width'}
              rows={5}
              disabled={sending}
              multiline
              autoFocus
              required
            />
          </div>

          <div className={'right'}>
            <Button type={'submit'} disabled={sending}>
              Report
            </Button>
          </div>
        </form>
      </MenuDrop>
    )
  )
}

export default SpamReportDrop
