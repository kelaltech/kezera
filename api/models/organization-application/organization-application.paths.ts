import { Schema, SchemaDefinition } from 'mongoose'

import { organizationPaths } from '../organization/organization.paths'
import { accountSchema } from '../account/account.model'

const ObjectId = Schema.Types.ObjectId

// NOTE: { typeKey: '$type' } must be passed to the Schema options

export const organizationApplicationPaths: SchemaDefinition = {
  ...organizationPaths,
  account: accountSchema,
  verifier: { $type: ObjectId, required: false, ref: 'account' }
}
