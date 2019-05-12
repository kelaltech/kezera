import {
  Anchor,
  Block,
  Image,
  Content,
  Flex,
  FlexSpacer,
  Page,
  Title,
  Toggle,
  Yoga,
  Button
} from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router'
import RichPage from '../../components/rich-page/rich-page'
import { Switch } from '@material-ui/core'
import { useAccountState } from '../../../app/stores/account/account-provider'
import OrganizationCard from '../../components/organization-card/organization-card'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import '../request-detail/request-information.scss'
import RequestFundDetail from './request-fund/request-fund-detail'
import RequestTaskDetail from './request-task/request-task-detail'
import RequestMaterialDetail from './request-material/request-material'
import RequestOrganDetail from './request-organ/request-organ-detail'
import SpamReportDrop from '../../components/spam-report-drop/spam-report-drop'
import { useVolunteerState } from '../../../layout-volunteer/stores/volunteer/volunteer-provider'

function RequestDetail({ match }: RouteComponentProps<{ _id: string }>) {
  const [request, setRequest] = useState<any>()

  const [isSpamReportDropOpen, setIsSpamReportDropOpen] = useState(false)
  let { myOrganization } = useMyOrganizationState()

  let isGoing = function() {
    axios
      .put(`/api/request/toggle-request-volunteer/${match.params._id}`)
      .then(resp => setRequest(resp.data))
      .catch()
  }
  let getRequest = function() {
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
  }

  useEffect(() => {
    getRequest()
    isGoing()
  }, [])
  const { account } = useAccountState()
  const { volunteer } = useVolunteerState()

  return !request ? null : (
    <RichPage
      ready={true}
      documentTitle={request.name}
      title={request.name}
      covers={[request.picture]}
      actions={
        (account &&
          ((account.role === 'VOLUNTEER' && [
            {
              children: (
                <Switch
                  checked={request.volunteers.includes(volunteer)}
                  onChange={() => isGoing()}
                >
                  Attend
                </Switch>
              )
            }
          ]) ||
            (account.role === 'ORGANIZATION' &&
              myOrganization &&
              myOrganization._id === request._by._id && [
                {
                  to: `/request/${request._id}/edit`,
                  children: <>Edit</>
                }
              ]))) ||
        []
      }
    >
      <div className={'fg-blackish padding-bottom-big'}>
        <Flex>
          {request.type} | Posted on {new Date(request._at).toDateString().substr(3)}
          <FlexSpacer />
          <Anchor to={`/organization/${request._by._id}`}>
            {request._by.displayName}
          </Anchor>
        </Flex>
      </div>
      <Title size={'L'}>Description</Title>
      <Yoga maxCol={2}>
        <div>
          {request.description}
          <Title size={'L'} className={'bold center'}>
            {request.type === 'Fundraising' && <RequestFundDetail request={request} />}
            {request.type === 'Task' && <RequestTaskDetail request={request} />}
            {request.type === 'Material' && <RequestMaterialDetail request={request} />}
            {request.type === 'Organ' && <RequestOrganDetail request={request} />}
          </Title>
        </div>
        <Content>
          {/*<img src={request.picture} style={{height: 'inherit', width: '100%'}}/>*/}
        </Content>
      </Yoga>
      <Block className={'center'}>
        <label className="flex padding-small">
          <FontAwesomeIcon className={'middle margin-right-big'} icon={'calendar'} />
          <div className={'middle'}>
            {new Date(request.startDate).toDateString().substr(3)} -{' '}
            {new Date(request.endDate).toDateString().substr(3)}
          </div>
        </label>
      </Block>
      <hr />
      <Block last className={'padding-horizontal-none'}>
        <div className={'fg-blackish padding-bottom-normal'}>Requested by: </div>
        <OrganizationCard organization={request._by} />
      </Block>
      <Block>
        <Title size={'L'}>
          <Anchor to={`/request/${request._id}/going`}>See Who's Going</Anchor>
        </Title>
      </Block>
      <Block>
        <Anchor
          onClick={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
          title={`Report Organization as Spam`}
        >
          <FontAwesomeIcon icon={'user-slash'} />
        </Anchor>
        <SpamReportDrop
          type={'REQUEST'}
          ids={[request._id]}
          open={isSpamReportDropOpen}
          onClose={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
          align={'right'}
          anchorOffset={18}
        />
      </Block>
    </RichPage>
  )
}
export default withRouter(RequestDetail)
