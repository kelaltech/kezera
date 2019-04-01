import { Schema, SchemaDefinition } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const taskPaths: SchemaDefinition = {
  numberNeeded: { type: Number, ref: 'organization' },
  location: { type: ObjectId },
  type: { type: ObjectId },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
}
