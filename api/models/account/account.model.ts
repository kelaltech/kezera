import { ModelFactory } from 'meseret'

import { accountPaths } from './account.paths'
import { accountMethods } from './account.methods'

export type IAccountRole = 'ADMIN' | 'VERIFIER' | 'ORGANIZATION' | 'VOLUNTEER'
export const accountRoles: IAccountRole[] = [
  'ADMIN',
  'VERIFIER',
  'ORGANIZATION',
  'VOLUNTEER'
]

export type IAccountStatus = 'ACTIVE' | 'BLOCKED' | 'DISABLED'
export const accountStatuses: IAccountStatus[] = ['ACTIVE', 'BLOCKED', 'DISABLED']

export interface IAccount {
  _at?: Date | number
  _last: Date | number

  role: IAccountRole
  status: IAccountStatus

  email: string
  password: string
  passwordSetOn: Date | number

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
