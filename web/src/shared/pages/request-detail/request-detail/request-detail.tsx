import { Block, Content, Page, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect, useState } from 'react'
import { func } from 'prop-types'
import axios from 'axios'
import { IRequestProps } from '../../../components/request/request-card'
import { match, RouteComponentProps, withRouter } from 'react-router'
import { withMobileDialog } from '@material-ui/core'

export interface IDetailsProps {
  request: any
}

function RequestDetail({ request }: IDetailsProps) {
  return (
    <Page>
      <Content>
        <Block className="">
          <Title size={'XXL'}>{request.name}</Title>
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

export default RequestDetail
