import React, { useEffect, useState } from 'react'

import axios from 'axios'

import './request-card.scss'
import FundCard from '../fundraising/fund-card'
import TaskCard from '../task/task-card'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../hooks/use-locale/use-locale'
import { Anchor, Block, Button, Card, Content, Flex, FlexSpacer, Title } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IRequestCard {
  request: any
  type?: string
}
function RequestCard({ request }: IRequestCard) {
  /* switch (request.type) {
    case 'Fundraising':
      return <FundCard request={request} />
    case 'Task':
      return <TaskCard request={request} />
    case 'Material':
      return <TaskCard request={request} />
    case 'Organ':
      return <TaskCard request={request} />
    default:
      return null
  }*/
  const { account } = useAccountState()
  return (
    <Card
      imgSrc={request.coverUri}
      className={'requestCard'}
      children={
        <>
          <Title size={'M'}>
            <Anchor to={`/request/${request._id}`}>{request.name}</Anchor>
          </Title>
          <span>
            <FontAwesomeIcon color={'blue'} icon={'donate'} className={'TrashIcon'} />
            &emsp; {request.type}
          </span>
          <br />
          <span>
            <FontAwesomeIcon color={'blue'} icon={'calendar'} />
            &emsp;
            {new Date(request.expires).toDateString()}
          </span>
          <br />
          {request.type == 'Fundraising' ? (
            <>
              <FontAwesomeIcon icon={'money-bill'} color={'green'} />
              &emsp;
              {request.fundraising.target} birr
            </>
          ) : (
            ''
          )}
          {request.type == 'Material' ? (
            <>
              <FontAwesomeIcon color={'grey'} icon={'tshirt'} />
              &emsp; 10
              {/*{request.material.quantity}*/}
            </>
          ) : (
            ''
          )}
          {request.type == 'Task' ? (
            <>
              <FontAwesomeIcon color={'blue'} icon={'tasks'} />
              &emsp;
              {request.task.type}
            </>
          ) : (
            ''
          )}
          {request.type == 'Organ' ? (
            <>
              <FontAwesomeIcon color={'rgb(223,72,61)'} icon={'hand-holding-heart'} />
              &emsp; 2{/*{request.organ.quantity}*/}
            </>
          ) : (
            ''
          )}
          {account && account.role === 'ORGANIZATION' ? (
            <Block className={'right'}>
              <span className={'requestDeleteButton'} onClick={() => alert('Abebe')}>
                <FontAwesomeIcon
                  color={'blue'}
                  icon={'pencil-alt'}
                  className={'TrashIcon'}
                />
              </span>
              &emsp;&emsp;
              <span className={'requestDeleteButton'} onClick={() => alert('Abebe')}>
                <FontAwesomeIcon color={'red'} icon={'trash'} className={'TrashIcon'} />
              </span>
            </Block>
          ) : (
            ''
          )}
        </>
      }
    />
  )
}

// @ts-ignore
export default RequestCard
