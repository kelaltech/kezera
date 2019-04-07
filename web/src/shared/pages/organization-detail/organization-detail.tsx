import React, { useState } from 'react'
import { Anchor, Content, Flex, FlexSpacer, Loading } from 'gerami'
import { Tab, Tabs } from '@material-ui/core'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import OrganizationDetailInfo from './components/organization-detail-info/organization-detail-info'
import OrganizationDetailRequests from './components/organization-detail-requests/organization-detail-Requests'
import OrganizationDetailEvents from './components/organization-detail-events/organization-detail-events'
import OrganizationDetailNews from './components/organization-detail-news/organization-detail-news' // todo: temp

function OrganizationDetail() {
  const { t } = useLocale(['organization'])

  const { myOrganization: organization } = useMyOrganizationState() // todo: temp, generalize, fetch from url :_id

  let [tab, setTab] = useState(0)

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
          <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            <Tab label={`Info.`} value={0} />
            <Tab label={`Requests`} value={1} />
            <Tab label={`Events`} value={2} />
            <Tab label={`News`} value={3} />
          </Tabs>
        </Content>

        {tab === 0 && <OrganizationDetailInfo organization={organization} />}
        {tab === 1 && <OrganizationDetailRequests organization={organization} />}
        {tab === 2 && <OrganizationDetailEvents organization={organization} />}
        {tab === 3 && <OrganizationDetailNews organization={organization} />}
      </Content>
    </RichPage>
  )
}

export default OrganizationDetail
