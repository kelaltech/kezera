import { SchemaDefinition, Schema } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const eventPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  interestedVolunteers: [{ id: { type: ObjectId, refs: 'account' } }], // Change these
  goingVolunteers: [{ id: { type: ObjectId, refs: 'account' } }], // Change these
  attendedVolunteers: [{ id: { type: ObjectId, refs: 'account' } }], // Change these
  startDate: { type: Date, required: true },
  location: { type: String, required: true },
  amountOfPeople: { type: Number, required: true },
  endDate: { type: Date, required: true },
  likes: [{ type: ObjectId, refs: 'account' }], // Change these
  comments: [{ type: ObjectId, ref: 'comment' }],
  organizationId: { type: ObjectId, refs: 'organization' }
}
