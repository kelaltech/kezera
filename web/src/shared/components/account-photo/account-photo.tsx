import React, { useRef, useState } from 'react'
import { Button, Loading } from 'gerami'
import Axios from 'axios'

import './account-photo.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccountDispatch } from '../../../app/stores/account/account-provider'
import defaultPhoto from '../../../assets/images/login/promo-1.jpg'
import { reloadAccount } from '../../../app/stores/account/account-actions'

interface Props {
  account: IAccountResponse
  onChange: (account: IAccountResponse, timeout: number) => any // todo: ???
  /**
   * @default false
   */
  readonly?: boolean
}

function AccountPhoto({ account, onChange, readonly }: Props) {
  const { loading, t } = useLocale(['account'])

  const inputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)

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

        accountDispatch(await reloadAccount(undefined, response))
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
              ? 'none'
              : `url(${account.photoUri || defaultPhoto})`
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
