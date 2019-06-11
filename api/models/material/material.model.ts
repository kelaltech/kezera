import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { materialPaths } from './material.path'

export type IMaterialStatus = 'NEW' | 'SLIGHTLY_USED' | 'USED' | 'OLD' | 'OTHER'
export const materialStatuses: IMaterialStatus[] = [
  'NEW',
  'SLIGHTLY_USED',
  'USED',
  'OTHER'
]

export type IMaterialType = 'CHAIR' | 'BED' | 'BOOKS' | 'CLOTH' | 'CARPET' | 'TABLE'
export const materialTypes: IMaterialType[] = [
  'CHAIR',
  'BED',
  'BOOKS',
  'CLOTH',
  'CARPET',
  'TABLE'
]

export interface IMaterial extends Document {
  _at?: Date | number
  status: IMaterialStatus
  materialType: IMaterialType
  quantity:number
  requestId: Schema.Types.ObjectId
}

export const materialModelFactory = new ModelFactory<IMaterial>({
  name: 'material',
  paths: materialPaths
})

export const MaterialModel = materialModelFactory.model
