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

export interface IOrganProps {
  request: any
}

export default function OrganCard({ request }: IOrganProps) {
  let [open, setOpen] = useState(false)
  const { account } = useAccountState()

  let deleteOrgan = function(id: any) {
    if (window.confirm('Are you sure?')) {
      axios.delete(`/api/request/${request.id}`).catch(console.error)
    }
  }

  return (
    <Content>
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
        <Title className={'center'}>{request.organ.organType}</Title>
        <hr />

        <Flex>
          {account && account.role === 'ORGANIZATION' ? (
            <Flex>
              <span className={'full-width flex'}>
                <Button
                  onClick={() => deleteOrgan(request._id)}
                  className={'ActionButton12 '}
                >
                  <FontAwesomeIcon color={'red'} icon={'trash'} className={'TrashIcon'} />
                </Button>
              </span>
            </Flex>
          ) : (
            <Button>Participate</Button>
          )}
          <FlexSpacer />
          <Anchor className={'margin-top-normal'} to={`/request/${request._id}`}>
            Details
          </Anchor>
        </Flex>
      </Card>
    </Content>
  )
}
