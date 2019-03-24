import { Document, Schema } from 'mongoose'

import {
  AccountModel,
  IAccount,
  IAccountRole,
  IAccountStatus
} from '../../models/account/account.model'
import { IAccountRequest, IAccountResponse } from './account.apiv'

type ObjectId = Schema.Types.ObjectId | string

export async function accountRequestToDocument(
  request: IAccountRequest,
  status: IAccountStatus,
  role: IAccountRole,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<Document & IAccount> {
  const account = new AccountModel({
    _id,
    _last,

    status,
    role,

    email: request.email,
    // set/change password manually (using postSave/preUpdate)

    displayName: request.displayName,
    phoneNumber: request.phoneNumber === null ? undefined : request.phoneNumber
  })
  console.log(request.phoneNumber)
  account.markModified('phoneNumber')
  return account
}

export async function accountDocumentToResponse(
  document: Document & IAccount
): Promise<IAccountResponse> {
  return {
    _id: document._id,

    role: document.role,
    status: document.status,

    email: document.email,
    passwordSetOn: new Date(document.passwordSetOn).getTime(),

    displayName: document.displayName,
    phoneNumber: document.phoneNumber
  }
}
