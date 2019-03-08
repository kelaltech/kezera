import { ModelFactory } from 'meseret'
import { Document } from 'mongoose'
import { keyPaths } from './key.paths'
import { keyStatics } from './key.statics'

export type KeyPurposeType = 'PASSWORD_RESET'

export interface IKey extends Document {
  _at: Date | number
  purpose: KeyPurposeType
  email?: string
  randomKey: string
  expiry?: Date
}

export const keyModelFactory = new ModelFactory<IKey, {}, typeof keyStatics>({
  name: 'key',
  paths: keyPaths,
  statics: keyStatics
})

export const KeySchema = keyModelFactory.schema
KeySchema.index({
  purpose: 1,
  email: 1,
  randomKey: 1
})

export const KeyModel = keyModelFactory.model
