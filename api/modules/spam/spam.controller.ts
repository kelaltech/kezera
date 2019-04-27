import { ClientSession } from 'mongoose'

import { KoaController } from '../../lib/koa-controller'
import {
  ISpamReportType,
  SpamReportModel
} from '../../models/spam-report/spam-report.model'
import { ISpamReportRequest, ISpamReportResponseBase } from './spam.apiv'
import { add, edit, get, remove, search } from '../../lib/crud'
import { spamReportDocumentToResponse, spamReportRequestToDocument } from './spam.filter'
import { KoaError } from '../../lib/koa-error'
import { OrganizationModel } from '../../models/organization/organization.model'
import { AccountModel } from '../../models/account/account.model'
import { removeRequest } from '../request/request.controller'
import { removeEvent } from '../event/event.controller'
import { EventModel } from '../../models/event/event.model'
import { removeNews } from '../news/news.controller'

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

  async searchReports(
    session?: ClientSession,
    term = super.getQuery('term'),
    count = super.getQuery('count') ? Number(super.getQuery('count')) : 10,
    since = super.getQuery('since') ? Number(super.getQuery('since')) : Date.now()
  ): Promise<ISpamReportResponseBase[]> {
    const spamReports = await search(SpamReportModel, term, { session, count, since })
    return await Promise.all(
      spamReports.map(spamReport => spamReportDocumentToResponse(spamReport))
    )
  }

  async getReport(
    session?: ClientSession,
    _id = super.getParam('_id')
  ): Promise<ISpamReportResponseBase> {
    const spamReport = await get(SpamReportModel, _id, { session })
    return await spamReportDocumentToResponse(spamReport)
  }

  async handle(session?: ClientSession, _id = super.getParam('_id')): Promise<void> {
    const spamReport = await get(SpamReportModel, _id, { session })

    switch (spamReport.type) {
      case 'ORGANIZATION':
        const organization = await get(OrganizationModel, spamReport.ids[0], { session })
        const account = await get(AccountModel, organization.account, { session })
        account.status = 'BLOCKED'
        await edit(AccountModel, account._id, account.toJSON(), { session })
        break

      case 'REQUEST':
        await removeRequest(spamReport.ids[0])
        break

      case 'EVENT':
        const event = await get(EventModel, spamReport.ids[0])
        await removeEvent(event._id, event.organizationId)
        break

      case 'NEWS':
        await removeNews(spamReport.ids[0])
        break

      default:
        // @ts-ignore
        throw new KoaError(`Cannot handle spam report of type "${spamReport.type}".`)
    }

    await remove(SpamReportModel, spamReport._id, { session })
    // todo: log activity
  }

  async ignoreReport(
    session?: ClientSession,
    _id = super.getParam('_id')
  ): Promise<void> {
    await remove(SpamReportModel, _id, { check: true, session })
    // todo: log activity
  }
}
