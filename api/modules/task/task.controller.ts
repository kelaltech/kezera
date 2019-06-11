import { add, get, list } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { TaskModel } from '../../models/task/task.model'
import { ITaskResponse } from './task.apiv'
import { taskDocumentToResponse } from './task.filter'

type ObjectId = Schema.Types.ObjectId | string

export async function AddTask(body: any, id: Schema.Types.ObjectId): Promise<void> {
  await add(TaskModel, { ...body, request: id })
}

export async function ListTasks(): Promise<Document[]> {
  return list(TaskModel)
}

export async function getTaskFromRequest(request_id: ObjectId): Promise<ITaskResponse> {
  return taskDocumentToResponse(
    await get(TaskModel, null, { conditions: { request: request_id } })
  )
}
