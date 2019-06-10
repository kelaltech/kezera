import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Anchor } from 'gerami'
import Axios from 'axios'

import './certificate-card.scss'
import { ICertificateResponse } from '../../../apiv/certificate.apiv'
import { useVolunteerState } from '../../../layout-volunteer/stores/volunteer/volunteer-provider'

type Props = {
  certificate: ICertificateResponse
  onPrivacyUpdate?: (certificate: ICertificateResponse) => void
}

function CertificateCard({ certificate, onPrivacyUpdate }: Props) {
  const { volunteer } = useVolunteerState()

  const togglePrivacy = (): void => {
    Axios.put<ICertificateResponse>(
      `/api/certificate/set-privacy/${certificate._id}/${
        certificate.privacy === 'PRIVATE' ? 'public' : 'private'
      }`,
      {},
      { withCredentials: true }
    )
      .then(response => onPrivacyUpdate && onPrivacyUpdate(response.data))
      .catch(e =>
        alert(
          (e &&
            ((e.response && (e.response.data.prettyMessage || e.response.data.message)) ||
              e.message)) ||
            e
        )
      )
  }

  return (
    <div className={'certificate-card'}>
      <img
        className={'certificate-card-image'}
        src={certificate.printUri}
        alt={certificate.description}
      />
      <div className={'certificate-card-controls-container'}>
        <Anchor className={'padding-horizontal-big'} href={certificate.printUri} download>
          <FontAwesomeIcon icon={'print'} />
          <span className={'padding-left-normal'}>Print</span>
        </Anchor>

        {volunteer && volunteer._id === certificate.issuedTo && (
          <Anchor className={'padding-horizontal-big'} onClick={togglePrivacy}>
            <FontAwesomeIcon
              icon={certificate.privacy === 'PRIVATE' ? `eye-slash` : `eye`}
            />
            <span className={'padding-left-normal'}>
              {certificate.privacy === 'PRIVATE' ? `Private` : `Public`}
            </span>
          </Anchor>
        )}
      </div>
    </div>
  )
}

export default CertificateCard
