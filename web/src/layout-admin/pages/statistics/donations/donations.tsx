import React from 'react'
import './donations.scss'
import { Block, Content, Title, Image, Flex, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProgressBar } from '../../../components/progress-bar/progress-bar'
import useLocale from '../../../../shared/hooks/use-locale/use-locale'

export default function Donation() {
  let { t } = useLocale(['admin'])
  return (
    <Content className="left">
      <Yoga maxCol={2}>
        <Block>
          <Title size="L">
            {' '}
            <FontAwesomeIcon icon={'tshirt'} /> &emsp; {t`material`} {t`donated`}{' '}
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
            <FontAwesomeIcon icon={'money-bill'} /> &emsp; {t`fund collection success`}{' '}
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
            <FontAwesomeIcon icon={'tasks'} /> &emsp; {t`tasks accomplished`}{' '}
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
            <FontAwesomeIcon icon={'heart'} /> &emsp; {t`organs donated`}{' '}
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
