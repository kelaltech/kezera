import React, { Component, useEffect, useState } from 'react'
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

import './request-card.scss'
import EventEdit from '../../../layout-organization/pages/event-edit/event-edit'
import RequestEdit from '../../../layout-organization/pages/request/request-edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccountState } from '../../../app/stores/account/account-provider'

export interface IRequestProps {
  request: any
  setOpen?: any
}

export default function RequestCard({ request }: IRequestProps) {
  let [open, setOpen] = useState(false)
  const { account } = useAccountState()
  const [requests, setRequests] = useState<any>([])

  useEffect(() => {
    axios
      .get(`/api/request/${request.id}`)
      .then(res => {
        setRequests(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  let DeleteRequest = function(id: any) {
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
      <h5>{request.type}</h5>
      <hr />
      <Flex>
        <Anchor
          className={'margin-top-normal'}
          to={'/organization/request/' + request._id}
        >
          Details
        </Anchor>
        <FlexSpacer />
        {account && account.role === 'ORGANIZATION' ? (
          <Block>
            <span className={'full-width flex '}>
              <Button onClick={() => setOpen(true)} className={'ActionButton'}>
                <FontAwesomeIcon icon={'pencil-alt'} className={'EditIcon'} />
              </Button>
            </span>
            <span className={'full-width flex'}>
              <Button
                onClick={() => DeleteRequest(request._id)}
                className={'ActionButton '}
              >
                <FontAwesomeIcon icon={'trash'} className={'TrashIcon'} />
              </Button>
            </span>
          </Block>
        ) : (
          <Button type="submit" primary>
            Support
          </Button>
        )}
      </Flex>
    </Card>
  )
}
