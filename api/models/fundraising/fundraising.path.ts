import { Schema, SchemaDefinition } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const fundraisingPaths: SchemaDefinition = {
  _at: { $type: Date, required: true, default: Date.now },

  request: { $type: ObjectId, required: true, ref: 'request' },

  target: { $type: Number }
}
