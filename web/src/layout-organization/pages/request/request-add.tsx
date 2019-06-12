import React, { useRef, useState } from 'react'
import { Block, Button, Content, Input, Page, TextArea, Title } from 'gerami'

import './request.scss'
import axios from 'axios'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { RouteComponentProps, withRouter } from 'react-router'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import TaskAdd from '../task/task-add'
import FundAdd from '../fundraising/fund-add'
import MaterialAdd from '../../components/material-add/material-add'
import OrganAdd from '../organ/organ-add'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMyOrganizationState } from '../../stores/my-organization/my-organization-provider'

function RequestAdd({ history }: RouteComponentProps<{}>) {
  const { account } = useAccountState()
  const { myOrganization } = useMyOrganizationState()
  let { loading, t } = useLocale(['material-donation', 'request'])
  let [type, setType] = useState<any>(0)
  let [id, setId] = useState()
  const [picture, setPicture] = useState()
  const [imageSrc, setImageSrc] = useState()
  const pictureInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  let [specific, setSpecific] = useState()

  const handlePictureInputChange = async (): Promise<void> => {
    if (
      pictureInputRef.current &&
      pictureInputRef.current.files &&
      pictureInputRef.current.files.length
    ) {
      setPicture(pictureInputRef.current.files[0])
      let reader = new FileReader()
      reader.onload = e => {
        setImageSrc((e.target as any).result)
      }
      reader.readAsDataURL(pictureInputRef.current.files[0])
    }
  }

  const addRequest = (form: any) => {
    console.log(3, specific)

    form.preventDefault()
    const data = new FormData()
    data.append('name', form.target.name.value)
    data.append('description', form.target.description.value)
    data.append('expires', form.target.expires.value)
    data.append('status', 'OPEN')
    data.append('type', type)

    if (
      pictureInputRef.current &&
      pictureInputRef.current.files &&
      pictureInputRef.current.files.length
    ) {
      data.append('picture', picture)
    }

    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files.length
    ) {
      data.append('file', fileInputRef.current.files[0])
    }

    switch (type) {
      case 'Fundraising':
        data.append('Fundraising', JSON.stringify(specific))
        break
      case 'Task':
        data.append('Task', JSON.stringify(specific))
        break
      case 'Organ':
        data.append('Organ', JSON.stringify(specific))
        break
      case 'Material':
        data.append('Material', JSON.stringify(specific))
        console.log(data)
        break
    }
    console.log(specific)
    axios
      .post('/api/request/add', data, { withCredentials: true })
      .then(res => {
        id = res.data
        history.push('/organization/request/list')
      })
      .catch(e => {
        console.log(e)
      })
  }

  const uploadRef = useRef<HTMLInputElement>(null)

  return (
    <Page>
      <Content size={'L'}>
        <form onSubmit={e => addRequest(e)} method={'POST'}>
          <span>
            <div
              className={'request-img-container'}
              style={{
                backgroundImage: `url(${imageSrc ? imageSrc : ''})`
              }}
              onClick={() => pictureInputRef.current && pictureInputRef.current.click()}
            >
              <div style={{ display: 'none' }}>
                <input
                  type={'file'}
                  ref={pictureInputRef}
                  onChange={handlePictureInputChange}
                />
              </div>
              <div className={'img-add-placeholder fg-blackish'}>
                <span>
                  <FontAwesomeIcon icon={'image'} /> Insert an image
                </span>
              </div>
            </div>
            {/*<ImageInput name={'picture'} innerRef={uploadRef} />*/}
          </span>
          <Block>
            <Input
              required={true}
              className={'full-width'}
              name={'name'}
              type={'text'}
              label={t`request:title-of-request`}
            />
          </Block>

          <Block>
            <TextArea
              required={true}
              className={'full-width'}
              name={'description'}
              label={t`request:description-of-request`}
            />
          </Block>

          <Block>
            <sup>
              <Title>Expires On (Optional)</Title>
            </sup>

            <Input className={'full-width'} name={'expires'} type={'date'} />
          </Block>

          <Block>
            <sup>
              <Title>Attachment File (Optional)</Title>
            </sup>

            <Input
              className={'full-width'}
              name={'file'}
              type={'file'}
              inputRef={fileInputRef}
            />
          </Block>

          <hr />
          <Block>
            <FormControl className={'full-width'}>
              <InputLabel htmlFor={'request-type-label-placeholder'} shrink>
                {t`request:type-of-request`}
              </InputLabel>
              <Select
                required={true}
                value={type}
                onChange={e => setType(e.target.value)}
                input={
                  <MatInput
                    placeholder={'Select the Type of Request'}
                    name="request-type"
                    id="request-type-label-placeholder"
                  />
                }
              >
                <MenuItem value={'Fundraising'}>{t`request:fundraising`}</MenuItem>
                <MenuItem value={'Material'}>{t`request:material`}</MenuItem>
                <MenuItem value={'Task'}>{t`request:task`}</MenuItem>
                {myOrganization && myOrganization.type == 'HOSPITAL' ? (
                  <MenuItem value={'Organ'}>{t`request:organ`}</MenuItem>
                ) : (
                  ''
                )}
              </Select>
            </FormControl>
          </Block>
          {type == 'Fundraising' && <FundAdd onChange={setSpecific} />}
          {type == 'Task' && <TaskAdd onChange={setSpecific} />}
          {type == 'Material' && <MaterialAdd onChange={setSpecific} />}
          {type == 'Organ' && <OrganAdd onChange={setSpecific} />}
          <Block last className={'right'}>
            <Button
              type={'submit'}
              // to={`/organization/request/list`}
            >{t`request:make-the-request`}</Button>
          </Block>
          {/*<Button type={'submit'} to={`/organization/request/list`}>
            {t`request:finish`}
          </Button>*/}
        </form>
      </Content>
    </Page>
  )
}
export default withRouter(RequestAdd)
