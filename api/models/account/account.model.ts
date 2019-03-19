import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { accountPaths } from './account.paths'
import { accountMethods } from './account.methods'

type ObjectId = Schema.Types.ObjectId | string

export type IAccountRole = 1 | 2
export const accountRoles = [1, 2]

export type IAccountStatus = 1 | 2
export const accountStatuses = [1, 2]

export interface IAccount {
  __v: number
  _id: ObjectId
  _at: Date | number
  _last: Date | number

  role: IAccountRole
  status: IAccountStatus

  email: string
  password: string

  displayName: string
  phoneNumber?: string
}

export const accountModelFactory = new ModelFactory<IAccount, typeof accountMethods>({
  name: 'account',
  paths: accountPaths,
  methods: accountMethods
})

export const accountSchema = accountModelFactory.schema

export const AccountModel = accountModelFactory.model
