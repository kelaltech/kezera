import React, { useEffect, useState } from 'react'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import './volunteer-my-organization.scss'
import { Warning, Yoga, Block } from 'gerami'
import axios from 'axios'
import { RouteComponentProps } from 'react-router'
import RichPage from '../../../shared/components/rich-page/rich-page'

function MyOrganization({  }: RouteComponentProps) {
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
  return (
    <RichPage title={'My Organizations'}>
    <div className={'my-organization-list-container'}>
      <div>
        <h3>My Organizations</h3>
        {myOrganizations.length === 0 ? (
          <Block className={'fg-blackish'}>subscribe or join organizations...</Block>
        ) : (
          <Yoga maxCol={4}>
            {myOrganizations.map((organization: any) => (
              <OrganizationCard organization={organization} />
            ))}
          </Yoga>
        )}
      </div>

      <div>
        <h3>Discover organizations around you.</h3>
        {organizations.length === 0 ? (
          <div>
            <Block className={'fg-blackish'}>
              we couldn't find organizations around you!
            </Block>
            <Warning
              problem={'This might be due to your location setting '}
              title={'warning'}
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
