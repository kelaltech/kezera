import { Schema, SchemaDefinition } from 'mongoose'
import { materialStatuses, materialTypes } from './material.model'

export const materialPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  status: { type: String, enum: materialStatuses, required: true },
  materialType: { type: String, enum: materialTypes, required: true },
  donationId: { type: Schema.Types.ObjectId, refs: 'donation', required: true }
}
