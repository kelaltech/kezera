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
      latitude: {
        type: Number,
        validate: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/
      },
      longitude: {
        type: Number,
        validate: /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
      },
      address: { type: String, required: true, maxlength: 250 }
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
