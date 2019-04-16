import React from 'react'
import './donations.scss'
import { Block, Content, Title, Image, Flex, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProgressBar } from '../../../components/progress-bar/progress-bar'

export default function Donation() {
  return (
    <Content className="left">
      <Yoga maxCol={2}>
        <Block>
          <Title size="L">
            {' '}
            <FontAwesomeIcon icon={'tshirt'} /> &emsp; Material donated{' '}
          </Title>
          <ProgressBar
            width={'88%'}
            color={'#0088FE'}
            fontSize={'14px'}
            height={'30px'}
          />
        </Block>
        <Block>
          <Title size="L">
            {' '}
            <FontAwesomeIcon icon={'money-bill'} /> &emsp; Fund collection success{' '}
          </Title>
          <ProgressBar
            width={'22%'}
            color={'#00C49F'}
            fontSize={'14px'}
            height={'30px'}
          />
        </Block>
        <Block>
          <Title size="L">
            {' '}
            <FontAwesomeIcon icon={'tasks'} /> &emsp; Tasks accomplished{' '}
          </Title>
          <ProgressBar
            width={'62%'}
            color={'#FFBB28'}
            fontSize={'14px'}
            height={'30px'}
          />
        </Block>
        <Block>
          <Title size="L">
            {' '}
            <FontAwesomeIcon icon={'heart'} /> &emsp; Organs donated{' '}
          </Title>
          <ProgressBar
            width={'82%'}
            color={'#FF8042'}
            fontSize={'14px'}
            height={'30px'}
          />
        </Block>
      </Yoga>
    </Content>
  )
}
