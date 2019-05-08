import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MyOrganizationCard from '../../../../components/volunteer-my-organization/volunteer-my-organizattion'
import OrganizationCard from '../../../../../shared/components/organization-card/organization-card'
import { Yoga } from 'gerami'

interface IOrganizationResult {
  term?: string
}
function OrganizationSearchResult(props: IOrganizationResult) {
  const { term } = props
  const [organization, setOrganizations] = useState([])

  useEffect(() => {
    axios
      .get('/api/organization/search?term=' + term)
      .then(org => {
        setOrganizations(org.data)
      })
      .then(e => console.log(e))
  }, [term])
  return organization.length === 0 ? (
    <div className={'fg-blackish'}>can't find organizations with the term {term}</div>
  ) : (
    <Yoga maxCol={2}>
      {organization.map((o: any) => (
        <OrganizationCard organization={o} />
      ))}
    </Yoga>
  )
}

export default OrganizationSearchResult
