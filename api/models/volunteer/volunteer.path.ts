import { Schema, SchemaDefinition } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const VolunteerPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  account: { type: ObjectId, required: true, ref: 'account', unique: true },
  birthdate: { type: Date },
  country: { type: String },
  gender: { type: String },
  location: { type: String },
  username: {
    type: String,
    unique: true,
    sparse: true
  },
  privacy: {
    certificate: { type: Boolean, default: true },
    event: { type: Boolean, default: true },
    material: { type: Boolean, default: true },
    task: { type: Boolean, default: true },
    money: { type: Boolean, default: true }
  },
  portfolio: {
    events: [{ type: ObjectId, ref: 'event' }],
    tasks: [{ type: ObjectId, ref: 'task' }],
    certificate: [{ type: ObjectId, ref: 'certificate' }],
    material: [{ type: ObjectId, ref: 'material' }],
    money: [{ type: ObjectId, ref: 'fundraising' }],
    organ: [{ type: ObjectId, ref: 'organ' }]
  }
}
