import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { organizationPaths } from './organization.paths'

type ObjectId = Schema.Types.ObjectId | string

export type IOrganizationType = 'NGO' | 'HOSPITAL' | 'GOVERNMENTAL' | 'PRIVATE'
export const organizationTypes: IOrganizationType[] = [
  'NGO',
  'HOSPITAL',
  'GOVERNMENTAL',
  'PRIVATE'
]

export type IOrganization = {
  _at?: Date | number
  _last: Date | number

  account: ObjectId // account

  type: IOrganizationType

  motto?: string
  bio: string
  locations: {
    geo: {
      type: 'Point'
      coordinates: [number, number]
    }
    address?: string
  }[]
  website?: string

  subscribers?: ObjectId[] // account

  licensedNames?: string[]
  registrations?: {
    issuer: string
    type: string
    id: string
  }[]
  verifier: ObjectId // account
}

export const organizationModelFactory = new ModelFactory<IOrganization>({
  name: 'organization',
  paths: organizationPaths,
  options: { typeKey: '$type' }
})

export const organizationSchema = organizationModelFactory.schema

export const OrganizationModel = organizationModelFactory.model

OrganizationModel.collection.ensureIndex(
  {
    'account.email': 'text',
    'account.displayName': 'text',
    'account.phoneNumber': 'text',
    type: 'text',
    motto: 'text',
    bio: 'text',
    'locations.address': 'text',
    website: 'text',
    licensedNames: 'text',
    'registrations.id': 'text'
  },
  {
    name: 'organization_search',
    weights: {
      // default is 1
      'account.displayName': 10,
      type: 8,
      licensedNames: 5
    }
  }
)

OrganizationModel.collection.createIndex(
  { 'locations.geo': '2dsphere' },
  { sparse: true }
)
