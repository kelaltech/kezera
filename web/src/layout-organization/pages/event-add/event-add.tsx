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
import Axios from 'axios'

interface IEventAddProps {
  open: boolean
  onClose: () => void
}

export default function EventAdd(props: any) {
  let [endDate, setEndDate] = useState()
  let [startDate, setStartDate] = useState()
  let [title, setTitle] = useState()
  let [description, setDescription] = useState()
  let [people, setPeople] = useState()
  let [location, setLocation] = useState()

  let HandleAdd = function(e: any) {
    e.preventDefault()
    let data = new FormData()
    title != undefined ? data.append('title', title) : undefined
    description != undefined ? data.append('description', description) : undefined
    startDate != undefined ? data.append('startDate', startDate) : undefined
    endDate != undefined ? data.append('endDate', endDate) : undefined
    people != undefined ? data.append('amountOfPeople', people) : undefined
    location != undefined ? data.append('location', location) : undefined
    data.append('image', e.target.image.files[0])

    Axios.post(`/api/event/create`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
      .then()
      .catch(console.error)
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <Block className={'center'}>
        <Title size="XXL"> Create Event </Title>
      </Block>
      <Content size={'L'}>
        <form onSubmit={e => HandleAdd(e)} encType={'multipart/form-data'}>
          <Block first>
            <Flex>
              <ImageInput name={'image'} required />
              <Input
                name="title"
                className={'margin-big full-width'}
                placeholder={'Title'}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </Flex>
          </Block>
          <Block>
            <TextArea
              name="description"
              className={'full-width'}
              placeholder={'Description...'}
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
                  onChange={e => setLocation(e.target.value)}
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
                  onChange={e => setEndDate(e.target.value)}
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
                  onChange={e => setPeople(e.target.value)}
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
