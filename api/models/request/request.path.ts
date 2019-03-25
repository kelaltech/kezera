import { Schema, SchemaDefinition } from 'mongoose'
import { requestTypes } from './request.model'

const ObjectId = Schema.Types.ObjectId

export const requestPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  _by: { type: ObjectId, ref: 'organization' },
  name: { type: String, required: true },
  Description: [{ type: ObjectId, ref: 'request' }],
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: false },
  type: { type: String, enum: requestTypes, required: false }
}
