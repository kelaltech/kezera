import { add, list } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { TaskModel } from '../../models/task/task.model'

type ObjectId = Schema.Types.ObjectId | string

export async function AddTask(body: any, id: Schema.Types.ObjectId): Promise<void> {
  await add(TaskModel, { ...body, requestId: id })
}

export async function ListTasks(): Promise<Document[]> {
  return await list(TaskModel)
}

export async function getTask(requestId: ObjectId): Promise<any> {
  const task = await TaskModel.findOne({ requestId })
  return task
}
