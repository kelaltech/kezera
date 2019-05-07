import React from 'react'

import './certificate-card.scss'
import { ICertificateResponse } from '../../../apiv/certificate.apiv'

type Props = {
  certificate: ICertificateResponse
}

function CertificateCard({ certificate }: Props) {
  return (
    <img
      className={'certificate-card-image'}
      src={certificate.printUri}
      alt={certificate.description}
    />
  )
}

export default CertificateCard
