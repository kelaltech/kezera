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

interface IEdit {
  request: any
  props: any
}
export default function RequestEdit({ request }: IEdit) {
  return (
    <Dialog onClose={request.onClose} open={request.open}>
      <Block className={'center'}>
        <Title size="XXL"> Update/Edit Request </Title>
      </Block>
      <Content size={'L'}>
        <form
          onSubmit={(e: any) => editRequest(e, request._id)}
          encType={'multipart/form-data'}
        >
          <Block first>
            <Flex>
              <ImageInput
                name={'image'}
                src={`/api/request/${request._id}/picture`}
                required
              />
              <Input
                name="title"
                className={'margin-big full-width'}
                placeholder={'Name'}
                defaultValue={request.name}
              />
            </Flex>
          </Block>
          <Block>
            <TextArea
              name="description"
              className={'full-width'}
              placeholder={'Purpose...'}
              defaultValue={request.description}
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
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </label>
            </Block>
          </Yoga>
          <Block last className={'right'}>
            <Button
              type={'submit'}
              onClick={() => request.onClose()}
              primary={true}
              className={''}
            >
              Update
            </Button>
            &emsp;
            <Button onClick={() => request.onClose()} className={''}>
              Cancel
            </Button>
          </Block>
        </form>
      </Content>
    </Dialog>
  )
}

function editRequest(e: any, request: any) {
  e.preventDefault()
  let data = new FormData()
  data.append('name', e.target.name.value)
  data.append('description', e.target.description.value)
  data.append('startDate', e.target.startDate.value)
  data.append('endDate', e.target.endDate.value)

  axios
    .put(`/api/request/${request.id}`, data, {
      withCredentials: true
    })
    .then()
    .catch(console.error)
}
