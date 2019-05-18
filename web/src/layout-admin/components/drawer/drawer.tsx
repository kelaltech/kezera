import React, { useState } from 'react'
import './drawer.scss'
import { Anchor, Block, Content, Drawer, Flex } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

export default function AdminDrawer(props: any) {
  let [open, setOpen] = useState(true)
  let { t } = useLocale(['admin'])
  return (
    <div className="inline-block flex full-width AdminDrawer">
      <div className={'AdminDrawerContent'}>
        <Block />
        <Block className={'flex'}>
          <FontAwesomeIcon icon={'home'} className={'primary margin-top-small flex'} />
          &emsp;
          <Anchor to={'/'} className={'flex'}>
            {' '}
            {t`dashboard`}
          </Anchor>
        </Block>
        <hr />
        <Block className={'flex'}>
          <FontAwesomeIcon
            icon={'hand-holding-heart'}
            className={'primary margin-top-small flex'}
          />
          &emsp;
          <Anchor href={'/#ORGANIZATION'} className={'no-decoration flex'}>
            {' '}
            {t`organizations`}
          </Anchor>
        </Block>
        <hr />
        <Block className={'flex'}>
          <FontAwesomeIcon icon={'users'} className={'primary margin-top-small flex'} />
          &emsp;
          <Anchor
            href={'/#VOLUNTEER'}
            className={'no-decoration no-decoration no-decoration flex'}
          >
            {' '}
            {t`volunteers`}
          </Anchor>
        </Block>
        <hr />
        <Block className={'flex'}>
          <FontAwesomeIcon icon={'donate'} className={'primary margin-top-small flex'} />
          &emsp;
          <Anchor href={'/#DONATION'} className={'no-decoration flex'}>
            {' '}
            {t`requests`}
          </Anchor>
        </Block>
        <hr />
        <Block className={'flex'}>
          <FontAwesomeIcon
            icon={'newspaper'}
            className={'primary margin-top-small flex'}
          />
          &emsp;
          <Anchor href={'/#NEWS'} className={'no-decoration flex'}>
            {' '}
            {t`news`}{' '}
          </Anchor>
        </Block>
        <hr />
        <Block className={'flex'}>
          <FontAwesomeIcon
            icon={'calendar'}
            className={'primary margin-top-small flex'}
          />
          &emsp;
          <Anchor href={'/#NEWS'} className={'no-decoration flex'}>
            {' '}
            {t`events`}
          </Anchor>
        </Block>
        <hr />
        <Block className={'flex'}>
          <FontAwesomeIcon
            icon={'user-shield'}
            className={'primary margin-top-small flex'}
          />
          &emsp;
          <Anchor to={'/verifiers'} className={'flex'}>
            {' '}
            {t`verifiers`}{' '}
          </Anchor>
        </Block>
        <hr />
        <Block className={'flex'}>
          <FontAwesomeIcon
            icon={'user-circle'}
            className={'primary margin-top-small flex'}
          />
          &emsp;
          <Anchor to={'/account'} className={'flex'}>
            {' '}
            {t`account`}{' '}
          </Anchor>
        </Block>
        <hr />
      </div>
    </div>
  )
}
