import { ClientSession } from 'mongoose'
import { Stream } from 'stream'
import * as sharp from 'sharp'

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
import { add, edit, get, search } from '../../lib/crud'
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
  /* GENERAL: */

  async add(
    session?: ClientSession,
    data = super.getRequestBody<IAccountRequest>(),
    status: IAccountStatus = 'ACTIVE',
    role: IAccountRole = 'VOLUNTEER'
  ): Promise<IAccountResponse> {
    let document = await accountRequestToDocument(
      data,
      status,
      role,
      undefined as any,
      undefined as any
    )

    document = await add(AccountModel, document, {
      session,
      preSave: async doc => {
        if (!data.password)
          throw new KoaError(
            'Password is required to create a new account.',
            400,
            'NO_PASSWORD'
          )

        await doc.setPassword(data.password, session)
        return doc
      }
    })

    return accountDocumentToResponse(document)
  }

  async me(session?: ClientSession, user = super.getUser()): Promise<IAccountResponse> {
    const document = await get(AccountModel, user!._id, { session })

    return accountDocumentToResponse(document)
  }

  async search(
    session?: ClientSession,
    term = super.getQuery('term'),
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10
  ): Promise<IAccountResponse[]> {
    const organizations = await search(AccountModel, term, { session, since, count })
    return await Promise.all(
      organizations.map(organization => accountDocumentToResponse(organization))
    )
  }

  async searchVerifiers(
    session?: ClientSession,
    term = super.getQuery('term'),
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10
  ): Promise<IAccountResponse[]> {
    const organizations = await search(AccountModel, term, {conditions:{role:'VERIFIER'}, session, since, count })
    return await Promise.all(
      organizations.map(organization => accountDocumentToResponse(organization))
    )
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
      document.password,
      document.passwordSetOn,
      user!._id
    )

    await edit(
      AccountModel,
      user!._id,
      request,
      {
        session,
        postUpdate: async () => {
          document = await get(AccountModel, user!._id, { session })

          if (data.currentPassword && data.newPassword) {
            await document.changePassword(data.currentPassword, data.newPassword, session)
          }
          return document
        }
      },
      { overwrite: true }
    )

    return accountDocumentToResponse(document)
  }

  /* PHOTO: */

  async addPhoto(
    session?: ClientSession,
    ctx = super.getContext(),
    user = super.getUser()
  ): Promise<IAccountResponse> {
    const account = await get(AccountModel, user!._id)
    const grid = new Grid(serverApp, AccountModel, account._id, 'photo')

    const photo = ctx!.request.files!['photo']
    const stream = sharp(photo.path)
      .resize(1080, 1080, { fit: 'cover' })
      .jpeg({ quality: 100 })

    return new Promise<IAccountResponse>(async (resolve, reject) => {
      stream.on('error', reject)

      await grid.set(stream, 'image/jpeg')

      resolve(this.me(session, user))
    })
  }

  async getPhoto(
    account_id = super.getParam('account_id'),
    size = Number(super.getQuery('size')) || 200,
    quality = Number(super.getQuery('quality')) || 80,
    ctx = super.getContext()
  ): Promise<Stream> {
    const account = await get(AccountModel, account_id)
    const grid = new Grid(serverApp, AccountModel, account._id, 'photo')

    if (ctx) ctx.type = await grid.getType()

    const resize = sharp()
      .resize(size, size, { fit: 'cover' })
      .jpeg({ quality, chromaSubsampling: '4:4:4' })

    return (await grid.get()).pipe(resize)
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

  /* PASSWORD RESET: */

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

  /* TRACKING */

  async setLastLocation(
    session?: ClientSession,
    data = super.getRequestBody<{ longitude: number; latitude: number }>(),
    account_id = super.getUser()!._id
  ) {
    await edit(
      AccountModel,
      account_id,
      { lastLocation: { type: 'Point', coordinates: [data.longitude, data.latitude] } },
      { session }
    )
  }
}
