import { Schema, SchemaDefinition } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const taskPaths: SchemaDefinition = {
  numberNeeded: { type: Number, ref: 'organization' },
  type: { type: ObjectId },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  requestId: { type: ObjectId, refs: 'request', required: true },
  going: [{ id: { type: ObjectId, refs: 'account' } }],
  attended: [{ id: { type: ObjectId, refs: 'account' } }]
}
