import { ClientSession } from 'mongoose'

import { KoaController } from '../../lib/koa-controller'
import { IAccountRequest, IAccountResponse } from './account.apiv'
import { accountDocumentToResponse, accountRequestToDocument } from './account.filter'
import {
  AccountModel,
  IAccountRole,
  IAccountStatus
} from '../../models/account/account.model'
import { add } from '../../lib/crud'

export class AccountController extends KoaController {
  async add(
    session: ClientSession | undefined,
    data = super.getRequestBody<IAccountRequest>(),
    role: IAccountRole = 'VOLUNTEER',
    status: IAccountStatus = 'ACTIVE'
  ): Promise<IAccountResponse> {
    let document = await accountRequestToDocument(data, role, status)

    await add(AccountModel, document, {
      session,
      preSave: async doc => {
        await doc.setPassword(data.password)
        return doc
      }
    })

    return accountDocumentToResponse(document)
  }
}
