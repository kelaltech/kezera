import React, { useState } from 'react'
import './verifier-add.scss'
import { Block, Button, Content, Flex, ImageInput, Input, Title } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog } from '@material-ui/core'
import { AddVerifier } from '../../stores/admin-action'
import { useAdminDispatch } from '../../stores/admin-provider'
import useField from '../../../shared/hooks/use-field/use-field'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

interface IVerifierAddProps {
  open: boolean
  onClose: () => void
}

export default function VerifierAdd(props: IVerifierAddProps) {
  let AdminDispatch = useAdminDispatch()
  let { t } = useLocale(['admin'])
  let [verifier, setVerifier] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    password: ''
  })

  const emitChanges = (verifierChanges: any): void => {
    setVerifier({ ...verifier, ...verifierChanges })
  }
  const displayName = useField<HTMLInputElement>({
    minLength: [2, 'too short'],
    maxLength: 50,
    setValueHook: async value => {
      emitChanges({ displayName: value })
    }
  })
  const email = useField<HTMLInputElement>({
    minLength: 2,
    maxLength: 50,
    setValueHook: async value => {
      emitChanges({ email: value })
    }
  })
  const phoneNumber = useField<HTMLInputElement>({
    minLength: 2,
    maxLength: 50,
    setValueHook: async value => {
      emitChanges({ phoneNumber: value })
    }
  })
  const password = useField<HTMLInputElement>({
    minLength: 2,
    maxLength: 50,
    setValueHook: async value => {
      emitChanges({ password: value })
    }
  })

  const validationError = (error: string | null) =>
    error === null ? null : (
      <div
        className={'font-L bold fg-accent margin-left-normal margin-auto'}
        title={error}
        style={{ color: 'red', cursor: 'default' }}
      >
        !
      </div>
    )

  let HandleAdd = function(e: any) {
    e.preventDefault()
    let data = new FormData()
    data.append('data', JSON.stringify(verifier))
    data.append('photo', e.target.image.files[0])
    AddVerifier(AdminDispatch, data)
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <Block className={'center'}>
        <Title size="3XL">
          {' '}
          <FontAwesomeIcon icon={'user-shield'} />{' '}
        </Title>
      </Block>
      <Content size={'XL'}>
        <form onSubmit={e => HandleAdd(e)} encType={'multipart/form-data'}>
          <Block first className="flex">
            <Flex>
              <ImageInput name={'image'} className="Fields" required />
            </Flex>
            <Flex className={' Fields Name-Input'}>
              <Input
                name="displayName"
                placeholder={t`name`}
                {...displayName.inputProps}
                inputRef={displayName.ref}
                required
              />
              {validationError(displayName.error)}
            </Flex>
          </Block>

          <Block>
            <Input
              name={'email'}
              className={'full-width'}
              placeholder={t`email address`}
              inputRef={email.ref}
              {...email.inputProps}
            />
            {validationError(email.error)}
          </Block>
          <Block>
            <Input
              name={'phone'}
              className={'full-width'}
              placeholder={t`phone no.`}
              inputRef={phoneNumber.ref}
              {...phoneNumber.inputProps}
            />
            {validationError(phoneNumber.error)}
          </Block>
          <Block>
            <Input
              type="password"
              name={'password'}
              className={'full-width'}
              placeholder={t`temporary password`}
              inputRef={password.ref}
              {...password.inputProps}
            />
            {validationError(password.error)}
          </Block>
          <Block last className={'right'}>
            <Button
              type={'submit'}
              onClick={() => props.onClose()}
              primary={true}
              className={''}
              disabled={
                !!(
                  password.error ||
                  displayName.error ||
                  phoneNumber.error ||
                  email.error
                )
              }
            >
              {t`create`}
            </Button>
            &emsp;
            <Button onClick={() => props.onClose()} className={''}>
              {t`cancel`}
            </Button>
          </Block>
        </form>
      </Content>
    </Dialog>
  )
}
