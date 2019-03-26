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
import { Dialog } from '@material-ui/core'

export default function EventAdd(props: any) {
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <Block className={'center'}>
        <Title size="XXL"> Create Event </Title>
      </Block>
      <Content size={'L'}>
        <form
          method={'POST'}
          action={'/api/event/create'}
          encType={'multipart/form-data'}
        >
          <Block first>
            <Flex>
              <ImageInput name={'image'} required />
              <Input
                name="title"
                className={'margin-big full-width'}
                placeholder={'Title'}
                required
              />
            </Flex>
          </Block>
          <Block>
            <TextArea
              name="description"
              className={'full-width'}
              placeholder={'Purpose...'}
            />
          </Block>
          <Yoga maxCol={2}>
            <Block>
              <label className="flex">
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'calendar'}
                />
                <TextField
                  name="startDate"
                  className="full-width"
                  label="Start date"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                />
              </label>
              <label className={'flex'}>
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'map-marker'}
                />
                <Input
                  name={'location'}
                  className="full-width"
                  placeholder={'location'}
                  required
                />
              </label>
            </Block>
            <Block>
              <label className={'flex'}>
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'calendar'}
                />
                <TextField
                  name="endDate"
                  className="full-width"
                  label="End date"
                  type="date"
                  defaultValue="2017-05-28"
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                />
              </label>
              <label className={'flex'}>
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={['far', 'user-circle']}
                />
                <Input
                  name="amountOfPeople"
                  className="full-width"
                  type={'number'}
                  placeholder={'Total people'}
                  required
                />
              </label>
            </Block>
          </Yoga>
          <Block last className={'right'}>
            <Button
              type={'submit'}
              onClick={() => props.onClose()}
              primary={true}
              className={''}
            >
              Create
            </Button>
            &emsp;
            <Button onClick={() => props.onClose()} className={''}>
              Cancel
            </Button>
          </Block>
        </form>
      </Content>
    </Dialog>
  )
}

/*
  <form action={"/"} method={"GET"}>
        <Block first>
          <Flex>
            <ImageInput required/>
            <Input
              name="Title"
              className={'margin-big full-width'}
              placeholder={'Title'}
              required
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
                required
              />
            </label>
            <label className={'flex'}>
              <FontAwesomeIcon
                className={'margin-top-big margin-right-normal'}
                icon={'map-marker'}
              />
              <Input className="full-width" placeholder={'location'} required/>
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
                required
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
                required
              />
            </label>
          </Block>
        </Yoga>
        <Block last className={'right'}>
          <Button type={"submit"} primary={true} className={''}>
            Create
          </Button>
        </Block>
     </form>
      </Content>
   */
