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
import axios from 'axios'

export default function EventEdit(props: any) {
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <Block className={'center'}>
        <Title size="XXL"> Edit Event </Title>
      </Block>
      <Content size={'L'}>
        <form
          onSubmit={(e: any) => editResponse(e, props.event._id)}
          encType={'multipart/form-data'}
        >
          <Block first>
            <Flex>
              <ImageInput
                name={'image'}
                src={`/api/event/${props.event._id}/picture`}
                required
              />
              <Input
                name="title"
                className={'margin-big full-width'}
                placeholder={'Title'}
                defaultValue={props.event.title}
              />
            </Flex>
          </Block>
          <Block>
            <TextArea
              name="description"
              className={'full-width'}
              placeholder={'Purpose...'}
              defaultValue={props.event.description}
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
                  defaultValue={props.event.location}
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
                  type={'text'}
                  placeholder={'Total people'}
                  defaultValue={props.event.amountOfPeople}
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
              Update
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

function editResponse(e: any, id: any) {
  e.preventDefault()
  let data = new FormData()
  data.append('title', e.target.title.value)
  data.append('description', e.target.description.value)
  data.append('startDate', e.target.startDate.value)
  data.append('endDate', e.target.endDate.value)
  data.append('amountOfPeople', e.target.amountOfPeople.value)
  data.append('location', e.target.location.value)
  data.append('image', e.target.image.files[0])

  axios
    .put(`/api/event/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
    .then()
    .catch(console.error)
}
