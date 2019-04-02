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

function RequestAdd({ history }: RouteComponentProps<{}>) {
  const { account } = useAccountState()
  let [type, setType] = useState<any>(0)

  const addRequest = (form: any) => {
    const data = new FormData()
    data.append('name', form.name.value)
    data.append('description', form.description.value)
    data.append('startDate', form.startDate.value)
    data.append('endDate', form.endDate.value)

    if (uploadRef.current && uploadRef.current.files && uploadRef.current.files.length)
      data.append('picture', uploadRef.current.files[0])

    axios
      .post('/api/request/add', data, { withCredentials: true })
      .then(res => {
        console.log('successfully added')
        console.log(res.data)
        history.push('/organization/request/' + res.data._id)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const finishClicked = (e: any) => {
    e.preventDefault()
    addRequest(e.target)
  }

  const uploadRef = useRef<HTMLInputElement>(null)

  return (
    <Page>
      <Content size={'L'}>
        <form action="/api/request/add" onSubmit={finishClicked} method={'POST'}>
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
            {/*
            <FormControl className={'full-width'}>
              <InputLabel htmlFor={'request-type-label-placeholder'} shrink>
                Type of Request
              </InputLabel>
              <Select
                value={type}
                input={
                  <MatInput
                    name="request-type"
                    id="request-type-label-placeholder"
                  />
                }
              >
                <MenuItem value={'FUNDRAISING'}>Fundraising</MenuItem>
                <MenuItem value={'MATERIAL'}>Material</MenuItem>
                <MenuItem value={'ORGAN'}>Organ</MenuItem>
                <MenuItem value={'TASK'}>Task</MenuItem>
              </Select>
            </FormControl>*/}
          </Block>
          <Block last className={'right'}>
            <Button type={'submit'}>Finish</Button>
          </Block>
        </form>
      </Content>
    </Page>
  )
}
export default withRouter(RequestAdd)
