import { Schema, SchemaDefinition } from 'mongoose'
import { materialStatuses, materialTypes } from './material.model'

export const materialPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  status: { type: String, enum: materialStatuses, required: true },
  quantity:{type:Number,required:true},
  materialType: { type: String, enum: materialTypes, required: true },
  requestId: { type: Schema.Types.ObjectId, refs: 'request', required: true }
}
