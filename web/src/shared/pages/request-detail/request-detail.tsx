import React, { useEffect, useState } from 'react'
import { Anchor, Block, Content, Flex, FlexSpacer, Title, Yoga } from 'gerami'
import { RouteComponentProps, withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Switch } from '@material-ui/core'
import Axios from 'axios'

import './request-detail.scss'
import RichPage from '../../components/rich-page/rich-page'
import { useAccountState } from '../../../app/stores/account/account-provider'
import OrganizationCard from '../../components/organization-card/organization-card'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import RequestFundDetail from './request-fund/request-fund-detail'
import RequestTaskDetail from './request-task/request-task-detail'
import RequestMaterialDetail from './request-material/request-material'
import RequestOrganDetail from './request-organ/request-organ-detail'
import SpamReportDrop from '../../components/spam-report-drop/spam-report-drop'
import { useVolunteerState } from '../../../layout-volunteer/stores/volunteer/volunteer-provider'
import useLocale from '../../hooks/use-locale/use-locale'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'

function RequestDetail({ match }: RouteComponentProps<{ _id: string }>) {
  const { loading, t } = useLocale(['request'])

  const [error, setError] = useState()
  const [ready, setReady] = useState(false)

  const request_id = match.params._id
  const [request, setRequest] = useState<IRequestResponse>()

  useEffect(() => {
    setReady(false)
    Axios.get<IRequestResponse>(`/api/request/${request_id}`)
      .then(response => setRequest(response.data))
      .catch(setError)
      .finally(() => setReady(true))
  }, [request_id])

  const { account } = useAccountState()
  const { volunteer } = useVolunteerState()
  const { myOrganization } = useMyOrganizationState()

  const [isSpamReportDropOpen, setIsSpamReportDropOpen] = useState(false)

  /*
  // todo ?
  let [volunteers, setVolunteers] = useState<any[]>([])
  let toggleRequestVolunteer = function() {
    Axios
      .put(`/api/request/toggle-request-volunteer/${match.params._id}`)
      .then(resp => setRequest(resp.data))
      .catch()
  }
  useEffect(() => {
    Axios.get(`/api/request/list-request-volunteers/${match.params._id}`)
      .then((resp: any) => setVolunteers(resp.data))
      .catch(console.error)
  }, [])
  */

  return (
    loading ||
    (!request ? null : (
      <RichPage
        error={error}
        onErrorClose={setError}
        ready={true}
        documentTitle={request.name}
        title={request.name}
        covers={request.coverUri ? [request.coverUri] : undefined}
        actions={
          (account &&
            ((account.role === 'VOLUNTEER' && [
              {
                children: (
                  <>
                    {/*
                  // todo: ?
                  <Switch
                    checked={
                      volunteer &&
                      request.volunteers.map((v: any) => v._id).includes(volunteer._id)
                    }
                    onChange={() => {
                      toggleRequestVolunteer()
                    }}
                  >
                    Attend
                  </Switch>
                  */}
                  </>
                )
              }
            ]) ||
              (account.role === 'ORGANIZATION' &&
                myOrganization &&
                myOrganization._id === request._by._id && [
                  {
                    to: `/request/${request._id}/edit`,
                    children: (
                      <>
                        <FontAwesomeIcon
                          icon={'pencil-alt'}
                          className={'margin-right-normal font-S'}
                        />
                        {t`edit`}
                      </>
                    )
                  }
                ]))) ||
          []
        }
        description={
          <Yoga maxCol={2} className={'yoga-in-rich-page'}>
            <Flex>
              <span>{request.type}</span>
              <span className={'padding-horizontal-normal'} style={{ opacity: 0.14 }}>
                |
              </span>
              <span>
                {t`request:posted-on`} {new Date(request._at).toDateString().substr(3)}
              </span>
            </Flex>

            <Flex className={'right'}>
              <Anchor to={`/organization/${request._by._id}`}>
                {request._by.account.displayName}
              </Anchor>
              <span className={'padding-horizontal-normal'} style={{ opacity: 0.14 }}>
                |
              </span>

              <Anchor
                onClick={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
                title={`Report Organization as Spam`}
              >
                <FontAwesomeIcon icon={'user-slash'} />
              </Anchor>
              <span className={'absolute inline-block padding-top-big'}>
                <SpamReportDrop
                  type={'REQUEST'}
                  ids={[request._id]}
                  open={isSpamReportDropOpen}
                  onClose={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
                  align={'right'}
                />
              </span>
            </Flex>
          </Yoga>
        }
      >
        {request.status === 'CLOSED' && (
          <Content className={'fg-white bg-accent'}>
            <Block first last className={'center bold'}>
              This request is has been closed!
            </Block>
          </Content>
        )}

        <Yoga maxCol={2} className={'yoga-in-rich-page'}>
          <>
            <Content className={'margin-bottom-big top'}>
              <Block first className={'bold'}>
                {t`request:description`}
              </Block>
              <hr />
              <Block last>{request.description}</Block>
            </Content>

            {/* todo: continue here... with files... */}
            <Content className={'margin-bottom-big top'}>
              <Block first className={'bold'}>
                Files
              </Block>
              <hr />
              {!request.fileUris || !request.fileUris.length ? (
                <Block last className={'fg-blackish font-S'}>
                  No files have been attached with this request.
                </Block>
              ) : (
                <Block>
                  {request.fileUris.map((fileUri, i) => (
                    <Anchor
                      href={fileUri}
                      target={'_blank'}
                      rel={'noopener'}
                      className={'block margin-bottom-big'}
                      download
                    >
                      Upload #{i + 1}
                    </Anchor>
                  ))}
                </Block>
              )}
            </Content>
          </>

          <>
            {request.status === 'OPEN' && request.expires && (
              <Content className={'margin-bottom-normal'}>
                <Block first last>
                  <FontAwesomeIcon
                    className={'middle margin-right-big'}
                    icon={'calendar'}
                  />
                  <span className={'middle'}>
                    This request is open and expires on{' '}
                    {new Date(request.expires).toLocaleDateString()}.
                  </span>
                </Block>
              </Content>
            )}

            <Content className={'top'}>
              <Block first className={'bold'}>
                {t`request:requested-by`}
              </Block>
              <hr />
              <Block last>
                <OrganizationCard organization={request._by} />
              </Block>
            </Content>
          </>
        </Yoga>

        <hr className={'margin-bottom-big'} />

        <>
          {request.type === 'Fundraising' && <RequestFundDetail request={request} />}
          {request.type === 'Task' && <RequestTaskDetail request={request} />}
          {request.type === 'Material' && <RequestMaterialDetail request={request} />}
          {request.type === 'Organ' && <RequestOrganDetail request={request} />}
        </>
      </RichPage>
    ))
  )
}
export default withRouter(RequestDetail)
