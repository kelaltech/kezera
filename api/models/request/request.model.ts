import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { requestPaths } from './request.path'

type ObjectId = Schema.Types.ObjectId

export type IRequestType = 'Fundraising' | 'Material' | 'Organ' | 'Task'

export const requestTypes: IRequestType[] = ['Fundraising', 'Material', 'Organ', 'Task']

export interface IRequest extends Document {
  _at: Date | number
  _by: ObjectId
  name: String
  description: String
  startDate: Date | number
  endDate?: Date | number
  type?: IRequestType
}

export const requestModelFactory = new ModelFactory<IRequest>({
  name: 'request',
  paths: requestPaths
})

export const RequestModel = requestModelFactory.model
