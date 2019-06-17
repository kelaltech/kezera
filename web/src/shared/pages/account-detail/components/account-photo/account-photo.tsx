import React, { useRef, useState } from 'react'
import { Button, Content, Loading } from 'gerami'
import { IContentProps } from 'gerami/src/components/Content/Content'
import { IButtonProps } from 'gerami/src/components/Button/Button'
import Axios from 'axios'

import './account-photo.scss'
import { IAccountResponse } from '../../../../../apiv/account.apiv'
import useLocale from '../../../../hooks/use-locale/use-locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  useAccountDispatch,
  useAccountState
} from '../../../../../app/stores/account/account-provider'
import { reloadAccount } from '../../../../../app/stores/account/account-actions'

type Props = IContentProps & {
  accountOverride?: IAccountResponse
  buttonPropsOverride?: IButtonProps

  /**
   * @default false
   */
  readonly?: boolean
}

function AccountPhoto({
  accountOverride,
  readonly,
  buttonPropsOverride,
  ...contentProps
}: Props) {
  const { loading, t } = useLocale(['account'])

  const inputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)

  const { account: accountFromState } = useAccountState()
  const account = accountOverride || accountFromState

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
      <Content
        transparent
        {...contentProps}
        className={`${contentProps.className || ''} account-photo-container`}
        style={{ overflow: 'visible', ...contentProps.style }}
      >
        <input
          style={{ display: 'none' }}
          type={'file'}
          ref={inputRef}
          onChange={handleChange}
        />

        <Button
          className={'account-photo'}
          onClick={() => !readonly && inputRef.current && inputRef.current.click()}
          style={{
            backgroundImage:
              !readonly && submitting
                ? 'linear-gradient(rgba(245,245,245,1), rgba(245,245,245,1))'
                : account.photoUri
                ? `url(${account.photoUri}), linear-gradient(rgba(255,255,255,1), rgba(255,255,255,1))`
                : 'linear-gradient(to top right, transparent, rgba(255,255,255,0.42))',
            color: account.photoUri ? undefined : 'rgba(255,255,255,0.95)'
          }}
          {...buttonPropsOverride}
        >
          {readonly ? (
            <></>
          ) : submitting ? (
            <Loading className={'padding-none'} />
          ) : (
            <FontAwesomeIcon icon={'camera-retro'} />
          )}
        </Button>
      </Content>
    )
  )
}

export default AccountPhoto
