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

import './fund-card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccountState } from '../../../app/stores/account/account-provider'
import RequestEdit from '../../../layout-organization/pages/request/request-edit'
import EditFund from '../../../layout-organization/pages/fundraising/fund-edit'

interface IFundProps {
  request: any
}

export default function FundCard({ request }: IFundProps) {
  let [open, setOpen] = useState(false)
  const { account } = useAccountState()

  let DeleteRequest = function(id: any) {
    if (window.confirm('Are you sure?')) {
      axios.delete(`/api/request/${request._id}`).catch(console.error)
    }
  }

  return (
    <Content className={'fund-card'}>
      <RequestEdit request={request} open={open} onClose={() => setOpen(false)} />
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
        <h5 className={'center'}>{request.type}</h5>
        <Title className={'center'} size={'S'}>
          {request.fundraising.amount} {request.fundraising.currency}
        </Title>
        <hr />
        <Flex>
          <Anchor
            className={'margin-top-normal'}
            to={`/organization/request/${request._id}`}
          >
            Details
          </Anchor>
          <FlexSpacer />
          <Flex>
            {account && account.role === 'ORGANIZATION' ? (
              <Flex>
                <Button onClick={() => setOpen(true)} className={'ActionButton'}>
                  <FontAwesomeIcon icon={'pencil-alt'} className={'EditIcon'} />
                </Button>
                <FlexSpacer />
                <Button
                  onClick={() => DeleteRequest(request._id)}
                  className={'ActionButton'}
                >
                  <FontAwesomeIcon color={'red'} icon={'trash'} className={'TrashIcon'} />
                </Button>
              </Flex>
            ) : (
              <Button>Donate</Button>
            )}
          </Flex>
        </Flex>
      </Card>
    </Content>
  )
}
