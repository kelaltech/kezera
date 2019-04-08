import { ModelFactory } from 'meseret'
import { Document } from 'mongoose'

import { organizationApplicationPaths } from './organization-application.path'
import { organizationApplicationMethods } from './organization-application.methods'
import { IOrganization } from '../organization/organization.model'
import { IAccount } from '../account/account.model'

export type IOrganizationApplication = IOrganization & {
  account: Document & IAccount
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
