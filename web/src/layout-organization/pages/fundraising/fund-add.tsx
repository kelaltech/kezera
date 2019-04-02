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

export default function FundAdd() {
  return (
    <Page>
      <Content size={'L'}>
        <form action="/api/request/fundraising/add" method={'POST'}>
          <Block>
            <Title size={'XL'}>Fundraising Specific</Title>
          </Block>
          <hr />
          <Block>
            <Input
              className={'full-width'}
              name={'amount'}
              type={'text'}
              label={'Amount of Money'}
            />
          </Block>

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
              <Input className={'full-width'} name={'startTime'} type={'time'} />
            </Block>
            <Block>
              <Input className={'full-width'} name={'endTime'} type={'time'} />
            </Block>
          </Yoga>
        </form>
      </Content>
    </Page>
  )
}
