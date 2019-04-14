import { SchemaDefinition } from 'mongoose'

import { IOrganType } from './organ.model'

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
  _at: { type: Date, default: Date.now },
  type: { type: String, enum: ORGAN_TYPE, required: true }
}
