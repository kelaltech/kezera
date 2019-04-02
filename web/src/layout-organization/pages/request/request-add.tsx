import React, { Component, useRef, useState } from 'react'
import {
  Block,
  Button,
  Content,
  ImageInput,
  Input,
  Page,
  TextArea,
  Title,
  Yoga
} from 'gerami'

import axios from 'axios'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { match, RouteComponentProps, withRouter } from 'react-router'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select
} from '@material-ui/core'
import TaskAdd from '../task/task-add'
import { IAccountStatus } from '../../../../../api/models/account/account.model'
import FundAdd from '../fundraising/fund-add'
import { Schema } from 'mongoose'

function RequestAdd({ history }: RouteComponentProps<{}>) {
  const { account } = useAccountState()
  let [type, setType] = useState<any>(0)
  let [id, setId] = useState()
  let [display, setDisplay] = useState(false)
  let [request, setRequest] = useState(false)
  let [reqCard, setReqCard] = useState(false)
  const addRequest = (form: any) => {
    form.preventDefault()
    const data = new FormData()
    data.append('name', form.target.name.value)
    data.append('description', form.target.description.value)
    data.append('startDate', form.target.startDate.value)
    data.append('endDate', form.target.endDate.value)
    data.append('type', type)
    if (uploadRef.current && uploadRef.current.files && uploadRef.current.files.length)
      data.append('picture', uploadRef.current.files[0])

    axios
      .post('/api/request/add', data, { withCredentials: true })
      .then(res => {
        console.log(res.data)
        id = res.data
        setReqCard(true)
        setDisplay(true)
        //history.push('/organization/request/' + res.data._id)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const state = {
    type: ''
  }

  const handleChange = (event: any) => {
    setType({ [event.target.type]: event.target.value })
  }

  const uploadRef = useRef<HTMLInputElement>(null)

  return (
    <Page>
      <Content size={'L'} style={{ display: reqCard ? 'none' : 'block' }}>
        <form onSubmit={e => addRequest(e)} method={'POST'}>
          <Block>
            <Title size={'XXL'}>Make A Request</Title>
          </Block>
          <hr />
          <Block>
            <Input
              className={'full-width'}
              name={'name'}
              type={'text'}
              label={'Title of Request'}
            />
          </Block>
          <Block>
            <ImageInput name={'picture'} innerRef={uploadRef} />
          </Block>

          <Block>
            <TextArea
              className={'full-width'}
              name={'description'}
              label={'Description of Request'}
            />
          </Block>

          <Yoga maxCol={2}>
            <Block>
              <Title>Start Date</Title>
            </Block>
            <Block>
              <Title>End Date</Title>
            </Block>
          </Yoga>

          <Yoga maxCol={2}>
            <Block>
              <Input className={'full-width'} name={'startDate'} type={'date'} />
            </Block>
            <Block>
              <Input className={'full-width'} name={'endDate'} type={'date'} />
            </Block>
          </Yoga>
          <hr />
          <Block>
            <FormControl className={'full-width'}>
              <InputLabel htmlFor={'request-type-label-placeholder'} shrink>
                Type of Request
              </InputLabel>
              <Select
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
                <MenuItem value={'Fundraising'}>Fundraising</MenuItem>
                <MenuItem value={1}>Material</MenuItem>
                <MenuItem value={2}>Organ</MenuItem>
                <MenuItem value={3}>Task</MenuItem>
              </Select>
            </FormControl>
          </Block>
          <Block last className={'right'}>
            <Button type={'submit'}>Next</Button>
          </Block>
        </form>
      </Content>
      {/*{type == 'Fundraising' ? <FundAdd _id={'5ca328e1f85fdf3a9c3c09c2'} /> : ''}*/}
      <FundAdd _id={'5ca328e1f85fdf3a9c3c09c2'} display={display ? 'block' : 'none'} />
    </Page>
  )
}
export default withRouter(RequestAdd)
