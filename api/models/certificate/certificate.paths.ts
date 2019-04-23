import { Schema, SchemaDefinition } from 'mongoose'

import { certificatePurposes } from './certificate.model'

const ObjectId = Schema.Types.ObjectId

export const certificatePaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now, index: true },
  _last: { type: Date, index: true },

  purpose: { type: String, required: true, enum: certificatePurposes },
  description: { type: String, required: true, maxlength: 1000 },

  issuedBy: { type: ObjectId, required: true, ref: 'organization' },
  issuedTo: { type: ObjectId, required: true, ref: 'volunteer' },

  public: { type: Boolean, required: true, default: true }
}
