import React, { Component, useState } from 'react'
import {
  Anchor,
  Block,
  Button,
  Card,
  Content,
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
    <Content>
      <Card imgSrc={request.picture}>
        <RequestEdit request={request} open={open} onClose={() => setOpen(false)} />
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
        <h5 className={'center'}>{request.type}</h5>
        <Title className={'center'}>{request.task.numberNeeded}</Title>
        <hr />
        <Flex>
          <Anchor
            className={'margin-top-normal'}
            to={`/organization/request/${request._id}`}
          >
            Details
          </Anchor>
          <FlexSpacer />
          {account && account.role === 'ORGANIZATION' ? (
            <Flex>
              <span className={'full-width flex '}>
                <Button onClick={() => setOpen(true)} className={'ActionButton1'}>
                  <FontAwesomeIcon icon={'pencil-alt'} className={'EditIcon'} />
                </Button>
              </span>
              <span className={'full-width flex'}>
                <Button
                  onClick={() => DeleteTask(request._id)}
                  className={'ActionButton12 '}
                >
                  <FontAwesomeIcon color={'red'} icon={'trash'} className={'TrashIcon'} />
                </Button>
              </span>
            </Flex>
          ) : (
            <Button type="submit" primary>
              Participate
            </Button>
          )}
        </Flex>
      </Card>
    </Content>
  )
}
