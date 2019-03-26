import React, { Component, useState } from 'react'
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
import { RouteComponentProps } from 'react-router'

export default function RequestAdd({ history }: RouteComponentProps<{}>) {
  const { account } = useAccountState()

  const addRequest = (form: any) => {
    axios
      .post('/api/request/add', {
        name: form.name.value,
        description: form.description.value,
        picture: form.picture.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value
        // todo
      })
      .then((data: any) => {
        console.log('successfully added')
        console.log(data)
        history.push('/organization/request/' + data._id)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const finishClicked = (e: any) => {
    e.preventDefault()
    addRequest(e.target)
  }

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
            <ImageInput name={'picture'} />
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

          <Block last className={'right'}>
            <Button type={'submit'}>Finish</Button>
          </Block>
        </form>
      </Content>
    </Page>
  )
}
