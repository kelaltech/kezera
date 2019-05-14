import { Schema, SchemaDefinition } from 'mongoose'

import { organizationTypes } from './organization.model'

const ObjectId = Schema.Types.ObjectId

export const organizationPaths: SchemaDefinition = {
  _at: { type: Date, required: true, default: Date.now, index: true },
  _last: { type: Date, required: true, index: true },

  account: { type: ObjectId, required: true, ref: 'account', index: true, unique: true },

  type: { type: String, required: true, enum: organizationTypes, index: true },

  motto: { type: String, minlength: 1, maxlength: 50 },
  bio: { type: String, required: true, minlength: 1, maxlength: 5000 },
  locations: [
    {
      geo: {
        type: { type: String, required: true, enum: ['Point'], default: 'Point' },
        coordinates: [{ type: Number, required: true }]
      },
      address: { type: String, maxlength: 250 }
    }
  ],
  website: { type: String, maxlength: 100, validate: /\w+:(\/?\/?)[^\s]+/ },

  subscribers: [{ type: ObjectId, required: true, ref: 'account', index: true }],

  licensedNames: [{ type: String, required: true, maxlength: 50 }],
  registrations: [
    {
      issuer: { type: String, required: true, maxlength: 50 },
      type: { type: String, required: true, maxlength: 50 },
      id: { type: String, required: true, maxlength: 50 }
    }
  ],
  verifier: { type: ObjectId, required: true, ref: 'account' }
}
