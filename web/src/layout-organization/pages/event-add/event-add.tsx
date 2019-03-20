import React from 'react'
import {
  Block,
  Button,
  Content,
  Flex,
  ImageInput,
  Input,
  Page,
  TextArea,
  Yoga,
  Title
} from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextField from '@material-ui/core/TextField'
import _ from '../../../lib/language'
export default function EventAdd() {
  return (
    <Page>
      <Block className={'center'}>
        <Title size="XXL"> {_`Create Event`} </Title>
      </Block>
      <Content size={'L'}>
        <Block first>
          <Flex>
            <ImageInput />
            <Input
              name="Title"
              className={'margin-big full-width'}
              placeholder={'Title'}
            />
          </Flex>
        </Block>
        <Block>
          <TextArea name="Purpose" className={'full-width'} placeholder={'Purpose...'} />
        </Block>
        <Yoga maxCol={2}>
          <Block>
            <label className="flex">
              <FontAwesomeIcon
                className={'margin-top-big margin-right-normal'}
                icon={'calendar'}
              />
              <TextField
                name="StartDate"
                className="full-width"
                label="Start date"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </label>
            <label className={'flex'}>
              <FontAwesomeIcon
                className={'margin-top-big margin-right-normal'}
                icon={'map-marker'}
              />
              <Input className="full-width" placeholder={'location'} />
            </label>
          </Block>
          <Block>
            <label className={'flex'}>
              <FontAwesomeIcon
                className={'margin-top-big margin-right-normal'}
                icon={'calendar'}
              />
              <TextField
                name="EndDate"
                className="full-width"
                label="End date"
                type="date"
                defaultValue="2017-05-28"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </label>
            <label className={'flex'}>
              <FontAwesomeIcon
                className={'margin-top-big margin-right-normal'}
                icon={['far', 'user-circle']}
              />
              <Input
                name="Location"
                className="full-width"
                type={'text'}
                placeholder={'Total people'}
              />
            </label>
          </Block>
        </Yoga>
        <Block last className={'right'}>
          <Button primary={true} className={''}>
            {' '}
            Create{' '}
          </Button>
        </Block>
      </Content>
    </Page>
  )
}
