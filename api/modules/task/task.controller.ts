import { add } from '../../lib/crud'
import { Schema } from 'mongoose'
import { TaskModel } from '../../models/task/task.model'

export async function addTask(id: Schema.Types.ObjectId): Promise<void> {
  await add(TaskModel, id)
}
