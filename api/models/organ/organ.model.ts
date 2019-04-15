import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { organPaths } from './organ.path'

export type ObjectId = Schema.Types.ObjectId
export type IOrganType =
  | 'LUNGS'
  | 'HEART'
  | 'LIVER'
  | 'PANCREAS'
  | 'KIDNEYS'
  | 'SMALL_INTESTINE'
  | 'BLOOD'

export interface IOrgan extends Document {
  _at: Date | number
  request: ObjectId
  type: IOrganType
}

export const organModelFactory = new ModelFactory<IOrgan>({
  name: 'organ',
  paths: organPaths
})

export const OrganModel = organModelFactory.model
