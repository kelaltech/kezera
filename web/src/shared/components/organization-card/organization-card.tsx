import React from 'react'
import { Anchor, Card, Content } from 'gerami'

import './organization-card.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'

interface Props {
  organization: IOrganizationResponse
  /**
   * @default false
   */
  isApplication?: boolean
}

/**
 * The recommended Yoga maxCol (for a size XXL) is 3.
 */
function OrganizationCard({ organization, isApplication = false }: Props) {
  const { loading, t } = useLocale(['organization'])

  const detailUrl = `/application/${organization._id}`

  return (
    loading || (
      <Card className={'organization-card top'} imgSrc={organization.logoUri}>
        {organization.logoUri && (
          <Anchor to={detailUrl} className={'organization-card-logo-anchor'}>
            <Content
              className={'organization-card-logo'}
              style={{ backgroundImage: `url(${organization.logoUri})` }}
            />
          </Anchor>
        )}

        <Content className={'organization-card-content'}>
          <div className={'bold font-L center'}>
            <Anchor to={detailUrl}>{organization.account.displayName}</Anchor>
          </div>
          <hr style={{ opacity: 0.42 }} />
          <div className={'font-S fg-blackish center'}>
            <small>
              <Anchor to={detailUrl} className={'fg-blackish'}>
                {organization.type}
              </Anchor>
            </small>
            <small className={'padding-horizontal-normal'} style={{ opacity: 0.14 }}>
              |
            </small>
            <small>
              <Anchor to={detailUrl} className={'fg-blackish'}>
                {!isApplication
                  ? `${organization.subscribersCount || 'NO'} SUBSCRIBER${
                      organization.subscribersCount === 1 ? '' : 'S'
                    }`
                  : `Sent on ${new Date(organization._at).toDateString().substr(3)}`}
              </Anchor>
            </small>
          </div>
        </Content>
      </Card>
    )
  )
}

export default OrganizationCard
