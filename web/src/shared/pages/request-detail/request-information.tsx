import { Anchor, Block, Content, Page, Title, Toggle, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'
import RichPage from '../../components/rich-page/rich-page'
import { Switch } from '@material-ui/core'
import { useAccountState } from '../../../app/stores/account/account-provider'
import OrganizationCard from '../../components/organization-card/organization-card'

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
      title={request.name}
      description={request.description}
      covers={[request.picture]}
      actions={
        (account &&
          ((account.role === 'ORGANIZATION' && [
            {
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
      <Block first className={'padding-horizontal-none'}>
        <label className="flex padding-small">
          <FontAwesomeIcon
            className={'middle margin-top-large margin-right-big'}
            icon={'calendar'}
          />
          <div className={'middle'}>
              {new Date(request.startDate).toDateString()} -{' '}
              {new Date(request.endDate).toDateString()}
          </div>
        </label>
      </Block>

      <hr />
      <Block last className={'padding-horizontal-none'}>
        <div className={'fg-blackish padding-bottom-normal'}>Requested by: </div>
        <OrganizationCard organization={request._by} />
      </Block>
    </RichPage>
  )
}
export default withRouter(RequestDetail)
