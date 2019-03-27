import { Schema, SchemaDefinition } from 'mongoose'

import { organizationTypes } from './organization.model'

const ObjectId = Schema.Types.ObjectId

export const organizationPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now, index: true },
  _last: { type: Date, index: true },

  type: { type: String, enum: organizationTypes, index: true },

  motto: { type: String, minlength: 1, maxlength: 50 },
  description: { type: String, required: true, minlength: 1, maxlength: 10000 },
  location: [
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

  members: [{ type: ObjectId, required: true, ref: 'account' }],

  licensedNames: [{ type: String, required: true }],
  registrations: [
    {
      issuer: { type: String, required: true },
      type: { type: String, required: true },
      id: { type: String, required: true }
    }
  ]
}
