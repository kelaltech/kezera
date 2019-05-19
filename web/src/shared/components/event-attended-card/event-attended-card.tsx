import React from 'react'
import './event-attended-card.scss'
import { Image, Content, Title, Block } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IAccount } from '../../../../../api/models/account/account.model'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'

interface IEventAttendedProps {
  user: IAccountResponse
}

export default function EventAttendedCard(props: IEventAttendedProps) {
  let user = props.user
  return (
    <>
      <Block className={'center'}>
        <Image
          src={`/api/account/get-photo/${user._id}`}
          className={'EventAttendedPic'}
        />
      </Block>
      <Content className={'UserAttended'}>
        <Block className={'center'}>
          <Title size={'L'}>{props.user.displayName}</Title>
        </Block>
        <Block className={'flex'}>
          <span className={' flex'}>
            <FontAwesomeIcon icon="phone" />
          </span>
          &emsp;
          <span className={'full-width flex UserField'}>{props.user.phoneNumber}</span>
        </Block>
        <Block last className={'flex'}>
          <span className={'flex'}>
            <FontAwesomeIcon icon="envelope" />
          </span>
          &emsp;
          <span className="flex full-width">
            <span className="full-width flex UserField">{props.user.email}</span>
          </span>
        </Block>
      </Content>
    </>
  )
}
