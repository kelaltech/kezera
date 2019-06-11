import React, { useEffect, useState } from 'react'
import { Anchor, Block, Content, Flex, FlexSpacer, Title, Yoga } from 'gerami'
import { RouteComponentProps, withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import './request-detail.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import RichPage from '../../components/rich-page/rich-page'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { useVolunteerState } from '../../../layout-volunteer/stores/volunteer/volunteer-provider'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import OrganizationCard from '../../components/organization-card/organization-card'
import SpamReportDrop from '../../components/spam-report-drop/spam-report-drop'
import RequestDetailFundraising from './components/request-detail-fundraising/request-detail-fundraising'
import RequestDetailMaterial from './components/request-detail-material/request-detail-material'
import RequestDetailOrgan from './components/request-detail-organ/request-detail-organ'
import RequestDetailTask from './components/request-detail-task/request-detail-task'

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
              ])) ||
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
              <Anchor to={`/o/${request._by._id}`}>
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

        <>
          {request.type === 'Fundraising' && (
            <RequestDetailFundraising request={request} />
          )}
          {request.type === 'Material' && <RequestDetailMaterial request={request} />}
          {request.type === 'Organ' && <RequestDetailOrgan request={request} />}
          {request.type === 'Task' && <RequestDetailTask request={request} />}
        </>

        <Yoga maxCol={2} className={'yoga-in-rich-page'}>
          <>
            <Content className={'margin-bottom-big top'}>
              <Block first className={'bold'}>
                <pre>{t`request:description`}</pre>
              </Block>
              <hr />
              <Block last>{request.description}</Block>
            </Content>

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
      </RichPage>
    ))
  )
}

export default withRouter(RequestDetail)
