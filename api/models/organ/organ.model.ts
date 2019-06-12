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
  requestId: ObjectId
  organType: IOrganType
  type: ObjectId

  quantity: number
}

export const OrganModelFactory = new ModelFactory<IOrgan>({
  name: 'organ',
  paths: organPaths
})

export const OrganModel = OrganModelFactory.model
