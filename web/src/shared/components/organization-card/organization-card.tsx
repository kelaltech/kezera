import React from 'react'
import { Anchor, Card, Content } from 'gerami'

import './organization-card.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'

interface Props {
  organization: IOrganizationResponse
}

/**
 * The recommended Yoga maxCol (for a size XXL) is 3.
 */
function OrganizationCard({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  return (
    loading || (
      <Card className={'organization-card top'} imgSrc={organization.logoUri}>
        {organization.logoUri && (
          <Anchor
            to={`/organization/${organization._id}`}
            className={'organization-card-logo-anchor'}
          >
            <Content
              className={'organization-card-logo'}
              style={{ backgroundImage: `url(${organization.logoUri})` }}
            />
          </Anchor>
        )}

        <Content className={'organization-card-content'}>
          <div className={'bold font-L center'}>
            <Anchor to={`/organization/${organization._id}`}>
              {organization.account.displayName}
            </Anchor>
          </div>
          <hr style={{ opacity: 0.42 }} />
          <div className={'font-S fg-blackish center'}>
            <small>
              <Anchor to={`/organization/${organization._id}`} className={'fg-blackish'}>
                {organization.type}
              </Anchor>
            </small>
            <small className={'padding-horizontal-normal'} style={{ opacity: 0.14 }}>
              |
            </small>
            <small>
              <Anchor to={`/organization/${organization._id}`} className={'fg-blackish'}>
                {organization.subscribersCount || 'NO'} SUBSCRIBERS
              </Anchor>
            </small>
          </div>
        </Content>
      </Card>
    )
  )
}

export default OrganizationCard
