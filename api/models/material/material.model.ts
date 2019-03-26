import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { materialPaths } from './material.path'

type ObjectId = Schema.Types.ObjectId | string | number

export interface IMaterial extends Document {
  _at: Date | number
  status: Number
  materialType: Number
  organizationId: ObjectId
}

export const materialModelFactory = new ModelFactory<IMaterial>({
  name: 'material',
  paths: materialPaths
})

export const MaterialModel = materialModelFactory.model
