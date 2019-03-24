import React, { useEffect, useRef, useState } from 'react'
import { Button, ImageInput } from 'gerami'

import './account-photo.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import defaultPhoto from '../../../assets/images/login/promo-1.jpg'

interface Props {
  account: IAccountResponse
  onChange?: (account: IAccountResponse) => any // todo: ???
  /**
   * @default false
   */
  readonly?: boolean
}

function AccountPhoto({ account, onChange, readonly }: Props) {
  const { loading, t } = useLocale(['account'])

  const [src, setSrc] = useState(defaultPhoto)

  const imageInputRef = useRef<ImageInput>(null)

  useEffect(() => {
    if (imageInputRef.current && imageInputRef.current.innerRef.current) {
      const input = imageInputRef.current.innerRef.current

      // todo until ImageInput gets an onChange props
      input.addEventListener('change', () => {
        setTimeout(() => {
          if (imageInputRef.current) {
            setSrc(imageInputRef.current.imageUrl || defaultPhoto)
          }
        }, 1000)
      })
    }
  })

  return (
    loading || (
      <>
        <div style={{ display: 'none' }}>
          <ImageInput ref={imageInputRef} />
        </div>

        <Button
          className={'account-photo'}
          onClick={() => {
            if (imageInputRef.current && imageInputRef.current.innerRef.current)
              imageInputRef.current.innerRef.current.click()
          }}
          style={{ backgroundImage: `url(${src})` }}
        >
          <FontAwesomeIcon icon={'camera-retro'} />
        </Button>
      </>
    )
  )
}

export default AccountPhoto
