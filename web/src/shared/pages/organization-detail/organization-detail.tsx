import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Anchor, Content, Flex, FlexSpacer } from 'gerami'
import { Tab, Tabs } from '@material-ui/core'
import * as qs from 'qs'
import Axios from 'axios'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../apiv/organization.apiv'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import RichPage from '../../../shared/components/rich-page/rich-page'
import OrganizationDetailInfo from './components/organization-detail-info/organization-detail-info'
import OrganizationDetailRequests from './components/organization-detail-requests/organization-detail-Requests'
import OrganizationDetailEvents from './components/organization-detail-events/organization-detail-events'
import OrganizationDetailNews from './components/organization-detail-news/organization-detail-news'

type ITabName = 'info' | 'requests' | 'events' | 'news'

function OrganizationDetail({ history, match }: RouteComponentProps<{ _id: string }>) {
  const { t } = useLocale(['organization'])

  const [error, setError] = useState()
  const [organization, setOrganization] = useState<IOrganizationResponse>()

  const { myOrganization } = useMyOrganizationState()

  const [waitingForMe, setWaitingForMe] = useState(false)
  const [requestedId, setRequestedId] = useState<string>()

  useEffect(() => {
    if (requestedId === match.params._id) {
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

      Axios.get<IOrganizationResponse>(`/api/organization/${match.params._id}`)
        .then(response => {
          if (!response.data || !response.data._id)
            return setError(`Organization response is malformed.`)
          setOrganization(response.data)
        })
        .catch(setError)
    }
  }, [match.params._id, myOrganization])

  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const [tab, setTab] = useState<ITabName>(query.tab || 'info')

  useEffect(() => {
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

  return (
    <RichPage
      ready={!!organization || error}
      languageNamespaces={['organization']}
      error={error}
      documentTitle={organization && organization.account.displayName}
      title={
        organization && (
          <Anchor to={`/organization/${organization._id}fail`}>
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
            {!organization.motto ? null : (
              <>
                <span>{organization.type}</span>
                <span className={'padding-horizontal-normal'} style={{ opacity: 0.14 }}>
                  |
                </span>
                <span>
                  {organization.subscribersCount || 'No'} Subscriber
                  {organization.subscribersCount === 1 ? '' : 's'}
                </span>
              </>
            )}
            <FlexSpacer />
            {!organization.website ? null : (
              <Anchor href={organization.website} target={'_blank'} rel={'noopenner'}>
                {organization.website}
              </Anchor>
            )}
          </Flex>
        ))
      }
    >
      {organization && (
        <Content className={'fg-whitish'}>
          <Content>
            <Tabs
              value={tab}
              onChange={(e, v) => history.push(`?${qs.stringify({ tab: v })}`)}
            >
              <Tab label={`Info.`} value={'info'} />
              <Tab label={`Requests`} value={'requests'} />
              <Tab label={`Events`} value={'events'} />
              <Tab label={`News`} value={'news'} />
            </Tabs>
          </Content>

          {tab === 'info' && <OrganizationDetailInfo organization={organization} />}
          {tab === 'requests' && (
            <OrganizationDetailRequests organization={organization} />
          )}
          {tab === 'events' && <OrganizationDetailEvents organization={organization} />}
          {tab === 'news' && <OrganizationDetailNews organization={organization} />}
        </Content>
      )}
    </RichPage>
  )
}

export default OrganizationDetail
