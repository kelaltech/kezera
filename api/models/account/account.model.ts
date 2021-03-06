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

export type IAccount = {
  _at?: Date | number
  _last: Date | number

  role: IAccountRole
  status: IAccountStatus

  email: string
  password: string
  passwordSetOn: Date | number

  displayName: string
  phoneNumber?: string

  lastLocation?: {
    type: 'Point'
    coordinates: [number, number]
  }
}

export const accountModelFactory = new ModelFactory<IAccount, typeof accountMethods>({
  name: 'account',
  paths: accountPaths,
  options: { typeKey: '$type' },
  methods: accountMethods
})

export const accountSchema = accountModelFactory.schema

export const AccountModel = accountModelFactory.model

AccountModel.collection.ensureIndex(
  {
    role: 'text',
    email: 'text',
    displayName: 'text',
    phoneNumber: 'text'
  },
  {
    name: 'account_search',
    weights: {
      // default is 1
      displayName: 10
    }
  }
)

AccountModel.collection.createIndex({ lastLocation: '2dsphere' }, { sparse: true })
