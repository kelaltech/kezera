import { Schema, SchemaDefinition } from 'mongoose'
import { requestTypes } from './request.model'

const ObjectId = Schema.Types.ObjectId

export const requestPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  _by: { type: ObjectId, ref: 'account' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: false },
  type: { type: String, enum: requestTypes, required: false },
  volunteers: [{ id: { type: ObjectId, refs: 'volunteer' } }],
  approved: [{ id: { type: ObjectId, refs: 'volunteer' } }],
  status: { type: String, required: true, default: true }
}
