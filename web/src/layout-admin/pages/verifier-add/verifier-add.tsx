import React, { useState } from 'react'
import './verifier-add.scss'
import { Block, Button, Content, Flex, ImageInput, Input, Title } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog } from '@material-ui/core'
import { AddVerifier } from '../../stores/admin-action'
import { useAdminDispatch } from '../../stores/admin-provider'

interface IVerifierAddProps {
  open: boolean
  onClose: () => void
}

export default function VerifierAdd(props: IVerifierAddProps) {
  let [name, setName] = useState()
  let [phone, setPhone] = useState()
  let [email, setEmail] = useState()
  let [password, setPassword] = useState()
  let AdminDispatch = useAdminDispatch()

  let HandleAdd = function(e: any) {
    e.preventDefault()
    let data = new FormData()
    name != undefined ? data.append('displayName', name) : undefined
    email != undefined ? data.append('email', email) : undefined
    phone != undefined ? data.append('phoneNumber', phone) : undefined
    password != undefined ? data.append('password', password) : undefined
    data.append('image', e.target.image.files[0])
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
                placeholder={'Full name'}
                onChange={e => setName(e.target.value)}
                required
              />
            </Flex>
          </Block>

          <Block>
            <Input
              name={'email'}
              className={'full-width'}
              placeholder={'E-mail address'}
              onChange={e => setEmail(e.target.value)}
            />
          </Block>
          <Block>
            <Input
              name={'phone'}
              className={'full-width'}
              placeholder={'Phone number'}
              onChange={e => setPhone(e.target.value)}
            />
          </Block>
          <Block>
            <Input
              type="password"
              name={'password'}
              className={'full-width'}
              placeholder={'Temporary password'}
              onChange={e => setPassword(e.target.value)}
            />
          </Block>
          <Block last className={'right'}>
            <Button
              type={'submit'}
              onClick={() => props.onClose()}
              primary={true}
              className={''}
            >
              Create
            </Button>
            &emsp;
            <Button onClick={() => props.onClose()} className={''}>
              Cancel
            </Button>
          </Block>
        </form>
      </Content>
    </Dialog>
  )
}
