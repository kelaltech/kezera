import { ISpamReportType } from '../../models/spam-report/spam-report.model'
import { IAccountPublicResponse } from '../account/account.apiv'

export type ISpamReportRequestBase = {
  type: ISpamReportType // only used for differentiating by types; always, overridden
  ids: string[]

  description: string
}
export type ISpamReportRequest =
  | ISpamReportRequestBase & { type: 'ORGANIZATION'; ids: [string /* organization */] }
  | ISpamReportRequestBase & { type: 'REQUEST'; ids: [string /* request */] }
  | ISpamReportRequestBase & { type: 'EVENT'; ids: [string /* event */] }
  | ISpamReportRequestBase & { type: 'NEWS'; ids: [string /* news */] }

export type ISpamReportResponseBase = {
  _id: string
  _at: number
  _last: number

  type: ISpamReportType
  ids: string[]

  reporter: IAccountPublicResponse
  description: string
}
export type ISpamReportResponse =
  | ISpamReportResponseBase & { type: 'ORGANIZATION'; ids: [string /* organization */] }
  | ISpamReportResponseBase & { type: 'REQUEST'; ids: [string /* request */] }
  | ISpamReportResponseBase & { type: 'EVENT'; ids: [string /* event */] }
  | ISpamReportResponseBase & { type: 'NEWS'; ids: [string /* news */] }
