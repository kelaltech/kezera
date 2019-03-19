import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { keyPaths } from './key.paths'
import { keyStatics } from './key.statics'

export type IKeyPurpose = 'PASSWORD_RESET'
export const keyPurposes: IKeyPurpose[] = ['PASSWORD_RESET']

type ObjectId = Schema.Types.ObjectId | string

export interface IKey {
  __v: number
  _id: ObjectId
  _at: Date | number

  purpose: IKeyPurpose
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
  _at: -1,
  purpose: true,
  email: true
})

export const KeyModel = keyModelFactory.model
