import { ModelFactory } from 'meseret'
import { Document } from 'mongoose'

import { organizationApplicationPaths } from './organization-application.paths'
import { organizationApplicationMethods } from './organization-application.methods'
import { IOrganization } from '../organization/organization.model'
import { IAccount } from '../account/account.model'

export type IOrganizationApplication = IOrganization & {
  account: Document & IAccount
  verifier: undefined
}

export const organizationApplicationModelFactory = new ModelFactory<
  IOrganizationApplication,
  typeof organizationApplicationMethods
>({
  name: 'organization-application',
  paths: organizationApplicationPaths,
  methods: organizationApplicationMethods
})

export const organizationApplicationSchema = organizationApplicationModelFactory.schema

export const OrganizationApplicationModel = organizationApplicationModelFactory.model

OrganizationApplicationModel.collection.ensureIndex(
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
