import React, { Component, useRef, useState } from 'react'
import {
  Block,
  Button,
  Content,
  Flex,
  FlexSpacer,
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
import MaterialAdd from '../../components/material-add/material-add'
import OrganAdd from '../organ/organ-add'

function RequestAdd({ history }: RouteComponentProps<{}>) {
  const { account } = useAccountState()
  let [type, setType] = useState<any>(0)
  let [id, setId] = useState()

  let [specific, setSpecific] = useState()

  const addRequest = (form: any) => {
    console.log(3, specific)

    form.preventDefault()
    const data = new FormData()
    data.append('name', form.target.name.value)
    data.append('description', form.target.description.value)
    data.append('startDate', form.target.startDate.value)
    data.append('endDate', form.target.endDate.value)
    data.append('type', type)

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

    if (uploadRef.current && uploadRef.current.files && uploadRef.current.files.length)
      data.append('picture', uploadRef.current.files[0])

    axios
      .post('/api/request/add', data, { withCredentials: true })
      .then(res => {
        id = res.data
        //history.push('/organization/request/' + res.data._id)
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
          <Block>
            <Title size={'XXL'}>Make A Request</Title>
          </Block>
          <hr />
          <Block>
            <Input
              required={true}
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
              required={true}
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
              <Input
                required={true}
                className={'full-width'}
                name={'startDate'}
                type={'date'}
              />
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
                <MenuItem value={'Fundraising'}>Fundraising</MenuItem>
                <MenuItem value={'Material'}>Material</MenuItem>
                <MenuItem value={'Organ'}>Organ</MenuItem>
                <MenuItem value={'Task'}>Task</MenuItem>
              </Select>
            </FormControl>
          </Block>
          {type == 'Fundraising' && <FundAdd onChange={setSpecific} />}
          {type == 'Task' && <TaskAdd onChange={setSpecific} />}
          {type == 'Material' && <MaterialAdd onChange={setSpecific} />}
          {type == 'Organ' && <OrganAdd onChange={setSpecific} />}
          <Block last className={'right'}>
            <Button type={'submit'}>Make the Request</Button>
          </Block>
          <Button type={'submit'} to={`/organization/request/list`}>
            Finish
          </Button>
        </form>
      </Content>
    </Page>
  )
}
export default withRouter(RequestAdd)
