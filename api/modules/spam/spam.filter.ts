import { ClientSession, Document, Schema } from 'mongoose'

import {
  ISpamReport,
  ISpamReportBase,
  SpamReportModel
} from '../../models/spam-report/spam-report.model'
import { ISpamReportRequest, ISpamReportResponseBase } from './spam.apiv'
import { accountDocumentToPublicResponse } from '../account/account.filter'
import { AccountModel } from '../../models/account/account.model'
import { get } from '../../lib/crud'

type ObjectId = Schema.Types.ObjectId | string

export async function spamReportRequestToLeanDocument(
  request: ISpamReportRequest,
  reporter: ObjectId, // account
  _id?: ObjectId, // spam-report
  _last: Date | number = Date.now()
): Promise<ISpamReportBase & { _id?: ObjectId }> {
  const { ids, type, description } = request
  return {
    _id,
    _last,

    type,
    ids,

    reporter,
    description
  }
}

export async function spamReportRequestToDocument(
  request: ISpamReportRequest,
  reporter: ObjectId, // account
  _id?: ObjectId, // spam-report
  _last: Date | number = Date.now()
): Promise<Document & ISpamReport> {
  return new SpamReportModel(
    await spamReportRequestToLeanDocument(request, reporter, _id, _last)
  )
}

export async function spamReportDocumentToResponse(
  document: Document & ISpamReport,
  session?: ClientSession
): Promise<ISpamReportResponseBase> {
  const { _id, _at, _last, type, ids, reporter: reporter_id, description } = document

  const reporter = await accountDocumentToPublicResponse(
    await get(AccountModel, reporter_id, { session })
  )

  return {
    _id: _id.toString(),
    _at: new Date(_at!).getTime(),
    _last: new Date(_last!).getTime(),

    type,
    ids: ids.map(id => id.toString()),

    reporter,
    description
  }
}
