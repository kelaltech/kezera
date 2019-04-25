import React, { useState } from 'react'
import './drawer.scss'
import { Anchor, Block, Content, Drawer, Flex } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AdminDrawer(props: any) {
  let [open, setOpen] = useState(true)
  return (
    <div className="inline-block flex full-width AdminDrawer">
      <div className={'AdminDrawerContent'}>
        <Block />
        <Block className={'flex'}>
          <FontAwesomeIcon icon={'home'} className={'primary margin-top-small flex'} />
          &emsp;
          <Anchor to={'/'} className={'flex'}>
            {' '}
            Dashboard{' '}
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
            Organizations{' '}
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
            Volunteers{' '}
          </Anchor>
        </Block>
        <hr />
        <Block className={'flex'}>
          <FontAwesomeIcon icon={'donate'} className={'primary margin-top-small flex'} />
          &emsp;
          <Anchor href={'/#DONATION'} className={'no-decoration flex'}>
            {' '}
            Donations{' '}
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
            News{' '}
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
            Events
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
            Verifiers{' '}
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
            Account{' '}
          </Anchor>
        </Block>
        <hr />
        <Block className={'flex'}>
          <FontAwesomeIcon
            icon={'door-open'}
            className={'primary margin-top-small flex'}
          />
          &emsp;
          <Anchor to={'/statistics'} className={'flex'}>
            {' '}
            Logout{' '}
          </Anchor>
        </Block>
        <hr />
      </div>
    </div>
  )
}
