import React, { useEffect, useState } from 'react'
import { Yoga } from 'gerami'

import './organization-settings.scss'
import OrganizationFormBrand from '../../../../components/organization-form-brand/organization-form-brand'
import OrganizationFormAbout from '../../../../components/organization-form-about/organization-form-about'
import OrganizationFormBio from '../../../../components/organization-form-bio/organization-form-bio'
import {
  useMyOrganizationDispatch,
  useMyOrganizationState
} from '../../../../../layout-organization/stores/my-organization/my-organization-provider'
import { IOrganizationRequest } from '../../../../../apiv/organization.apiv'
import {
  organizationRequestToResponse,
  organizationResponseToRequest
} from '../../../../../apiv/filters/organization.filter'
import { updateMyOrganization } from '../../../../../layout-organization/stores/my-organization/my-organization-actions'

const defaultOrganizationRequest: IOrganizationRequest = {
  /* COLUMN 1 */

  // account
  account: {
    displayName: '',
    email: '',
    password: '',
    phoneNumber: undefined
  },

  // legal
  licensedNames: [],
  registrations: [],

  /* COLUMN 2 */

  // brand
  motto: undefined,
  website: undefined,

  // about
  type: 'NGO',
  locations: [],

  // bio
  bio: ''
}

function OrganizationSettings() {
  const { myOrganization } = useMyOrganizationState()
  const myOrganizationDispatch = useMyOrganizationDispatch()

  const [myOrganizationRequest, setMyOrganizationRequest] = useState<
    IOrganizationRequest
  >(defaultOrganizationRequest)

  useEffect(() => {
    if (myOrganization) {
      organizationResponseToRequest(myOrganization)
        .then(setMyOrganizationRequest)
        .catch(console.error)
    }
  }, [myOrganization])

  const saveChanges = (organizationChanges: IOrganizationRequest): void => {
    if (!myOrganization) return

    updateMyOrganization(
      myOrganizationDispatch,
      organizationRequestToResponse(myOrganization, organizationChanges),
      1000
    )
  }

  return (
    <>
      <Yoga maxCol={2} className={'organization-settings-yoga'}>
        <OrganizationFormBrand
          organization={myOrganizationRequest}
          setOrganization={saveChanges}
        />

        <OrganizationFormAbout
          organization={myOrganizationRequest}
          setOrganization={saveChanges}
        />
      </Yoga>

      <OrganizationFormBio
        organization={myOrganizationRequest}
        setOrganization={saveChanges}
      />
    </>
  )
}

export default OrganizationSettings
