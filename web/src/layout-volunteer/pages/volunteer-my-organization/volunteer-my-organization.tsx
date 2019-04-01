import React, { useEffect, useState } from 'react'
import MyOrganizationCard from '../../components/volunteer-my-organization/volunteer-my-organizattion'
import './volunteer-my-organization.scss'
import { Yoga } from 'gerami'
import axios from 'axios'
import tempNews from '../../../assets/images/news-temp.jpg'
import logo from '../../../assets/images/kelal-tech-logo.svg'

function MyOrganization() {
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
    axios.get('/api/my/organization').then(organization => {
      setOrganizations({ ...organizations, unsubscribed: organization.data })
    })
  }
  return (
    <div className={'my-organization-list-container'}>
      {organizations.subscribed.length !== 0 && (
        <div>
          <h3>My Organizations</h3>
          <Yoga maxCol={2}>
            {//todo change data to organization.subscribed
            data.map(organization => (
              <MyOrganizationCard {...organization} />
            ))}
          </Yoga>
        </div>
      )}
      <h3>list of Organizations</h3>
      {/* todo change it to tabs [near you,recent,all]*/}
      <Yoga maxCol={2}>
        {data.map(organization => (
          <MyOrganizationCard {...organization} />
        ))}
      </Yoga>
    </div>
  )
}

export default MyOrganization

const data = [
  {
    coverImg: tempNews,
    profileImg: tempNews,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!,Humanity Movement',
    location: 'Addis Ababa, Megegnagna',
    website: 'https://merryjoy.org'
  },
  {
    coverImg: tempNews,
    profileImg: logo,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!',
    location: 'Addis Ababa, Megegnagna',
    website: 'https://merryjoy.org'
  },
  {
    coverImg: logo,
    profileImg: tempNews,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!',
    location: 'Addis Ababa, Megegnagna',
    website: 'https://merryjoy.org'
  },
  {
    coverImg: tempNews,
    profileImg: logo,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!',
    location: 'Addis Ababa, Megegnagna',
    website: 'https://merryjoy.org'
  },
  {
    coverImg: logo,
    profileImg: logo,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!',
    location: 'Addis Ababa, Megegnagna',
    website: 'https://merryjoy.org'
  },
  {
    coverImg: tempNews,
    profileImg: logo,
    name: 'Marry Joy International',
    type: 'Ngo',
    motto: 'More Heart More Impact!',
    location: 'Addis Ababa, Megegnagna',
    website: 'https://merryjoy.org'
  }
]
