import React, { Component } from 'react'
import { Anchor, Block, Page, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const contactInfo = {
  Organization: 'Macedonia',
  Email: 'Macedonia@gmail.com',
  PhoneNumber: ['+251963852741', '+251963852741']
}

export default class RequestContact extends Component<any> {
  render() {
    return (
      <Page>
        <Block>
          <Title size={'XXL'} className={'center'}>
            {contactInfo.Organization}
          </Title>
        </Block>
        <Block className={'center'}>
          <Anchor className={'center'}>View Profile</Anchor>
        </Block>
        <hr />
        <Block>
          <Title size={'L'}>Contact Information</Title>
          <Block first>
            <Anchor>{contactInfo.PhoneNumber + '/n'}</Anchor>
          </Block>
          <Block>
            <label>{contactInfo.Email}</label>
          </Block>
        </Block>
        <Block>
          <Title size={'L'}>Also connect through</Title>
          <Block>
            <label className={'flex'}>
              <FontAwesomeIcon
                className={'margin-top-big margin-right-normal'}
                icon={['fab', 'facebook']}
              />
            </label>
          </Block>
        </Block>
      </Page>
    )
  }
}
