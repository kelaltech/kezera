import React from 'react'
import { Anchor, Flex, FlexSpacer, Loading } from 'gerami'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import RichPage from '../../../shared/components/rich-page/rich-page'
import { useMyOrganizationState } from '../../../layout-organization/stores/my-organization/my-organization-provider'
import OrganizationDetailAbout from './components/organization-detail-about/organization-detail-about' // todo: temp

function OrganizationDetail() {
  const { t } = useLocale(['organization'])

  const { myOrganization: organization } = useMyOrganizationState() // todo: temp, generalize, fetch from url :_id

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
      <OrganizationDetailAbout organization={organization} />
    </RichPage>
  )
}

export default OrganizationDetail
