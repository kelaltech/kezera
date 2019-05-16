import React, { useEffect, useState } from 'react'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import './volunteer-my-organization.scss'
import { Warning, Yoga, Block } from 'gerami'
import axios from 'axios'
import { RouteComponentProps } from 'react-router'
import RichPage from '../../../shared/components/rich-page/rich-page'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

function MyOrganization({  }: RouteComponentProps) {
  const {loading, t} = useLocale(['volunteer-my-organization'])
  const [organizations, setOrganizations] = useState([])
  const [myOrganizations, setMyOrganization] = useState([])

  useEffect(() => {
    axios
      .get('/api/organization/subscriptions')
      .then(organization => {
        setMyOrganization(organization.data)
      })
      .catch(e => console.log(e))

    fetchOrganization()
  }, [])

  const fetchOrganization = () => {
    axios
      .get('/api/organization/discover')
      .then(organization => {
        setOrganizations(organization.data)
      })
      .catch(e => console.log(e))
  }
  return loading || (
    <RichPage title={t`volunteer-my-organization:title`}>
      <div className={'my-organization-list-container'}>
        <div>
          <h3>{t`volunteer-my-organization:my-organization`}</h3>
          {myOrganizations.length === 0 ? (
            <Block className={'fg-blackish'}>{t`volunteer-my-organization:no-my-organization`}</Block>
          ) : (
            <Yoga maxCol={4}>
              {myOrganizations.map((organization: any) => (
                <OrganizationCard organization={organization} />
              ))}
            </Yoga>
          )}
        </div>

        <div>
          <h3>{t`volunteer-my-organization:organization-around`}</h3>
          {organizations.length === 0 ? (
            <div>
              <Block className={'fg-blackish'}>
                {t`volunteer-my-organization:no-organization-near`}
              </Block>
              <Warning
                problem={t`volunteer-my-organization:warning-problem`}
                title={t`volunteer-my-organization:warning-title`}
                shy
              />
            </div>
          ) : (
            <Yoga maxCol={2}>
              <Warning problem={'This might be due to your location setting '} shy />
              {organizations.map((organization: any) => (
                <OrganizationCard organization={organization} />
              ))}
            </Yoga>
          )}
        </div>
      </div>
    </RichPage>
  )
}

export default MyOrganization
