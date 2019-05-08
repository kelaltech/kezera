import { SchemaDefinition, Schema } from 'mongoose'

import { IOrganType } from './organ.model'

const ObjectId = Schema.Types.ObjectId
export const ORGAN_TYPE: IOrganType[] = [
  'LUNGS',
  'HEART',
  'LIVER',
  'PANCREAS',
  'KIDNEYS',
  'SMALL_INTESTINE',
  'BLOOD'
]
export const organPaths: SchemaDefinition = {
  _at: { type: Date, default: Date.now },
  request: { type: ObjectId, ref: 'request' },
  type: { type: String, enum: ORGAN_TYPE, required: true },
  pledges: [{ type: ObjectId, ref: 'account' }]
}
