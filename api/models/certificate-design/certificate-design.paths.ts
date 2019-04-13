import { Schema, SchemaDefinition } from 'mongoose'

const ObjectId = Schema.Types.ObjectId
ObjectId // todo: temp

export const certificateDesignPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now, index: true },
  _last: { type: Date, index: true }

  // todo
}
