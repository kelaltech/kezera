import { Schema, SchemaDefinition } from 'mongoose'

import { spamReportTypes } from './spam-report.model'

const ObjectId = Schema.Types.ObjectId

export const spamReportPaths: SchemaDefinition = {
  _at: { type: Date, required: true, default: Date.now, index: true },
  _last: { type: Date, required: true, index: true },

  type: { type: String, required: true, enum: spamReportTypes, index: true },
  ids: [{ type: ObjectId, required: true }],

  reporter: { type: ObjectId, required: true, ref: 'account' },
  description: { type: String, required: true, maxlength: 500 }
}
