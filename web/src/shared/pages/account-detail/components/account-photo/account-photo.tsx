import React, { useRef, useState } from 'react'
import { Button, Loading } from 'gerami'
import Axios from 'axios'

import './account-photo.scss'
import useLocale from '../../../../hooks/use-locale/use-locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  useAccountDispatch,
  useAccountState
} from '../../../../../app/stores/account/account-provider'
import { reloadAccount } from '../../../../../app/stores/account/account-actions'

interface Props {
  /**
   * @default false
   */
  readonly?: boolean
}

function AccountPhoto({ readonly }: Props) {
  const { loading, t } = useLocale(['account'])

  const inputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)

  const { account } = useAccountState()
  if (!account) return <>{t`account:you-are-logged-out`}</>
  const accountDispatch = useAccountDispatch()

  const handleChange = async (): Promise<void> => {
    if (readonly) return

    setSubmitting(true)

    if (inputRef.current && inputRef.current.files && inputRef.current.files.length) {
      try {
        const data = new FormData()
        data.append('photo', inputRef.current.files[0])

        const response = (await Axios.post('/api/account/add-photo', data, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        })).data
        // reset photo cache
        if (response.photoUri) response.photoUri = response.photoUri + `?ms=${Date.now()}`

        await reloadAccount(accountDispatch, undefined, response)
      } catch (e) {
        // todo
        console.error(e)
      }
    } else {
      console.error('No photo found to upload. :(')
    }

    setSubmitting(false)
  }

  return (
    loading || (
      <>
        <div style={{ display: 'none' }}>
          <input type={'file'} ref={inputRef} onChange={handleChange} />
        </div>

        <Button
          className={'account-photo'}
          onClick={() => inputRef.current && inputRef.current.click()}
          style={{
            backgroundImage: submitting
              ? 'linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95))'
              : account.photoUri
              ? `url(${account.photoUri})`
              : 'linear-gradient(to top right, transparent, rgba(255,255,255,0.42))',
            color: account.photoUri ? undefined : 'rgba(255,255,255,0.95)'
          }}
        >
          {submitting ? (
            <Loading className={'padding-none'} />
          ) : (
            <FontAwesomeIcon icon={'camera-retro'} />
          )}
        </Button>
      </>
    )
  )
}

export default AccountPhoto
