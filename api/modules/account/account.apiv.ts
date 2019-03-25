import { IAccountRole, IAccountStatus } from '../../models/account/account.model'

export type IAccountRequest = {
  status?: IAccountStatus // exclude 'BLOCKED' manually in server code (for security)

  email: string
  password?: string // for add

  currentPassword?: string // for edit (1 of 2)
  newPassword?: string // for edit (2 of 2)

  displayName: string
  phoneNumber: string | null // optional
}

export type IAccountResponse = {
  _id: string

  role: IAccountRole
  status: IAccountStatus

  email: string
  passwordSetOn: number

  displayName: string
  phoneNumber?: string

  photoUri?: string
}

import {
  IPasswordResetStartRequest,
  IPasswordResetFinishRequest
} from '../../lib/password'
export type IAccountResetStartRequest = IPasswordResetStartRequest
export type IAccountResetFinishRequest = IPasswordResetFinishRequest
