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
import { string } from 'prop-types'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

interface IEventEditProps {
  event: IOrganizationEventResponse
  open: boolean
  onClose: () => void
}

export default function EventEdit(props: IEventEditProps) {
  const { loading, t } = useLocale(['event'])

  let [newEvent, setNewEvent] = useState({
    title: props.event.title,
    description: props.event.description,
    amountOfPeople: props.event.amountOfPeople,
    startDate: props.event.startDate,
    endDate: props.event.endDate,
    location: props.event.location
  })
  let eventDispatch = useEventDispatch()

  let HandleUpdate = function(e: any, id: string) {
    e.preventDefault()
    let body = new FormData()
    body.append('event', JSON.stringify(newEvent))
    body.append('image', e.target.image.files[0])
    EditEvent(id, body, eventDispatch)
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <Block className={'center'}>
        <Title size="XXL">
          {' '}
          {t`edit`} {t`event`}{' '}
        </Title>
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
                placeholder={t`name`}
                required
                defaultValue={props.event.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Flex>
          </Block>
          <Block>
            <TextField
              multiline={true}
              name="description"
              className={'full-width'}
              placeholder={'Description...'}
              defaultValue={props.event.description}
              onChange={e =>
                setNewEvent({ ...newEvent, description: e.target.value.trim() })
              }
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
                  label={t`start date`}
                  type="date"
                  defaultValue={new Date().toLocaleDateString()}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e =>
                    setNewEvent({ ...newEvent, startDate: new Date(e.target.value) })
                  }
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
                  placeholder={t`location`}
                  defaultValue={props.event.location}
                  onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
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
                  label={t`end date`}
                  type="date"
                  defaultValue={new Date().toLocaleDateString()}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e =>
                    setNewEvent({ ...newEvent, endDate: new Date(e.target.value) })
                  }
                />
              </label>
              <label className={'flex'}>
                <FontAwesomeIcon
                  className={'margin-top-big margin-right-normal'}
                  icon={'user-circle'}
                />
                <Input
                  name="amountOfPeople"
                  className="full-width"
                  type={'number'}
                  placeholder={t`amount of people`}
                  defaultValue={'' + props.event.amountOfPeople}
                  onChange={e =>
                    setNewEvent({
                      ...newEvent,
                      amountOfPeople: Number.parseInt(e.target.value)
                    })
                  }
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
              {t`update`}
            </Button>
            &emsp;
            <Button onClick={() => props.onClose()} className={''}>
              {t`cancel`}
            </Button>
          </Block>
        </form>
      </Content>
    </Dialog>
  )
}
