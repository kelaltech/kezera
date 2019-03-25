import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { organizationPaths } from './organization.path'

type ObjectId = Schema.Types.ObjectId | string | number

export interface IOrganization extends Document {
  _at: Date | number
  organzationId: string
  description: string
  address: string
  type: Number
  news: ObjectId[]
  events: ObjectId[]
  requests: ObjectId[]
}

export const organizationModelFactory = new ModelFactory<IOrganization>({
  name: 'organization',
  paths: organizationPaths
})

organizationModelFactory.schema.index({
  name: 'text',
  description: 'text'
})

export const OrganizationModel = organizationModelFactory.model
