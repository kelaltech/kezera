import React from 'react'
import {
  Block,
  Button,
  Content,
  Flex,
  ImageInput,
  Input,
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
  open: boolean
  onClose: () => void
}
export default function RequestEdit({ request, open, onClose }: IEdit) {
  function editRequest(e: any) {
    e.preventDefault()
    let data = new FormData()
    data.append('name', e.target.name.value)
    data.append('description', e.target.description.value)
    data.append('startDate', e.target.startDate.value)
    data.append('endDate', e.target.endDate.value)

    axios
      .put(`/api/request/${request._id}`, data, {
        withCredentials: true
      })
      .then()
      .catch(console.error)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <Block className={'center'}>
        <Title size="XXL"> Update/Edit Request </Title>
      </Block>
      <Content size={'L'}>
        <form onSubmit={(e: any) => editRequest(e)} encType={'multipart/form-data'}>
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
              placeholder={'Description'}
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
                  defaultValue={request.startDate}
                  label="Start date"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
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
            <Button type={'submit'} primary={true} className={''}>
              Update
            </Button>
            &emsp;
            <Button className={''}>Cancel</Button>
          </Block>
        </form>
      </Content>
    </Dialog>
  )
}
