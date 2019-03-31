import { ModelFactory } from 'meseret'

import { organizationApplicationPaths } from './organization-application.path'
import { IOrganization } from '../organization/organization.model'

export interface IOrganizationApplication extends IOrganization {}

export const organizationApplicationModelFactory = new ModelFactory<
  IOrganizationApplication
>({
  name: 'organization-application',
  paths: organizationApplicationPaths
})

export const organizationApplicationSchema = organizationApplicationModelFactory.schema

export const OrganizationApplicationModel = organizationApplicationModelFactory.model
