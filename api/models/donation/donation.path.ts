import { Schema, SchemaDefinition } from 'mongoose'
import { donationTypes } from './donation.model'

const ObjectId = Schema.Types.ObjectId

export const donationPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  _by: { type: ObjectId, ref: 'organization' },
  name: { type: String, required: true },
  Description: [{ type: ObjectId, ref: 'donation' }],
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: false },
  type: { type: String, enum: donationTypes }
}
