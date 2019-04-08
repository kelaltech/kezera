import React, { Component, useState } from 'react'
import {
  Anchor,
  Block,
  Button,
  Card,
  Flex,
  FlexSpacer,
  Image,
  Loading,
  Page,
  SlideShow,
  Title,
  Yoga
} from 'gerami'
import axios from 'axios'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RequestEdit from '../../../layout-organization/pages/request/request-edit'

export interface ITaskProps {
  request: any
}

export default function TaskCard({ request }: ITaskProps) {
  let [open, setOpen] = useState(false)
  const { account } = useAccountState()

  let DeleteTask = function(id: any) {
    if (window.confirm('Are you sure?')) {
      axios.delete(`/api/request/${request.id}`).catch(console.error)
    }
  }

  return (
    <Card imgSrc={request.picture}>
      <Title size={'L'} className={'center'}>
        {request.name}
      </Title>
      <hr />
      <Flex>
        <label>{new Date(request.startDate).toDateString()}</label>
        <FlexSpacer />
        <label>-</label>
        <FlexSpacer />
        <label>{new Date(request.endDate).toDateString()}</label>
      </Flex>
      <Flex>
        <label>{new Date(request.task.startTime).toDateString()}</label>
        <FlexSpacer />
        <label>{new Date(request.task.endTime).toDateString()}</label>
      </Flex>
      <h5>{request.type}</h5>
      <label>{request.task.numberNeeded}</label>
      <hr />
      <Flex>
        <Anchor
          className={'margin-top-normal'}
          to={`/organization/request/${request._id}`}
        >
          Details
        </Anchor>
        <FlexSpacer />
        <span className={'full-width flex '}>
          <Button onClick={() => setOpen(true)} className={'ActionButton'}>
            <FontAwesomeIcon icon={'pencil-alt'} className={'EditIcon'} />
          </Button>
        </span>
        <span className={'full-width flex'}>
          <Button onClick={() => DeleteTask(request._id)} className={'ActionButton '}>
            <FontAwesomeIcon icon={'trash'} className={'TrashIcon'} />
          </Button>
        </span>
        <Button type="submit" primary>
          Participate
        </Button>
      </Flex>
    </Card>
  )
}
