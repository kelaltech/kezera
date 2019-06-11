import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { requestPaths } from './request.path'

type ObjectId = Schema.Types.ObjectId | string

export type IRequestStatus = 'OPEN' | 'CLOSED'
export const requestStatuses: IRequestStatus[] = ['OPEN', 'CLOSED']

export type IRequestType = 'Fundraising' | 'Material' | 'Organ' | 'Task'
export const requestTypes: IRequestType[] = ['Fundraising', 'Material', 'Organ', 'Task']

export interface IRequest {
  _at?: Date | number

  _by: ObjectId

  name: string
  description: string

  status: IRequestStatus
  type: IRequestType

  expires?: Date | number

  donations: {
    _at?: Date | number
    volunteer: ObjectId
    approved?: boolean // true by default (todo: until verification feature is added)
    data?: string // a number string for .type === 'Fundraising'
  }[]
}

export const requestModelFactory = new ModelFactory<IRequest>({
  name: 'request',
  paths: requestPaths,
  options: { typeKey: '$type' }
})

export const RequestModel = requestModelFactory.model

RequestModel.collection.ensureIndex(
  {
    name: 'text',
    description: 'text',

    status: 'text',
    type: 'text',

    'donations.volunteer.username': 'text',
    'donations.volunteer.account.displayName': 'text',
    'donations.volunteer.account.email': 'text',
    'donations.volunteer.account.phoneNumber': 'text',

    'donations.data': 'text'
  },
  {
    name: 'request_search',
    weights: {
      // default is 1
      name: 10,
      description: 5,
      status: 15,
      type: 15
    }
  }
)
