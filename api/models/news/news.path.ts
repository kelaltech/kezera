import { SchemaDefinition, Schema } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const newPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  article: { type: String },
  likes: [{ type: ObjectId, ref: 'organization' }],
  comments: [{ type: ObjectId, ref: 'comment' }],
  pictureId: { type: String },
  _by: { type: ObjectId, ref: 'organization' }
}
