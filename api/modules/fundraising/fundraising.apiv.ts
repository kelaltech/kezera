import { ITaskType } from '../../models/task/task.model'

export type IFundraisingRequest = {
  type: ITaskType

  target: number
}

export type IFundraisingResponse = {
  _id: string
  _at: Date | number

  request: string // request

  type: ITaskType

  startDate: Date | number
  endDate: Date | number

  numberNeeded: number
}
