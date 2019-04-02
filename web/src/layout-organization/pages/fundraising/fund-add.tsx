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
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { Schema } from 'mongoose'
import Axios from 'axios'

interface IFundProps {
  _id: string
  display: string
}

export default function FundAdd(props: IFundProps) {
  let [amount, setAmount] = useState()
  let [currency, setCurrency] = useState()
  let [startTime, setStartTime] = useState()
  let [endTime, setEndTime] = useState()

  let HandleAdd = function(e: any) {
    e.preventDefault()
    let formData = new FormData()
    formData.append('amount', amount)
    formData.append('currency', currency)
    formData.append('startTime', startTime)
    formData.append('endTime', endTime)
    formData.append('requestId', props._id.toString())
    Axios.post('/api/fundraising/add', formData)
      .then()
      .catch()
  }

  return (
    <Content size={'L'} style={{ display: props.display }}>
      <form onSubmit={e => HandleAdd(e)}>
        <Block>
          <Title size={'XL'}>Fundraising Specific</Title>
        </Block>
        <hr />
        <Yoga maxCol={2}>
          <Block>
            <Input
              onChange={e => setAmount(e.target.value)}
              className={'full-width'}
              name={'amount'}
              type={'text'}
              label={'Amount of Money'}
            />
          </Block>
          <FormControl className={'full-width'}>
            <InputLabel htmlFor={'fund-type-label-placeholder'} shrink>
              Type of Currency
            </InputLabel>
            <Select
              onChange={e => setCurrency(e.target.value)}
              value={''}
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
              className={'full-width'}
              name={'startTime'}
              type={'date'}
              onChange={e => setStartTime(e.target.value)}
            />
          </Block>
          <Block>
            <Input
              className={'full-width'}
              name={'endTime'}
              type={'date'}
              onChange={e => setEndTime(e.target.value)}
            />
          </Block>
        </Yoga>
        <Block className={'right'}>
          <Button type={'submit'}>Add</Button>
        </Block>
      </form>
    </Content>
  )
}
