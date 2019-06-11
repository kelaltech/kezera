import { ITaskType } from '../../models/task/task.model'

export type ITaskRequest = {
  _at?: Date | number

  request: string // request

  type: ITaskType

  startDate: Date | number
  endDate: Date | number

  numberNeeded: number
}

export type ITaskResponse = {
  _id: string
  _at: Date | number

  request: string // request

  type: ITaskType

  startDate: Date | number
  endDate: Date | number

  numberNeeded: number
}
