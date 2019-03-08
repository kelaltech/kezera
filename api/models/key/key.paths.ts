import { SchemaDefinition } from 'mongoose'

export const keyPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  purpose: { type: String, required: true, enum: ['PASSWORD_RESET'] },
  email: { type: String },
  randomKey: { type: String, required: true },
  expiry: {
    type: Date,
    required: true,
    default: () => {
      return Date.now() + 1000 * 60 * 60
    }
  }
}
