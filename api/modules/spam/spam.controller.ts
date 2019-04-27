import { ClientSession } from 'mongoose'

import { KoaController } from '../../lib/koa-controller'
import {
  ISpamReportType,
  SpamReportModel
} from '../../models/spam-report/spam-report.model'
import { ISpamReportRequest, ISpamReportResponseBase } from './spam.apiv'
import { add } from '../../lib/crud'
import { spamReportDocumentToResponse, spamReportRequestToDocument } from './spam.filter'

export class SpamController extends KoaController {
  /* REPORT */

  async report(
    type: ISpamReportType,
    session?: ClientSession,
    body = super.getRequestBody<ISpamReportRequest>(),
    account_id = super.getUser()!._id
  ): Promise<ISpamReportResponseBase> {
    // override
    body.type = type

    const spamReport = await add(
      SpamReportModel,
      await spamReportRequestToDocument(body, account_id),
      { session }
    )
    return await spamReportDocumentToResponse(spamReport)
  }

  /* GENERAL */

  async listReports(session?: ClientSession): Promise<void> {
    session // todo
  }

  async getReport(session?: ClientSession): Promise<void> {
    session // todo
  }

  async handle(session?: ClientSession): Promise<void> {
    session // todo
  }

  async ignoreReport(session?: ClientSession): Promise<void> {
    session // todo
  }
}
