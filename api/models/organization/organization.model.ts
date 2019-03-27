import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { organizationPaths } from './organization.path'

type ObjectId = Schema.Types.ObjectId | string | number

export type IOrganizationType = 'NGO' | 'HOSPITAL' | 'GOVERNMENTAL' | 'PRIVATE'
export const organizationTypes: IOrganizationType[] = [
  'NGO',
  'HOSPITAL',
  'GOVERNMENTAL',
  'PRIVATE'
]

export interface IOrganization extends Document {
  __v: number
  _id: ObjectId
  _at: Date | number
  _last: Date | number

  type: IOrganizationType

  motto?: string
  description: string
  locations: {
    latitude?: number
    longitude?: number
    address: string
  }[]
  website?: string

  members?: ObjectId[] // account

  licensedNames?: string[]
  registrations?: {
    issuer: string
    type: string
    id: string
  }[]
}

export const organizationModelFactory = new ModelFactory<IOrganization>({
  name: 'organization',
  paths: organizationPaths
})

export const organizationSchema = organizationModelFactory.schema

organizationSchema.index({
  name: 'text',
  description: 'text'
})

export const OrganizationModel = organizationModelFactory.model
