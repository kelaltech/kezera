import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Loading } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import OrganizationDetail from '../../../shared/pages/organization-detail/organization-detail'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'
import { addActivity } from '../../../shared/methods/methods'

type Props = RouteComponentProps<{ _id: string }>

function VerifierApplicationDetail({ history, match }: Props) {
  const [error, setError] = useState()
  const [application, setApplication] = useState<IOrganizationResponse>()
  const [sending, setSending] = useState(false)

  useEffect(() => {
    Axios.get<IOrganizationResponse>(
      `/api/verifier/get-organization-application/${match.params._id}`
    )
      .then(response => setApplication(response.data))
      .catch(setError)
  }, [])

  const handleApprove = () => {
    if (!window.confirm(`Are you sure you want to approve this?`)) return

    setSending(true)
    Axios.post<IOrganizationResponse>(
      `/api/verifier/approve-organization-application/${match.params._id}`
    )
      .then(response => {
        addActivity('Approved an organization.', `/o/${response.data._id}`)
        history.push('/applications')
      })
      .catch(setError)
      .finally(() => setSending(false))
  }

  const handleReject = () => {
    if (!window.confirm(`Are you sure you want to reject this?`)) return

    setSending(true)
    Axios.post<void>(`/api/verifier/reject-organization-application/${match.params._id}`)
      .then(() => history.push('/applications'))
      .catch(setError)
      .finally(() => setSending(false))
  }

  return !application ? (
    <Loading delay />
  ) : (
    <OrganizationDetail
      isApplication={true}
      errorOverride={error}
      organizationOverride={application}
      actionsOverride={[
        {
          disabled: sending,
          onClick: handleReject,
          primary: false,
          className: 'margin-vertical-auto',
          children: (
            <>
              <FontAwesomeIcon icon={'trash'} />
              <span className={'margin-left-normal'}>Reject</span>
            </>
          )
        },
        {
          disabled: sending,
          onClick: handleApprove,
          primary: true,
          className: 'margin-vertical-auto',
          children: (
            <>
              <FontAwesomeIcon icon={'check'} />
              <span className={'margin-left-normal'}>Approve</span>
            </>
          )
        }
      ]}
    />
  )
}

export default VerifierApplicationDetail
