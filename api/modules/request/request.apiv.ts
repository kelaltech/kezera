import { Schema } from 'mongoose'

type ObjectId = Schema.Types.ObjectId

type IRequestCommons = {
  _at: Date | number
  _by: ObjectId
  name: String
  description: String
  startDate: Date | number
  endDate?: Date | number
  picture?: string
}

export type IRequestResponse =
  | IRequestCommons & {
      type: 'Fundraising'
      fundraising: any
    }
  | IRequestCommons & {
      type: 'Task'
      task: any
    }
