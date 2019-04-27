import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { spamPaths } from './spam.paths'

type ObjectId = Schema.Types.ObjectId | string

export type ISpamType = 'ORGANIZATION' | 'REQUEST' | 'EVENT' | 'NEWS'
export const spamTypes: ISpamType[] = ['ORGANIZATION', 'REQUEST', 'EVENT', 'NEWS']

type ISpamBase = {
  _at?: Date | number
  _last: Date | number

  type: ISpamType
  ids: ObjectId[]

  reporter: ObjectId // account
  description: string
}
export type ISpam =
  | ISpamBase & { type: 'ORGANIZATION'; ids: [ObjectId /* organization */] }
  | ISpamBase & { type: 'REQUEST'; ids: [ObjectId /* request */] }
  | ISpamBase & { type: 'EVENT'; ids: [ObjectId /* event */] }
  | ISpamBase & { type: 'NEWS'; ids: [ObjectId /* news */] }

export const spamModelFactory = new ModelFactory<ISpam>({
  name: 'spam',
  paths: spamPaths
})

export const spamSchema = spamModelFactory.schema

export const SpamModel = spamModelFactory.model

SpamModel.collection.ensureIndex(
  {
    type: 'text',
    ids: 'text',
    description: 'text'
  },
  {
    name: 'spam_search',
    weights: {
      // default is 1
      type: 10,
      description: 5
    }
  }
)
