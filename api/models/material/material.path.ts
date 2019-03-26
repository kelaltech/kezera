import { SchemaDefinition, Schema } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

export const materialPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  status: { type: Number },
  materialType: { type: Number, required: true },
  organizationId: { type: ObjectId, refs: 'organization' }
}
