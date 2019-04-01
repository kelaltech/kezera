import React, { useState } from 'react'
import './volunteer-my-organization.scss'
import axios from 'axios'
import {  Button } from 'gerami'

interface OrganizationProps {
  coverImg: string
  profileImg: string
  name: string
  type: string
  motto: string
  location: string
  website: string
}

function MyOrganizationCard(props: OrganizationProps) {
  const { coverImg, location, motto, name, profileImg, website, type } = props
  const  [subscribed, setSubscribed] = useState(false)

  const handleSubscription = (_id:any)=>{
    //handle subscription
    axios
      .put(`/api/organization/${_id}/subscribe`)
      .then((subscrib)=>{
        // setSubscribed(subscribed.data) //todo uncomment the line
        setSubscribed(!subscribed)
      })
      .catch(e=>console.log(e))
  }
  return (
    <div>
      <div className={'my-org-container'}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              backgroundImage: `url(${coverImg})`
            }}
            className={'my-org-cover'}
          />
          <div
            style={{
              backgroundImage: `url(${profileImg})`
            }}
            className={'my-org-profile'}
          />
        </div>

        <div className={'my-org-info-container'}>
          <div className={'my-org-motto'}>"{motto}"</div>
          <div className={'my-org-info'}>
            <div className={'my-org-name'}>
              <div>
                <span className={'org-label'}>Name: </span>
                <span className={'org-value'}>{name}</span>
              </div>
              <div>
                <span className={'org-label'}>Type: </span>
                <span className={'org-value'}>{type}</span>
              </div>
            </div>
            <div className={'my-org-address'}>
              <div>
                <span className={'org-label'}>Location: </span>
                <span className={'org-value'}>{location}</span>
              </div>
              <div>
                <span className={'org-label'}>Website: </span>
                <span className={'org-value'}>{website}</span>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ opacity: 0.8 }} />
        <div>
          <Button
            style={{
              margin: '2px'
            }}
            primary={true}
            onClick={handleSubscription}
          >
            {subscribed?'Subscribe':'Unsubscribe'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyOrganizationCard
