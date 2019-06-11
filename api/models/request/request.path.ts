import { Schema, SchemaDefinition } from 'mongoose'
import { requestStatuses, requestTypes } from './request.model'

const ObjectId = Schema.Types.ObjectId

// NOTE: { typeKey: '$type' } must be passed to the Schema options

export const requestPaths: SchemaDefinition = {
  _at: { $type: Date, required: true, default: Date.now },

  _by: { $type: ObjectId, required: true, ref: 'account' },

  name: { $type: String, required: true, maxlength: 100 },
  description: { $type: String, required: true, maxlength: 1000 },

  status: { $type: String, required: true, enum: requestStatuses },
  type: { $type: String, required: true, enum: requestTypes },

  expires: { $type: Date },

  donations: [
    {
      _at: { $type: Date, required: true, default: Date.now },
      volunteer_id: { $type: ObjectId, ref: 'volunteer' },
      approved: { $type: Boolean, required: true, default: true },
      data: { $type: String }
    }
  ]
}
