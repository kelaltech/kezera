import React, { useState } from 'react'
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
import { IOrganizationEventRequest } from '../../../apiv/event.apiv'
import { Schema } from 'mongoose'

interface IEventEditProps {
  event: IOrganizationEventRequest
  open: boolean
  onClose: () => void
}

export default function EventEdit(props: IEventEditProps) {
  let [endDate, setEndDate] = useState()
  let [startDate, setStartDate] = useState()
  let [title, setTitle] = useState()
  let [description, setDescription] = useState()
  let [people, setPeople] = useState()
  let [location, setLocation] = useState()

  let HandleUpdate = function(e: any, id: Schema.Types.ObjectId) {
    e.preventDefault()
    let data = new FormData()
    title != undefined ? data.append('title', title) : undefined
    description != undefined ? data.append('description', description) : undefined
    startDate != undefined ? data.append('startDate', startDate) : undefined
    endDate != undefined ? data.append('endDate', endDate) : undefined
    people != undefined ? data.append('amountOfPeople', people) : undefined
    location != undefined ? data.append('location', location) : undefined
    data.append('image', e.target.image.files[0])
    axios
      .put(`/api/event/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      .then()
      .catch(console.error)
  }
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <Block className={'center'}>
        <Title size="XXL"> Edit Event </Title>
      </Block>
      <Content size={'L'}>
        <form
          onSubmit={e => HandleUpdate(e, props.event._id)}
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
                onChange={e => setTitle(e.target.value)}
              />
            </Flex>
          </Block>
          <Block>
            <TextArea
              name="description"
              className={'full-width'}
              placeholder={'Description...'}
              defaultValue={props.event.description}
              onChange={e => setDescription(e.target.value)}
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
                  onChange={e => setStartDate(e.target.value)}
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
                  onChange={e => setLocation(e.target.value)}
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
                  onChange={e => setEndDate(e.target.value)}
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
                  defaultValue={'' + props.event.amountOfPeople}
                  onChange={e => setPeople(e.target.value)}
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
