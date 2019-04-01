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
import { convertToRaw } from 'draft-js'
import axios from 'axios'
import { useAccountState } from '../../../app/stores/account/account-provider'

export default function TaskAdd() {
  const { account } = useAccountState()

  const addTask = (form: any) => {
    const data = new FormData()
    data.append('numberNeeded', form.numberNeeded.value)

    axios
      .post('/api/task/add', data, { withCredentials: true })
      .then(res => {
        console.log('successfully added')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <Page>
      <Content size={'L'}>
        <form action="/api/modules/task" method={'POST'}>
          <Block>
            <Title size={'XXL'}>Task Specific</Title>
          </Block>
          <hr />
          <Block>
            <Input
              className={'full-width'}
              name={'numberNeeded'}
              type={'text'}
              label={'Number of Participants Needed'}
            />
          </Block>
        </form>
      </Content>
    </Page>
  )
}
