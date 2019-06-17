import React, { useEffect, useState } from 'react'
import { Anchor, Block, Button, Content, Flex, Yoga } from 'gerami'
import { RouteComponentProps, withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import './request-detail.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import RichPage from '../../components/rich-page/rich-page'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import OrganizationCard from '../../components/organization-card/organization-card'
import SpamReportDrop from '../../components/spam-report-drop/spam-report-drop'
import RequestDetailFundraising from './components/request-detail-fundraising/request-detail-fundraising'
import RequestDetailMaterial from './components/request-detail-material/request-detail-material'
import RequestDetailOrgan from './components/request-detail-organ/request-detail-organ'
import RequestDetailTask from './components/request-detail-task/request-detail-task'
import IssueCertificateDialog from '../../components/isuue-certificate-dialog/issue-certificate-dialog'
import { IVolunteerResponse } from '../../../../../api/modules/volunteer/volunteer.apiv'
import {
  IAccountPublicResponse,
  IAccountResponse
} from '../../../../../api/modules/account/account.apiv'
import AccountChip from '../../components/account-chip/account-chip'

function RequestDetail({ match }: RouteComponentProps<{ _id: string }>) {
  const { loading, t } = useLocale(['request'])

  const [error, setError] = useState()

  const request_id = match.params._id
  const [request, setRequest] = useState<IRequestResponse>()

  const FetchDetail = function() {
    Axios.get<IRequestResponse>(`/api/request/${request_id}`)
      .then(response => setRequest(response.data))
      .catch(setError)
  }
  useEffect(() => {
    FetchDetail()
  }, [request_id])

  const { account } = useAccountState()
  const { myOrganization } = useMyOrganizationState()

  const [isSpamReportDropOpen, setIsSpamReportDropOpen] = useState(false)
  const [issueDialogOpen, setIssueDialogOpen] = useState(false)

  const [requestVolunteerAccounts, setRequestVolunteerAccounts] = useState<
    IAccountPublicResponse[]
  >([])
  useEffect(() => {
    Axios.get<IAccountPublicResponse[]>(`/api/request/list-donors/${request_id}`)
      .then(response => setRequestVolunteerAccounts(response.data))
      .catch(setError)
  }, [])

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
          <Yoga maxCol={2}>
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
              {account &&
                account.role === 'ORGANIZATION' &&
                myOrganization &&
                myOrganization.account._id === account._id && (
                  <div>
                    <Button
                      className={'margin-top-big font-S light'}
                      onClick={() => setIssueDialogOpen(!issueDialogOpen)}
                      primary
                    >
                      Issue Certificate for Volunteers Involved Here
                    </Button>

                    <IssueCertificateDialog
                      open={issueDialogOpen}
                      onClose={() => setIssueDialogOpen(!issueDialogOpen)}
                      purpose={'DONATION'}
                      issueTo={request.donations
                        .filter(d => d.approved === true)
                        .map(d => d.volunteer)}
                    />
                  </div>
                )}
            </Block>
          </Content>
        )}

        <>
          {request.type === 'Fundraising' && (
            <RequestDetailFundraising request={request} />
          )}
          {request.type === 'Material' && (
            <RequestDetailMaterial
              request={request as any}
              refresh={() => FetchDetail() as any}
            />
          )}
          {request.type === 'Organ' && (
            <RequestDetailOrgan request={request} onUpdate={setRequest} />
          )}
          {request.type === 'Task' && (
            <RequestDetailTask
              refresh={() => FetchDetail()}
              request={request}
              _id={match.params._id}
            />
          )}
        </>

        {account &&
          account.role === 'ORGANIZATION' &&
          myOrganization &&
          myOrganization.account._id === account._id && (
            <Content className={'margin-top-big'}>
              <Block first className={'bold'}>
                Volunteers for This Request
              </Block>
              <hr />
              <Block last>
                {!requestVolunteerAccounts.length ? (
                  <span className={'font-S fg-blackish'}>No volunteers yet.</span>
                ) : (
                  <Yoga maxCol={4}>
                    {requestVolunteerAccounts.map(account => (
                      <AccountChip account={account} />
                    ))}
                  </Yoga>
                )}
              </Block>
            </Content>
          )}

        <Yoga maxCol={2}>
          <>
            <Content className={'margin-bottom-big top'}>
              <Block first className={'bold'}>
                {t`request:description`}
              </Block>
              <hr />
              <Block last>
                <pre>{request.description}</pre>
              </Block>
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
