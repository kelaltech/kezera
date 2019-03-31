import { add, list } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { TaskModel } from '../../models/task/task.model'

export async function AddTask(body: any, id: Schema.Types.ObjectId): Promise<void> {
  body.organizationId = id
  await add(TaskModel, body)
}

export async function ListTasks(): Promise<Document[]> {
  return await list(TaskModel)
}
