import { SchemaDefinition } from 'mongoose'

import { organizationPaths } from '../organization/organization.path'
import { accountSchema } from '../account/account.model'

export const organizationApplicationPaths: SchemaDefinition = {
  ...organizationPaths,
  account: accountSchema
}
