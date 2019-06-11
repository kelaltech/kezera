import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { requestPaths } from './request.path'

type ObjectId = Schema.Types.ObjectId

export type IRequestStatus = 'OPEN' | 'CLOSED'
export const requestStatuses: IRequestStatus[] = ['OPEN', 'CLOSED']

export type IRequestType = 'Fundraising' | 'Material' | 'Organ' | 'Task'
export const requestTypes: IRequestType[] = ['Fundraising', 'Material', 'Organ', 'Task']

export interface IRequest extends Document {
  _at?: Date | number

  _by: ObjectId

  name: string
  description: string

  status: IRequestStatus
  type: IRequestType

  expires?: Date | number

  donations: {
    _at?: Date | number
    volunteer_id: ObjectId
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
    type: 'text',
    'volunteers.displayName': 'text'
  },
  {
    name: 'request_search',
    weights: {
      // default is 1
      type: 15,
      name: 10,
      description: 5
    }
  }
)
