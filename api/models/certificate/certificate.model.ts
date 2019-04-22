import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { certificatePaths } from './certificate.paths'

type ObjectId = Schema.Types.ObjectId | string

export type ICertificatePurpose = 'DONATION' | 'EVENT_ATTENDANCE' | 'MEMBERSHIP' | 'OTHER'
export const certificatePurposes: ICertificatePurpose[] = [
  'DONATION',
  'EVENT_ATTENDANCE',
  'MEMBERSHIP',
  'OTHER'
]

export interface ICertificate {
  _at?: Date | number
  _last: Date | number

  purpose: ICertificatePurpose

  issuedBy: ObjectId // organization
  issuedTo: ObjectId // volunteer

  description: string
}

export const certificateModelFactory = new ModelFactory<ICertificate>({
  name: 'certificate',
  paths: certificatePaths
})

export const certificateSchema = certificateModelFactory.schema

export const CertificateModel = certificateModelFactory.model
