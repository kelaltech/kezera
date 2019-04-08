import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { certificateDesignPaths } from './certificate-design.paths'

type ObjectId = Schema.Types.ObjectId | string

export interface ICertificateDesign {
  __v: number
  _id: ObjectId
  _at: Date | number
  _last: Date | number

  // todo
}

export const certificateDesignModelFactory = new ModelFactory<ICertificateDesign>({
  name: 'certificate-design',
  paths: certificateDesignPaths
})

export const certificateDesignSchema = certificateDesignModelFactory.schema

export const CertificateDesignModel = certificateDesignModelFactory.model
