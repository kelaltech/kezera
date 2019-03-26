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

export default class requestAdd extends Component {
  addRequest = () => {
    axios
      .post('/api/request/add')
      .then(data => {
        console.log('successfully added')
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    const finishClicked = () => {
      this.addRequest()
    }
    return (
      <Page>
        <Content size={'L'}>
          <form action="/api/request/add" method={'POST'}>
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
              <ImageInput />
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
              <Button type={'submit'} onClick={finishClicked}>
                Finish
              </Button>
            </Block>
          </form>
        </Content>
      </Page>
    )
  }
}
