import { Schema, SchemaDefinition } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const commentPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  by: { type: ObjectId, ref: 'Account' },
  body: { type: String, required: true },
  replies: [{ type: ObjectId, ref: 'comment' }]
}
