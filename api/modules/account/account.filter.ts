import { Document, Schema } from 'mongoose'

import {
  AccountModel,
  IAccount,
  IAccountRole,
  IAccountStatus
} from '../../models/account/account.model'
import { IAccountPublicResponse, IAccountRequest, IAccountResponse } from './account.apiv'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'

type ObjectId = Schema.Types.ObjectId | string

export async function accountRequestToLeanDocument(
  request: IAccountRequest,
  status: IAccountStatus,
  role: IAccountRole,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<any> {
  return {
    _id,
    _last,

    status,
    role,

    email: request.email,
    // set/change password manually (using postSave/preUpdate)

    displayName: request.displayName,
    phoneNumber: request.phoneNumber === null ? undefined : request.phoneNumber
  }
}

export async function accountRequestToDocument(
  request: IAccountRequest,
  status: IAccountStatus,
  role: IAccountRole,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<Document & IAccount> {
  return new AccountModel(
    await accountRequestToLeanDocument(request, status, role, _id, _last)
  )
}

export async function accountDocumentToResponse(
  document: Document & IAccount,
  photoUri?: string | null
): Promise<IAccountResponse> {
  const response: IAccountResponse = {
    _at: new Date(document._at!).getTime(),
    _id: document._id,

    status: document.status,
    role: document.role,

    email: document.email,
    passwordSetOn: new Date(document.passwordSetOn).getTime(),

    displayName: document.displayName,
    phoneNumber: document.phoneNumber
  }
  if (photoUri !== null) {
    if (photoUri !== undefined) {
      response.photoUri = photoUri
    } else if (response._id) {
      const has = await new Grid(
        serverApp,
        AccountModel,
        response._id,
        'photo',
        false
      ).has()

      if (has) response.photoUri = `/api/account/get-photo/${response._id}`
      // i.e. all account photos are public
    }
  }
  return response
}

export async function accountDocumentToPublicResponse(
  document: Document & IAccount,
  photoUri?: string | null
): Promise<IAccountPublicResponse> {
  const response = await accountDocumentToResponse(document, photoUri)

  // !!! blacklist
  delete response.passwordSetOn

  return response
}
