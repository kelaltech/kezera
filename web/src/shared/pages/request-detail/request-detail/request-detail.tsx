import { Block, Content, Page, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'

export interface IRequestProps {
  request: any
}

export default function RequestDetail({ request }: IRequestProps) {
  return (
    <Page>
      <Content>
        <Block>
          <div>{request.name}</div>
        </Block>
        <Block>
          <p>{request.description}</p>
        </Block>

        <Yoga maxCol={2}>
          <Block>
            <label className="flex padding-small">
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'calendar'}
              />
              <Content transparent>
                {' '}
                From {request.startDate} to {request.endDate}{' '}
              </Content>
            </label>
            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'map-marker'}
              />
            </label>
          </Block>

          <Block>
            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={'smile'}
              />
              <Content transparent className={'full-width'} />
            </label>

            <label className={'flex padding-small'}>
              <FontAwesomeIcon
                className={'margin-top-small margin-right-big'}
                icon={['far', 'user-circle']}
              />
              <Content className={'full-width'} transparent />
            </label>
          </Block>
        </Yoga>
      </Content>
    </Page>
  )
}
