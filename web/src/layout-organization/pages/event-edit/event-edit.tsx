import React, { useState } from 'react'
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
import { IOrganizationEventResponse } from '../../../apiv/event.apiv'
import { Schema } from 'mongoose'
import useField from '../../../shared/hooks/use-field/use-field'
import { useEventDispatch } from '../../stores/events/events.provider'
import { EditEvent } from '../../stores/events/events.action'

interface IEventEditProps {
  event: IOrganizationEventResponse
  open: boolean
  onClose: () => void
}

export default function EventEdit(props: IEventEditProps) {
  let [newEvent, setNewEvent] = useState(event)
  let eventDispatch = useEventDispatch()
  const emitChanges = (eventChanges: any): void => {
    setNewEvent({ ...newEvent, ...eventChanges })
    console.log(props.event)
  }

  const TitleInput = useField<HTMLInputElement>({
    minLength: 5,
    maxLength: 50,
    setValueHook: async value => {
      emitChanges({ title: value })
    }
  })

  const DescriptionInput = useField<HTMLInputElement>({
    minLength: 100,
    maxLength: 450,
    setValueHook: async value => {
      emitChanges({ description: value })
    }
  })

  const StartDateInput = useField<HTMLTimeElement>({
    minLength: 5,
    maxLength: 25,
    setValueHook: async value => {
      emitChanges({ startDate: value })
    }
  })
  const EndDateInput = useField<HTMLTimeElement>({
    minLength: 5,
    maxLength: 25,
    setValueHook: async value => {
      emitChanges({ endDate: value })
    }
  })
  const PeopleInput = useField<HTMLInputElement>({
    minLength: 1,
    maxLength: 10,
    setValueHook: async value => {
      emitChanges({ amountOfPeople: value })
    }
  })
  const LocationInput = useField<HTMLInputElement>({
    minLength: 3,
    maxLength: 200,
    setValueHook: async value => {
      emitChanges({ location: value })
    }
  })
  const image = useField<HTMLInputElement>()

  let HandleUpdate = function(e: any, id: string) {
    e.preventDefault()
    let body = new FormData()
    body.append('event', JSON.stringify(newEvent))
    body.append('image', e.target.image.files[0])
    EditEvent(id, body, eventDispatch)
  }
  const validationError = (error: string | null) =>
    error === null ? null : (
      <div
        className={'font-L bold fg-accent margin-left-normal margin-auto'}
        title={error}
        style={{ color: 'red', cursor: 'default' }}
      >
        !
      </div>
    )
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <Block className={'center'}>
        <Title size="XXL"> Edit Event </Title>
      </Block>
      <Content size={'L'}>
        <form
          onSubmit={e => HandleUpdate(e, props.event._id.toString())}
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
                inputRef={TitleInput.ref}
                {...TitleInput.inputProps}
                required
                defaultValue={props.event.title}
              />
              {validationError(TitleInput.error)}
            </Flex>
          </Block>
          <Block>
            <TextField
              multiline={true}
              name="description"
              className={'full-width'}
              placeholder={'Description...'}
              inputRef={DescriptionInput.ref}
              {...DescriptionInput.inputProps}
              defaultValue={props.event.description}
            />
            {validationError(DescriptionInput.error)}
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
                  defaultValue={Date.now()}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputRef={StartDateInput.ref}
                  {...StartDateInput.inputProps}
                />
                {validationError(StartDateInput.error)}
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
                  {...LocationInput.inputProps}
                  inputRef={LocationInput.ref}
                  required
                />
                {validationError(LocationInput.error)}
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
                  defaultValue={Date.now()}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputRef={EndDateInput.ref}
                  {...EndDateInput.inputProps}
                />
                {validationError(EndDateInput.error)}
              </label>
              <label className={'flex'}>
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'user-circle'}
                />
                <Input
                  name="amountOfPeople"
                  className="full-width"
                  type={'text'}
                  placeholder={'Total people'}
                  defaultValue={'' + props.event.amountOfPeople}
                  inputRef={PeopleInput.ref}
                  {...PeopleInput.inputProps}
                  required
                />
                {validationError(PeopleInput.error)}
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
