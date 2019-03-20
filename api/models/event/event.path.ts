import { SchemaDefinition, Schema } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const eventPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  interestedVolunteers: [{ type: ObjectId, refs: 'volunteer' }],
  goingVolunteers: [{ type: ObjectId, refs: 'volunteer' }],
  attendedVolunteers: [{ type: ObjectId, refs: 'volunteer' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  likes: [{ type: ObjectId, refs: 'volunteer' }],
  comments: [{ type: ObjectId, ref: 'comment' }],
  organizationId: { type: ObjectId, refs: 'organization' }
}
