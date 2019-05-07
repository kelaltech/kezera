import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Anchor, Content, Flex, FlexSpacer, Warning } from 'gerami'
import { IButtonProps } from 'gerami/src/components/Button/Button'
import { Tab, Tabs } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as qs from 'qs'
import Axios from 'axios'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../apiv/organization.apiv'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import {
  useVolunteerDispatch,
  useVolunteerState
} from '../../../layout-volunteer/stores/volunteer/volunteer-provider'
import RichPage from '../../../shared/components/rich-page/rich-page'
import OrganizationDetailInfo from './components/organization-detail-info/organization-detail-info'
import OrganizationDetailRequests from './components/organization-detail-requests/organization-detail-requests'
import OrganizationDetailEvents from './components/organization-detail-events/organization-detail-events'
import OrganizationDetailNews from './components/organization-detail-news/organization-detail-news'
import { reloadSubscriptions } from '../../../layout-volunteer/stores/volunteer/volunteer-actions'
import SpamReportDrop from '../../components/spam-report-drop/spam-report-drop'

type ITabName = 'info' | 'requests' | 'events' | 'news'

type Props = RouteComponentProps<{ _id: string }> & {
  /**
   * @default false
   */
  isApplication?: boolean
  errorOverride?: any
  organizationOverride?: IOrganizationResponse
  actionsOverride?: IButtonProps[]
}

function OrganizationDetail({
  history,
  match,
  isApplication,
  errorOverride,
  organizationOverride,
  actionsOverride
}: Props) {
  const { t } = useLocale(['organization'])

  const [error, setError] = useState()
  const [organization, setOrganization] = useState<IOrganizationResponse | undefined>(
    organizationOverride
  )

  const [isSpamReportDropOpen, setIsSpamReportDropOpen] = useState(false)

  const { account } = useAccountState()
  const { myOrganization } = useMyOrganizationState()
  const { subscriptions } = useVolunteerState()
  const volunteerDispatch = useVolunteerDispatch()

  const [waitingForMe, setWaitingForMe] = useState(false)
  const [requestedId, setRequestedId] = useState<string>()

  const loadBy_id = async (_id: string): Promise<void> => {
    try {
      const response = await Axios.get<IOrganizationResponse>(
        `/api/organization/get/${_id}`
      )
      if (!response.data || !response.data._id)
        return setError(`Organization response is malformed.`)

      setOrganization(response.data)
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    if (organizationOverride) {
      setOrganization(organizationOverride)
    } else if (requestedId === match.params._id) {
      return
    } else if (match.params._id.toLowerCase() === 'me') {
      setWaitingForMe(true)

      if (myOrganization) {
        setError(undefined)
        setWaitingForMe(false)
        setRequestedId(myOrganization._id)

        setOrganization(myOrganization)
      }
    } else if (waitingForMe) {
      return
    } else {
      setError(undefined)
      setRequestedId(match.params._id)

      setOrganization(undefined)

      loadBy_id(match.params._id).catch(setError)
    }
  }, [match.params._id, myOrganization])

  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const [tab, setTab] = useState<ITabName>(query.tab || 'info')

  useEffect(() => {
    if (isApplication) return setTab('info')

    switch (query.tab as ITabName | undefined) {
      default:
      case 'info':
        return setTab('info')
      case 'requests':
        return setTab('requests')
      case 'events':
        return setTab('events')
      case 'news':
        return setTab('news')
    }
  }, [query.tab])

  const handleSubscribe = (): void => {
    Axios.put(`/api/organization/subscribe/${organization!._id}`, undefined, {
      withCredentials: true
    })
      .then(() => reloadSubscriptions(volunteerDispatch))
      .then(() => loadBy_id(organization!._id))
      .catch(setError)
  }

  const handleUnsubscribe = (): void => {
    Axios.put(`/api/organization/unsubscribe/${organization!._id}`, undefined, {
      withCredentials: true
    })
      .then(() => reloadSubscriptions(volunteerDispatch))
      .then(() => loadBy_id(organization!._id))
      .catch(setError)
  }

  return (
    <RichPage
      covers={organization ? [organization.logoUri as string] : []}
      photo={organization && organization.logoUri}
      ready={!!(organization || error)}
      languageNamespaces={['organization']}
      error={errorOverride || error}
      onErrorClose={setError}
      documentTitle={organization && organization.account.displayName}
      title={
        organization && (
          <Anchor to={`/organization/${organization._id}`}>
            <h1>{organization.account.displayName}</h1>
          </Anchor>
        )
      }
      description={
        organization &&
        (!organization.motto && !organization.website ? (
          undefined
        ) : (
          <Flex>
            <span>{organization.type}</span>
            <span className={'padding-horizontal-normal'} style={{ opacity: 0.14 }}>
              |
            </span>
            <span>
              {organization.subscribersCount || 'NO'} SUBSCRIBER
              {organization.subscribersCount === 1 ? '' : 'S'}
            </span>
            {!organization.motto ? null : (
              <>
                <span>{organization.type}</span>
                <span className={'padding-horizontal-normal'} style={{ opacity: 0.14 }}>
                  |
                </span>
                <span>
                  {!isApplication
                    ? `${organization.subscribersCount || 'NO'} SUBSCRIBER${
                        organization.subscribersCount === 1 ? '' : 'S'
                      }`
                    : `Sent on ${new Date(organization._at).toDateString().substr(3)}`}
                </span>
              </>
            )}
            <FlexSpacer />
            {organization.account.status !== 'ACTIVE' || !organization.website ? null : (
              <>
                <Anchor href={organization.website} target={'_blank'} rel={'noopenner'}>
                  {organization.website}
                </Anchor>
                <span className={'padding-horizontal-normal'} style={{ opacity: 0.14 }}>
                  |
                </span>
              </>
            )}
            <span>
              <Anchor
                onClick={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
                title={`Report Organization as Spam`}
              >
                <FontAwesomeIcon icon={'user-slash'} />
              </Anchor>
              <SpamReportDrop
                type={'ORGANIZATION'}
                ids={[organization._id]}
                open={isSpamReportDropOpen}
                onClose={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
                align={'right'}
                anchorOffset={18}
              />
            </span>
          </Flex>
        ))
      }
      actions={
        actionsOverride ||
        (account &&
          organization &&
          ((account.role === 'ORGANIZATION' && [
            {
              to: '/account',
              primary: true,
              children: (
                <>
                  <FontAwesomeIcon
                    icon={'pencil-alt'}
                    className={'margin-right-normal font-S'}
                  />
                  Edit Account
                </>
              )
            }
          ]) ||
            (account.role === 'VOLUNTEER' &&
              (subscriptions
                .map(subscription => subscription._id)
                .includes(organization._id)
                ? [
                    {
                      onClick: handleUnsubscribe,
                      primary: false,
                      children: (
                        <>
                          <FontAwesomeIcon
                            icon={'bell-slash'}
                            className={'margin-right-normal font-S'}
                          />
                          Unsubscribe
                        </>
                      )
                    }
                  ]
                : [
                    {
                      onClick: handleSubscribe,
                      primary: true,
                      children: (
                        <>
                          <FontAwesomeIcon
                            icon={'bell'}
                            className={'margin-right-normal font-S'}
                          />
                          Subscribe
                        </>
                      )
                    }
                  ])))) ||
        []
      }
    >
      {organization &&
        (organization.account.status !== 'ACTIVE' ? (
          <Warning problem={`Sorry, this organization's account is not active.`} />
        ) : (
          <Content style={{ overflow: 'visible' }} transparent>
            <Tabs
              value={tab}
              onChange={(e, v) => history.push(`?${qs.stringify({ tab: v })}`)}
            >
              <Tab label={`Info.`} value={'info'} />
              {!isApplication && <Tab label={`Requests`} value={'requests'} />}
              {!isApplication && <Tab label={`Events`} value={'events'} />}
              {!isApplication && <Tab label={`News`} value={'news'} />}
            </Tabs>

            {tab === 'info' && <OrganizationDetailInfo organization={organization} />}
            {!isApplication && (
              <>
                {tab === 'requests' && (
                  <OrganizationDetailRequests organization={organization} />
                )}
                {tab === 'events' && (
                  <OrganizationDetailEvents organization={organization} />
                )}
                {tab === 'news' && <OrganizationDetailNews organization={organization} />}
              </>
            )}
          </Content>
        ))}
    </RichPage>
  )
}

export default withRouter(OrganizationDetail)
