import { Block, Content, Page, Title, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'
import RichPage from '../../components/rich-page/rich-page'

function RequestDetail({ match }: RouteComponentProps<{ _id: string }>) {
  const [request, setRequest] = useState<any>()

  useEffect(() => {
    axios
      .get(`/api/request/${match.params._id}`)
      .then(res => {
        setRequest(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return !request ? null : (
    <RichPage
      ready={true}
      documentTitle={request.name}
      title={<Title size={'XL'}>{request.name}</Title>}
      description={request.description}
    >
      <Title size={'XL'}>{request.name}</Title>
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
        </Block>
      </Yoga>
    </RichPage>
  )
}
export default withRouter(RequestDetail)
