import { Schema, SchemaDefinition } from 'mongoose'
// import { organizationActivity, verifierActivity, volunteerActivity } from './activity.model'

const ObjectId = Schema.Types.ObjectId

export const ActivityPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now, index: true },
  activityType: { type: String, required: false },
  data: { type: String, required: true },
  link: { type: String, required: true },
  accountId: { type: ObjectId, refs: 'account' }
}
