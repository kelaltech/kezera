import { Anchor, Block, Content, Page, Title, Toggle, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'
import RichPage from '../../components/rich-page/rich-page'
import { Switch } from '@material-ui/core'
import { useAccountState } from '../../../app/stores/account/account-provider'

function RequestDetail({ match }: RouteComponentProps<{ _id: string }>) {
  const [request, setRequest] = useState<any>()
  let [toggle, setToggle] = useState(false)

  let participants = function() {
    axios
      .put(`/api/request/${match.params._id}/supporting`)
      .then(resp => setToggle(!toggle))
      .catch(console.error)
  }

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
  const { account } = useAccountState()

  return !request ? null : (
    <RichPage
      ready={true}
      documentTitle={request.name}
      title={<Title size={'XL'}>{request.name}</Title>}
      description={request.description}
      covers={[request.picture]}
      actions={
        (account &&
          ((account.role === 'ORGANIZATION' && [
            {
              children: <></>
            }
          ]) ||
            (account.role === 'VOLUNTEER' && [
              {
                children: (
                  <>
                    <label>
                      <Title className="inline-block">
                        {' '}
                        <label> Support </label>{' '}
                      </Title>
                      <Switch checked={toggle} onChange={() => participants()} />
                    </label>
                  </>
                )
              }
            ]))) ||
        []
      }
    >
      <Block>
        <label className="flex padding-small">
          <FontAwesomeIcon
            className={'margin-top-large margin-right-big'}
            icon={'calendar'}
          />
          <Content transparent>
            {' '}
            <Title size={'L'}>
              {' '}
              {new Date(request.startDate).toDateString()} -{' '}
              {new Date(request.endDate).toDateString()}
            </Title>{' '}
          </Content>
        </label>
      </Block>
      <Content>
        <div style={{ backgroundImage: `${request.picture}` }} />
      </Content>

      <Block>
        <h4>Requested by</h4>
      </Block>
    </RichPage>
  )
}
export default withRouter(RequestDetail)
