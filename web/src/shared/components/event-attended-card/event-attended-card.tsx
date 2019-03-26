import React from 'react'
import './event-attended-card.scss'
import { Image, Content, Title, Block } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const users = [
  {
    Name: 'Anteneh Ashnafi',
    imageSrc: 'http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg',
    Email: 'anteneh845@gmail.com',
    Phone: '+251913055885'
  }
]
export default function EventAttendedCard(props: any) {
  return (
    <>
      {users.map(user => (
        <>
          <Block className={'center'}>
            <Image src={user.imageSrc} className={'EventAttendedPic'} />
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
              <span className={'full-width flex UserField'}>
                {props.user.phoneNumber}
              </span>
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
      ))}
    </>
  )
}
