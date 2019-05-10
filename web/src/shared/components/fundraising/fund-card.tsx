import React, { Component, useState } from 'react'
import {} from 'recharts'
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
      <Card imgSrc={request.picture}>
        <Title size={'L'} className={'center'}>
          {request.name}
        </Title>
        <hr />
        <Flex>
          <label>{new Date(request.startDate).toDateString().substr(3)}</label>
          <FlexSpacer />
          <label>-</label>
          <FlexSpacer />
          <label>{new Date(request.endDate).toDateString().substr(3)}</label>
        </Flex>
        <h5 className={'center'}>{request.type}</h5>
        <Title className={'center'} size={'S'}>
          {request.fundraising.amount}{' '}
          {request.fundraising.currency === 'ETB' ? 'ETB' : null}
          {request.fundraising.currency === 'EURO' ? '€' : null}
          {request.fundraising.currency === 'POUND' ? '£' : null}
          {request.fundraising.currency === 'USD' ? '$' : null}
        </Title>
        <hr />
        <Flex>
          {account && account.role === 'ORGANIZATION' ? (
            <Flex>
              <span className={'full-width flex'}>
                <Button
                  onClick={() => DeleteRequest(request._id)}
                  className={'ActionButton12 '}
                >
                  <FontAwesomeIcon color={'red'} icon={'trash'} className={'TrashIcon'} />
                </Button>
              </span>
            </Flex>
          ) : (
            <Button>Donate</Button>
          )}
          <FlexSpacer />
          <Anchor
            className={'margin-top-normal'}
            to={`/organization/request/${request._id}`}
          >
            Details
          </Anchor>
        </Flex>
      </Card>
    </Content>
  )
}
