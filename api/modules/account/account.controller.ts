import { ClientSession } from 'mongoose'

import { KoaController } from '../../lib/koa-controller'
import { IAccountRequest, IAccountResponse } from './account.apiv'
import {
  accountDocumentToResponse,
  accountRequestToDocument,
  accountRequestToLeanDocument
} from './account.filter'
import {
  AccountModel,
  IAccountRole,
  IAccountStatus
} from '../../models/account/account.model'
import { add, edit, get } from '../../lib/crud'
import {
  finishPasswordReset,
  IPasswordResetFinishRequest,
  IPasswordResetStartRequest,
  startPasswordReset
} from '../../lib/password'
import { KoaError } from '../../lib/koa-error'

export class AccountController extends KoaController {
  /* GENERAL */

  async add(
    session?: ClientSession,
    data = super.getRequestBody<IAccountRequest>(),
    status: IAccountStatus = 'ACTIVE',
    role: IAccountRole = 'VOLUNTEER'
  ): Promise<IAccountResponse> {
    let document = await accountRequestToDocument(data, status, role)

    document = await add(AccountModel, document, {
      session,
      preSave: async doc => {
        if (!data.password)
          throw new KoaError(
            'Password is required to create a new account.',
            400,
            'NO_PASSWORD'
          )

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

  async editMe(
    session?: ClientSession,
    data = super.getRequestBody<IAccountRequest>(),
    status?: IAccountStatus,
    role?: IAccountRole,
    user = super.getUser()
  ): Promise<IAccountResponse> {
    let document = await get(AccountModel, user!._id, { session })

    await edit(
      AccountModel,
      user!._id,
      Object.assign(
        document,
        await accountRequestToLeanDocument(
          data,
          status || document.status,
          role || document.role,
          user!._id
        )
      ),
      {
        session,
        preUpdate: async doc => {
          if (data.currentPassword && data.newPassword)
            await doc.changePassword(data.currentPassword, data.newPassword)
          return doc
        }
      },
      { overwrite: true }
    )
    document = await get(AccountModel, user!._id, { session })

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
      { session, finishPath: '/login/reset/finish' }
    )
  }

  async finishPasswordReset(
    session?: ClientSession,
    data = this.getRequestBody<IPasswordResetFinishRequest>()
  ): Promise<void> {
    return finishPasswordReset(AccountModel, data, { session })
  }
}
