import React, { useEffect, useState } from 'react'
import MyOrganizationCard from '../../components/volunteer-my-organization/volunteer-my-organizattion'
import './volunteer-my-organization.scss'
import { Yoga } from 'gerami'
import axios from 'axios'
import { RouteComponentProps } from 'react-router'

function MyOrganization({  }: RouteComponentProps) {
  const [organizations, setOrganizations] = useState({ subscribed: [], unsubscribed: [] })

  useEffect(() => {
    axios.get('/api/my/organization').then(organization => {
      if (organization.data.length === 0) {
        fetchOrganization()
      }
      setOrganizations({ ...organizations, subscribed: organization.data })
    })
  }, [])

  const fetchOrganization = () => {
    axios.get('/api/organization/all').then(organization => {
      setOrganizations({ ...organizations, unsubscribed: organization.data })
    })
  }
  return (
    <div className={'my-organization-list-container'}>
      {organizations.subscribed.length !== 0 && (
        <div>
          <h3>My Organizations</h3>
          <Yoga maxCol={1}>
            {organizations.subscribed.map(organization => (
              <MyOrganizationCard {...organization} />
            ))}
          </Yoga>
        </div>
      )}
      <h3>list of Organizations</h3>
      {/* todo change it to tabs [near you,recent,all]*/}
      <Yoga maxCol={2}>
        {organizations.unsubscribed.map(organization => (
          <MyOrganizationCard {...organization} />
        ))}
      </Yoga>
    </div>
  )
}

export default MyOrganization
