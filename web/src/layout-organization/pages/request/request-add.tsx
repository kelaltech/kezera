import React, { useState } from 'react'
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

export default function requestAdd() {
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
              name={'requestTitle'}
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
              name={'requestDescription'}
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
              <Input className={'full-width'} name={'requestStartDate'} type={'date'} />
            </Block>
            <Block>
              <Input className={'full-width'} name={'requestEndDate'} type={'date'} />
            </Block>
          </Yoga>
          <hr />
          <Block last className={'right'}>
            <Button>Finish</Button>
          </Block>
        </form>
      </Content>
    </Page>
  )
}
