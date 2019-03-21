import { SchemaDefinition, Schema } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const organizationPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  organizationId: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: Number, required: true },
  news: [{ type: ObjectId, ref: 'news' }],
  events: [
    {
      eventId: { type: ObjectId, refs: 'Events' }
    }
  ]
}
