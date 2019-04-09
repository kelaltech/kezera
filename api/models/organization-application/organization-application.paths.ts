import { SchemaDefinition } from 'mongoose'

import { organizationPaths } from '../organization/organization.paths'
import { accountSchema } from '../account/account.model'

export const organizationApplicationPaths: SchemaDefinition = {
  ...organizationPaths,
  account: accountSchema
}
