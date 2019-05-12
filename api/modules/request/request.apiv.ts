import { Schema } from 'mongoose'

type ObjectId = Schema.Types.ObjectId

export type IRequestCommons = {
  _at: Date | number
  _by: ObjectId
  name: String
  description: String
  goingVolunteers?: Schema.Types.ObjectId[]
  attended?: Schema.Types.ObjectId[]
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
  | IRequestCommons & {
      type: 'Material'
      fundraising: any
    }
  | IRequestCommons & {
      type: 'Organ'
      task: any
    }
