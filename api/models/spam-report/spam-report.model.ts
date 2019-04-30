import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { spamReportPaths } from './spam-report.paths'

type ObjectId = Schema.Types.ObjectId | string

export type ISpamReportType = 'ORGANIZATION' | 'REQUEST' | 'EVENT' | 'NEWS'
export const spamReportTypes: ISpamReportType[] = [
  'ORGANIZATION',
  'REQUEST',
  'EVENT',
  'NEWS'
]

export type ISpamReportBase = {
  _at?: Date | number
  _last: Date | number

  type: ISpamReportType
  ids: ObjectId[]

  reporter: ObjectId // account
  description: string
}
export type ISpamReport =
  | ISpamReportBase & { type: 'ORGANIZATION'; ids: [ObjectId /* organization */] }
  | ISpamReportBase & { type: 'REQUEST'; ids: [ObjectId /* request */] }
  | ISpamReportBase & { type: 'EVENT'; ids: [ObjectId /* event */] }
  | ISpamReportBase & { type: 'NEWS'; ids: [ObjectId /* news */] }

export const spamReportModelFactory = new ModelFactory<ISpamReport>({
  name: 'spam-report',
  paths: spamReportPaths
})

export const spamReportSchema = spamReportModelFactory.schema

export const SpamReportModel = spamReportModelFactory.model

SpamReportModel.collection.ensureIndex(
  {
    type: 'text',
    ids: 'text',
    description: 'text'
  },
  {
    name: 'spam_report_search',
    weights: {
      // default is 1
      type: 10,
      description: 5
    }
  }
)
