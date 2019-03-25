import { ClientSession } from 'mongoose'
import { createReadStream } from 'fs'
import { Stream } from 'stream'

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
import { serverApp } from '../../index'
import { Grid } from '../../lib/grid'

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

    const request = await accountRequestToLeanDocument(
      data,
      status ||
        (document.status === 'BLOCKED' && 'BLOCKED') ||
        data.status ||
        document.status,
      role || document.role,
      user!._id
    )

    await edit(
      AccountModel,
      user!._id,
      Object.assign(document, request),
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

  /* PHOTO */

  async addPhoto(
    session?: ClientSession,
    ctx = super.getContext(),
    user = super.getUser()
  ): Promise<IAccountResponse> {
    const account = await get(AccountModel, user!._id)
    const grid = new Grid(serverApp, AccountModel, account._id, 'photo')

    await grid.set(createReadStream(ctx!.request.files!['photo'].path))

    return this.me(session, user)
  }

  async getPhoto(account_id = super.getParam('account_id')): Promise<Stream> {
    const account = await get(AccountModel, account_id)
    const grid = new Grid(serverApp, AccountModel, account._id, 'photo')

    return grid.get()
  }

  async removePhoto(
    session?: ClientSession,
    user = super.getUser()
  ): Promise<IAccountResponse> {
    const account = await get(AccountModel, user!._id)
    const grid = new Grid(serverApp, AccountModel, account._id, 'photo')

    await grid.remove()

    return this.me(session, user)
  }

  /* PASSWORD RESET */

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
