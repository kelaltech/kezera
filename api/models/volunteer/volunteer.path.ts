import { Schema, SchemaDefinition} from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const VolunteerPaths: SchemaDefinition = {
  _at: {type: Date, default: Date.now},
  account: {type: ObjectId, required: true, ref:'account', unique: true},
  birthdate: {type: Date},
  country: {type: String},
  gender: {type: String},
  location: {type: String},
  username: {type: String, unique: true}
}