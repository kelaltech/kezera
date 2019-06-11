import React, { Component, useEffect, useRef, useState } from 'react'
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
import Axios from 'axios'
import FundEdit from '../fundraising/fund-edit'
import TaskEdit from '../task/task-edit'
import MaterialEdit from '../../components/material-edit/material-edit'
import OrganEdit from '../organ/organ-edit'

function RequestEdit({ history, match }: RouteComponentProps<{ _id: string }>) {
  let { loading, t } = useLocale(['material-donation', 'request'])
  let [type, setType] = useState<any>(0)
  let [request, setRequest] = useState()
  let [id, setId] = useState()
  const [picture, setPicture] = useState()
  const [imageSrc, setImageSrc] = useState()
  const inputRef = useRef<HTMLInputElement>(null)

  let FetchRequest = function() {
    Axios.get('/api/request/' + match.params._id)
      .then(resp => {
        setRequest(resp.data)
      })
      .catch(console.error)
  }

  let [specific, setSpecific] = useState()

  const handleInputChange = async (): Promise<void> => {
    if (inputRef.current && inputRef.current.files && inputRef.current.files.length) {
      setPicture(inputRef.current.files[0])
      let reader = new FileReader()
      reader.onload = e => {
        setImageSrc((e.target as any).result)
      }
      reader.readAsDataURL(inputRef.current.files[0])
    }
  }

  const addRequest = (form: any) => {
    console.log(3, specific)

    form.preventDefault()
    const data = new FormData()
    data.append('name', form.target.name.value)
    data.append('description', form.target.description.value)
    data.append('expires', form.target.endDate.value)
    data.append('status', 'OPEN')
    data.append('type', type)
    data.append('picture', picture)

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
        history.push('/organization/request/' + res.data._id)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => FetchRequest(), [])

  return request ? (
    <Page>
      <Content size={'L'}>
        <form onSubmit={e => addRequest(e)} method={'POST'}>
          <span>
            <div
              className={'request-img-container'}
              style={{
                backgroundImage: `url(${imageSrc ? imageSrc : ''})`
              }}
              onClick={() => inputRef.current && inputRef.current.click()}
            >
              <div style={{ display: 'none' }}>
                <input type={'file'} ref={inputRef} onChange={handleInputChange} />
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
              value={request.name}
              label={t`request:title-of-request`}
            />
          </Block>

          <Block>
            <TextArea
              required={true}
              className={'full-width'}
              name={'description'}
              value={request.description}
              label={t`request:description-of-request`}
            />
          </Block>

          <Block>
            <sup>
              <Title>End Date</Title>
            </sup>

            <Input
              className={'full-width'}
              name={'endDate'}
              type={'date'}
              value={new Date(request.expires).toISOString().substr(0, 10)}
            />
          </Block>
          <hr />
          {request.type == 'Fundraising' && (
            <FundEdit Fund={request.fundraising} onChange={setSpecific} />
          )}
          {request.type == 'Task' && (
            <TaskEdit Task={request.task} onChange={setSpecific} />
          )}
          {request.type == 'Material' && (
            <MaterialEdit Material={request.material[0]} onChange={setSpecific} />
          )}
          {request.type == 'Organ' && (
            <OrganEdit Organ={request.organ} onChange={setSpecific} />
          )}
          <Block last className={'right'}>
            <Button
              type={'submit'}
              // to={`/organization/request/list`}
            >{t`request:update`}</Button>
          </Block>
          {/*<Button type={'submit'} to={`/organization/request/list`}>
            {t`request:finish`}
          </Button>*/}
        </form>
      </Content>
    </Page>
  ) : (
    ''
  )
}
export default withRouter(RequestEdit as any)
