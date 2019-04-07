import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Anchor, Content, Flex, FlexSpacer, Loading } from 'gerami'
import { Tab, Tabs } from '@material-ui/core'
import * as qs from 'qs'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import RichPage from '../../../shared/components/rich-page/rich-page'
import OrganizationDetailInfo from './components/organization-detail-info/organization-detail-info'
import OrganizationDetailRequests from './components/organization-detail-requests/organization-detail-Requests'
import OrganizationDetailEvents from './components/organization-detail-events/organization-detail-events'
import OrganizationDetailNews from './components/organization-detail-news/organization-detail-news'

type ITabName = 'info' | 'requests' | 'events' | 'news'

function OrganizationDetail({ history, match }: RouteComponentProps<{ _id: string }>) {
  const { t } = useLocale(['organization'])

  const { myOrganization: organization } = useMyOrganizationState() // todo: temp, generalize, fetch from url :_id

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

  return !organization ? (
    <Loading delay />
  ) : (
    <RichPage
      languageNamespaces={['organization']}
      documentTitle={organization.account.displayName}
      title={
        <Anchor to={`/organization/${organization._id}`}>
          <h1>{organization.account.displayName}</h1>
        </Anchor>
      }
      description={
        !organization.motto && !organization.website ? (
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
        )
      }
    >
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
        {tab === 'requests' && <OrganizationDetailRequests organization={organization} />}
        {tab === 'events' && <OrganizationDetailEvents organization={organization} />}
        {tab === 'news' && <OrganizationDetailNews organization={organization} />}
      </Content>
    </RichPage>
  )
}

export default OrganizationDetail
