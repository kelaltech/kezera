import React, { useState } from 'react'
import { Block, Button, Content, Input, Page, TextArea, Yoga } from 'gerami'

import { Radio, RadioGroup } from '@material-ui/core'

export default function requestAdd() {
  const [typeOfRequest, setTypeOfRequest] = useState('1')

  return (
    <Page>
      <Content size={'L'}>
        <form>
          <Block>
            <h1>Make A Request</h1>
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
            <TextArea
              className={'full-width'}
              name={'requestDescription'}
              label={'Description of Request'}
            />
          </Block>

          <Yoga maxCol={2}>
            <Block>
              <h6>Start Date</h6>
            </Block>
            <Block>
              <h6>End Date</h6>
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
          <Block>Type of Request</Block>

          <Block>
            <RadioGroup value={typeOfRequest} onChange={(e, v) => setTypeOfRequest(v)}>
              <Radio type={'radio'} value={'1'} />
              <Radio type={'radio'} value={'2'} />
              <Radio name={'Task'} type={'radio'} value={'3'} />
            </RadioGroup>
          </Block>

          <hr />
          <Block last className={'right'}>
            <Button type={'submit'} primary>
              Finish
            </Button>
          </Block>
        </form>
      </Content>
    </Page>
  )
}
