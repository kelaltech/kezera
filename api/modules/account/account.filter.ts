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
  role: IAccountRole,
  status: IAccountStatus,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<Document & IAccount> {
  return new AccountModel({
    _id,
    _last,

    role,
    status,

    email: request.email,
    // set password manually (using preSave, or preUpdate)

    displayName: request.displayName,
    phoneNumber: request.phoneNumber
  })
}

export async function accountDocumentToResponse(
  document: Document & IAccount
): Promise<IAccountResponse> {
  return {
    _id: document._id,

    role: document.role,
    status: document.status,

    email: document.email,

    displayName: document.displayName,
    phoneNumber: document.phoneNumber
  }
}
