import { ClientSession } from 'mongoose'

import { KoaController } from '../../lib/koa-controller'
import { IAccountRequest, IAccountResponse } from './account.apiv'
import { accountDocumentToResponse, accountRequestToDocument } from './account.filter'
import {
  AccountModel,
  IAccountRole,
  IAccountStatus
} from '../../models/account/account.model'
import { add, get } from '../../lib/crud'
import {
  finishPasswordReset,
  IPasswordResetFinishRequest,
  IPasswordResetStartRequest,
  startPasswordReset
} from '../../lib/password'

export class AccountController extends KoaController {
  /* GENERAL */

  async add(
    session?: ClientSession,
    data = super.getRequestBody<IAccountRequest>(),
    role: IAccountRole = 'VOLUNTEER',
    status: IAccountStatus = 'ACTIVE'
  ): Promise<IAccountResponse> {
    let document = await accountRequestToDocument(data, role, status)

    document = await add(AccountModel, document, {
      session,
      preSave: async doc => {
        await doc.setPassword(data.password)
        return doc
      }
    })

    return accountDocumentToResponse(document)
  }

  async me(session?: ClientSession, user = super.getUser()): Promise<IAccountResponse> {
    const document = await get(AccountModel, user!._id, { session })

    return accountDocumentToResponse(document)
  }

  /* ACCOUNT RESET */

  async startPasswordReset(
    session?: ClientSession,
    data = this.getRequestBody<IPasswordResetStartRequest>(),
    ctx = this.getContext()
  ): Promise<void> {
    return startPasswordReset(
      AccountModel,
      Object.assign(data, { domain: ctx!.origin }),
      { session, finishPath: '/account/reset/finish' }
    )
  }

  async finishPasswordReset(
    session?: ClientSession,
    data = this.getRequestBody<IPasswordResetFinishRequest>()
  ): Promise<void> {
    return finishPasswordReset(AccountModel, data, { session })
  }
}
