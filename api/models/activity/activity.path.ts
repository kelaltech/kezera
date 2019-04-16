import { Schema, SchemaDefinition } from 'mongoose'
import { activityTypes } from './activity.model'

const ObjectId = Schema.Types.ObjectId

export const ActivityPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now, index: true },
  activityType: { type: String, enum: activityTypes, required: true },
  data: { type: String },
  date: { type: Date, required: true, default: Date.now() },
  accountId: { type: ObjectId, refs: 'account' }
}
