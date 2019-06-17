import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Anchor, Block, Content, Flex, FlexSpacer, Yoga } from 'gerami'
import Axios from 'axios'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { ISpamReportResponse } from '../../../../../api/modules/spam/spam.apiv'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import RequestCard from '../../../shared/components/request/request-card'
import EventCard from '../../../shared/components/event-card/event-card'
import NewsCard from '../../../shared/components/news-card/news-card'
import { IOrganizationResponse } from '../../../apiv/organization.apiv'
import { IRequestResponse } from '../../../apiv/request.apiv'
import { IOrganizationEventResponse } from '../../../apiv/event.apiv'
import { INewsResponse } from '../../../apiv/news.apiv'

function SpamReportDetail({ history, match }: RouteComponentProps<{ _id: string }>) {
  const { t, loading } = useLocale([])

  const [error, setError] = useState()
  const [spamReport, setSpamReport] = useState<ISpamReportResponse>()
  const [sending, setSending] = useState(false)

  const [organization, setOrganization] = useState<IOrganizationResponse>()
  const [request, setRequest] = useState<IRequestResponse>()
  const [event, setEvent] = useState<IOrganizationEventResponse>()
  const [news, setNews] = useState<INewsResponse>()

  const load = async (): Promise<void> => {
    try {
      const data = (await Axios.get<ISpamReportResponse>(
        `/api/spam/get-report/${match.params._id}`,
        { withCredentials: true }
      )).data

      switch (data.type) {
        case 'ORGANIZATION':
          setOrganization(
            (await Axios.get<IOrganizationResponse>(
              `/api/organization/get/${data.ids[0]}`
            )).data
          )
          break
        case 'REQUEST':
          setRequest(
            (await Axios.get<IRequestResponse>(`/api/request/${data.ids[0]}`)).data
          )
          break
        case 'EVENT':
          setEvent(
            (await Axios.get<IOrganizationEventResponse>(`/api/event/${data.ids[0]}`))
              .data
          )
          break
        case 'NEWS':
          setNews((await Axios.get<INewsResponse>(`/api/news/${data.ids[0]}`)).data)
          break
        default:
          throw new Error('Unknown spam report type.')
      }

      setError(undefined)
      setSpamReport(data)
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    load().catch(setError)
  }, [match.params._id])

  const handleHandleSpam = () => {
    if (!window.confirm(`Are you sure you want to handle this item as a spam?`)) return

    setSending(true)
    Axios.delete(`/api/spam/handle/${match.params._id}`)
      .then(() => history.push('/spam-reports'))
      .catch(setError)
      .finally(() => setSending(false))
  }

  const handleIgnoreReport = () => {
    if (!window.confirm(`Are you sure you want to ignore this spam report?`)) return

    setSending(true)
    Axios.delete(`/api/spam/ignore-report/${match.params._id}`)
      .then(() => history.push('/spam-reports'))
      .catch(setError)
      .finally(() => setSending(false))
  }
  return (
    loading || (
      <RichPage
        ready={!!spamReport}
        error={error}
        onErrorClose={setError}
        documentTitle={`Spam Report Detail`}
        title={`Spam Report Detail`}
        description={
          !spamReport ? (
            undefined
          ) : (
            <Flex>
              <span>{spamReport.type}</span>
              <span className={'padding-horizontal-normal'} style={{ opacity: 0.14 }}>
                |
              </span>
              <span>Reported on {new Date(spamReport._at).toLocaleString()}.</span>
              <FlexSpacer />

              <Anchor
                to={`/${spamReport.type.toLowerCase()}/${spamReport.ids[0]}`}
                target={'_blank'}
                rel={'noopener'}
              >
                Open Item Detail
              </Anchor>
            </Flex>
          )
        }
        actions={[
          {
            disabled: sending,
            onClick: handleIgnoreReport,
            primary: false,
            className: 'margin-vertical-auto',
            children: (
              <>
                <FontAwesomeIcon icon={'trash'} />
                <span className={'margin-left-normal'}>Ignore Report</span>
              </>
            )
          },
          {
            disabled: sending,
            onClick: handleHandleSpam,
            primary: true,
            className: 'margin-vertical-auto',
            children: (
              <>
                <FontAwesomeIcon icon={'check'} />
                <span className={'margin-left-normal'}>Handle as Spam</span>
              </>
            )
          }
        ]}
      >
        {spamReport && (
          <Yoga maxCol={2} className={'yoga-in-rich-page'}>
            <Content className={'top'}>
              <Block first>
                <h3>Item Description</h3>
              </Block>
              <hr />

              <Block>
                {spamReport.description || (
                  <span className={'italic fg-blackish'}>
                    No description message from the reporter.
                  </span>
                )}
              </Block>

              <Block>
                <hr />
              </Block>

              <Block last>
                {spamReport.type === 'ORGANIZATION' ? (
                  <OrganizationCard organization={organization!} />
                ) : spamReport.type === 'REQUEST' ? (
                  <RequestCard request={request!} />
                ) : spamReport.type === 'EVENT' ? (
                  <EventCard event={event!} />
                ) : spamReport.type === 'NEWS' ? (
                  <NewsCard {...(news as any)} />
                ) : (
                  'Unknown Item Type'
                )}
              </Block>
            </Content>

            <Content className={'top'}>
              <Block first>
                <h3>Reporter</h3>
              </Block>
              <hr />

              <Block>
                <Flex>
                  <div
                    className={'light fg-blackish padding-right-normal'}
                    style={{ flex: 2 }}
                  >
                    Display Name:
                  </div>
                  <div style={{ flex: 5 }}>{spamReport.reporter.displayName}</div>
                </Flex>
              </Block>

              <Block>
                <Flex>
                  <div
                    className={'light fg-blackish padding-right-normal'}
                    style={{ flex: 2 }}
                  >
                    Email:
                  </div>
                  <div style={{ flex: 5 }}>
                    <Anchor href={`mailto:${spamReport.reporter.email}`}>
                      {spamReport.reporter.email}
                    </Anchor>
                  </div>
                </Flex>
              </Block>

              {!spamReport.reporter.phoneNumber ? null : (
                <Block>
                  <Flex>
                    <div
                      className={'light fg-blackish padding-right-normal'}
                      style={{ flex: 2 }}
                    >
                      Phone:
                    </div>
                    <div style={{ flex: 5 }}>
                      <Anchor href={`callto:${spamReport.reporter.phoneNumber}`}>
                        {spamReport.reporter.phoneNumber}
                      </Anchor>
                    </div>
                  </Flex>
                </Block>
              )}

              <Block>
                <Flex>
                  <div
                    className={'light fg-blackish padding-right-normal'}
                    style={{ flex: 2 }}
                  >
                    Joined on:
                  </div>
                  <div style={{ flex: 5 }}>
                    {new Date(spamReport.reporter._at).toDateString()}
                  </div>
                </Flex>
              </Block>

              <Block last>
                <Flex>
                  <div
                    className={'light fg-blackish padding-right-normal'}
                    style={{ flex: 2 }}
                  >
                    Sent Report on:
                  </div>
                  <div style={{ flex: 5 }}>{new Date(spamReport._at).toDateString()}</div>
                </Flex>
              </Block>
            </Content>
          </Yoga>
        )}
      </RichPage>
    )
  )
}

export default SpamReportDetail
