import { SchemaDefinition } from 'mongoose'

import { accountRoles, accountStatuses } from './account.model'

export const accountPaths: SchemaDefinition = {
  _at: { type: Date, required: true, default: Date.now, index: true },
  _last: { type: Date, required: true, index: true },

  role: { type: String, required: true, enum: accountRoles, index: true },
  status: {
    type: String,
    required: true,
    enum: accountStatuses,
    default: 1,
    index: true
  },

  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    validate: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    index: true,
    unique: true
  },
  password: { type: String, required: true }, // the hash
  passwordSetOn: { type: Date, required: true },

  displayName: { type: String, required: true, minlength: 1, maxlength: 50 },
  phoneNumber: {
    type: String,
    minlength: 3,
    maxlength: 50,
    validate: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
    index: true,
    unique: true,
    sparse: true
  },

  lastLocation: {
    type: { type: String, required: true, enum: ['Point'], default: 'Point' },
    coordinates: [{ type: Number, required: true }]
  }
}
