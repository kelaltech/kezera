import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { taskPaths } from './task.path'

type ObjectId = Schema.Types.ObjectId

export interface ITask extends Document {
  numberNeeded: number
  type: ObjectId
  startTime: Date | number
  endTime: Date | number
  requestId: ObjectId
}

export const taskModelFactory = new ModelFactory<ITask>({
  name: 'task',
  paths: taskPaths
})

export const TaskModel = taskModelFactory.model
