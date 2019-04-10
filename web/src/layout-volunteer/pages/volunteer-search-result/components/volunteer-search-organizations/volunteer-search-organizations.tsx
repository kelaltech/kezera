import React, { useState } from 'react'
import axios from 'axios'
import MyOrganizationCard from '../../../../components/volunteer-my-organization/volunteer-my-organizattion'

interface IOrganizationResult {
  term?: string
}
function OrganizationSearchResult(props: IOrganizationResult) {
  const { term } = props
  const [organization, setOrganizations] = useState([])

  return (
    <div>
      <h1>Organization Search result</h1>
      <div>
        {organization.map((o: any) => (
          <MyOrganizationCard
            coverImg={`/api/organization/${o._id}/cover`}
            profileImg={`/api/organization/${o._id}/profile`}
            name={o.name}
            type={o.type}
            motto={o.motto}
            location={o.location}
            website={o.website}
          />
        ))}
      </div>
    </div>
  )
}

export default OrganizationSearchResult
