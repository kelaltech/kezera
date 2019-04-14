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

interface IRequestProp {
  request: any
}
function EditFund({ request }: IRequestProp) {
  let [specific, setSpecific] = useState()

  function editFunds(e: any, id: any) {
    e.preventDefault()
    let data = new FormData()
    data.append('name', e.target.name.value)
    data.append('description', e.target.description.value)
    data.append('startDate', e.target.startDate.value)
    data.append('endDate', e.target.endDate.value)
    data.append('amount', e.target.amount.value)
    data.append('currency', e.target.currency.value)
    data.append('picture', e.target.image.files[0])

    axios
      .put(`/api/request/${request.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      .then()
      .catch(console.error)
  }

  const uploadRef = useRef<HTMLInputElement>(null)

  return (
    <Page>
      <Content size={'L'}>
        <form onSubmit={e => editFunds(e, request.id)} method={'POST'}>
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
          <Yoga maxCol={2}>
            <Block>
              <Input
                required={true}
                className={'full-width'}
                value={request.amount}
                type={'text'}
                label={'Amount of Money'}
              />
            </Block>
            <FormControl className={'full-width'}>
              <InputLabel htmlFor={'fund-type-label-placeholder'} shrink>
                Type of Currency
              </InputLabel>
              <Select
                required={true}
                value={request.currency}
                input={
                  <MatInput
                    placeholder={'Select the Type of Currency'}
                    name="currency"
                    id="fund-type-label-placeholder"
                  />
                }
              >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'ETB'}>ETB</MenuItem>
                <MenuItem value={'EURO'}>EURO</MenuItem>
                <MenuItem value={'POUND'}>POUND</MenuItem>
              </Select>
            </FormControl>
          </Yoga>

          <Yoga maxCol={2}>
            <Block>
              <Title>Start Time</Title>
            </Block>
            <Block>
              <Title>End Time</Title>
            </Block>
          </Yoga>

          <Yoga maxCol={2}>
            <Block>
              <Input
                required={true}
                className={'full-width'}
                value={request.startTime}
                type={'date'}
              />
            </Block>
            <Block>
              <Input className={'full-width'} value={request.endTime} type={'date'} />
            </Block>
          </Yoga>
          <Block last className={'right'}>
            <Button type={'submit'}>Finish</Button>
          </Block>
        </form>
      </Content>
    </Page>
  )
}
export default EditFund
