import { ModelFactory } from 'meseret'
import { Document } from 'mongoose'
import { organPaths } from './organ.path'

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
  type: IOrganType
}

export const organModelFactory = new ModelFactory<IOrgan>({
  name: 'organ',
  paths: organPaths
})

export const OrgnaModel = organModelFactory.model
