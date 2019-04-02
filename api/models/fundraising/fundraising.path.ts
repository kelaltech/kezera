import { Schema, SchemaDefinition } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const fundPaths: SchemaDefinition = {
  amount: { type: Number, ref: 'organization' },
  type: { type: ObjectId },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
}
