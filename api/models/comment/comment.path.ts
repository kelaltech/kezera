import { Schema, SchemaDefinition } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const commentPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  _by: { type: ObjectId, ref: 'Account' },
  body: { type: String, required: true },
  replies: [{ type: ObjectId, ref: 'comment' }]
}
