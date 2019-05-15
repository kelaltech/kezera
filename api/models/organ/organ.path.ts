import { SchemaDefinition, Schema } from 'mongoose'

import { IOrganType } from './organ.model'

const ObjectId = Schema.Types.ObjectId
const ORGAN_TYPE: IOrganType[] = [
  'LUNGS',
  'HEART',
  'LIVER',
  'PANCREAS',
  'KIDNEYS',
  'SMALL_INTESTINE',
  'BLOOD'
]
export const organPaths: SchemaDefinition = {
  type: { type: ObjectId },
  requestId: { type: ObjectId, ref: 'request', required: true },
  organType: { type: String, enum: ORGAN_TYPE, required: true }
}
