import { IAccountRole, IAccountStatus } from '../../models/account/account.model'

export type IAccountRequest = {
  status: IAccountStatus

  email: string
  password: string

  displayName: string
  phoneNumber?: string
}

export type IAccountResponse = {
  _id: string

  role: IAccountRole
  status: IAccountStatus

  email: string

  displayName: string
  phoneNumber?: string
}
