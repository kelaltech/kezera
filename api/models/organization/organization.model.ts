import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { organizationPaths } from './organization.path'

type ObjectId = Schema.Types.ObjectId | string | number

export type IOrganizationType = 'NGO' | 'HOSPITAL' | 'GOVERNMENTAL' | 'PRIVATE'
export const organizationTypes: IOrganizationType[] = [
  'NGO',
  'HOSPITAL',
  'GOVERNMENTAL',
  'PRIVATE'
]

export interface IOrganization {
  __v: number
  _id: ObjectId
  _at: Date | number
  _last: Date | number

  account: ObjectId // account

  type: IOrganizationType

  motto?: string
  description: string
  locations: {
    latitude?: number
    longitude?: number
    address: string
  }[]
  website?: string

  subscribers: ObjectId[] // account

  licensedNames: string[]
  registrations: {
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

export const OrganizationModel = organizationModelFactory.model
