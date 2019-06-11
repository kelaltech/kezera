import { Schema, SchemaDefinition } from 'mongoose'

import { taskTypes } from './task.model'

const ObjectId = Schema.Types.ObjectId

// NOTE: { typeKey: '$type' } must be passed to the Schema options

export const taskPaths: SchemaDefinition = {
  _at: { $type: Date, required: true, default: Date.now },

  request: { $type: ObjectId, required: true, ref: 'request' },

  type: { $type: String, required: true, enum: taskTypes },

  startDate: { $type: Date, required: true },
  endDate: { $type: Date, required: true },

  numberNeeded: { $type: Number, required: true }
}
