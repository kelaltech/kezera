import React from 'react'
import './event-attended.scss'
import { Image, Content, Title, Block } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function EventAttended() {
  return (
    <>
      <Block className={'center'}>
        <Image
          src={'http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg'}
          className={'EventAttendedPic'}
        />
      </Block>
      <Content className={'UserAttended'}>
        <Block className={'center'}>
          <Title size={'L'}>Anteneh Ashenafi</Title>
        </Block>
        <Block className={'flex center'}>
          <span>
            <FontAwesomeIcon className={'full-width'} icon="phone" />
          </span>
          <span className={'full-width margin-bottom-normal'}>+251984522sasda45</span>
        </Block>
        <Block last className={'flex center'}>
          <span>
            <FontAwesomeIcon className={'full-width'} icon="envelope" /> &emsp;
          </span>
          <span>
            <span className="full-width ">someone@gmail.com </span>
          </span>
        </Block>
      </Content>
    </>
  )
}
