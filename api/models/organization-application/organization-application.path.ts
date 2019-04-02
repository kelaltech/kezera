import { SchemaDefinition } from 'mongoose'

import { organizationPaths } from '../organization/organization.path'
import { accountPaths } from '../account/account.paths'

export const organizationApplicationPaths: SchemaDefinition = {
  ...organizationPaths,
  account: accountPaths
}
