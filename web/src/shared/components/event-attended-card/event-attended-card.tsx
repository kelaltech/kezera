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
export default function EventAttendedCard() {
  return (
    <>
      {users.map(user => (
        <>
          <Block className={'center'}>
            <Image src={user.imageSrc} className={'EventAttendedPic'} />
          </Block>
          <Content className={'UserAttended'}>
            <Block className={'center'}>
              <Title size={'L'}>{user.Name}</Title>
            </Block>
            <Block className={'flex'}>
              <span className={' flex'}>
                <FontAwesomeIcon icon="phone" />
              </span>
              &emsp;
              <span className={'full-width flex UserField'}>{user.Phone}</span>
            </Block>
            <Block last className={'flex'}>
              <span className={'flex'}>
                <FontAwesomeIcon icon="envelope" />
              </span>
              &emsp;
              <span className="flex full-width">
                <span className="full-width flex UserField">{user.Email}</span>
              </span>
            </Block>
          </Content>
        </>
      ))}
    </>
  )
}
