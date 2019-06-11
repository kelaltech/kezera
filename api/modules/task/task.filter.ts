import { Document, Schema } from 'mongoose'

import { ITaskRequest, ITaskResponse } from './task.apiv'
import { TaskModel, ITask } from '../../models/task/task.model'

type ObjectId = Schema.Types.ObjectId | string

export async function taskRequestToLeanDocument(
  request: ITaskRequest,
  request_id: ObjectId, // request
  _id?: ObjectId
): Promise<ITask & { _id?: ObjectId }> {
  const { type, startDate, endDate, numberNeeded } = request

  const leanDocument: ITask & { _id?: ObjectId } = {
    _id,

    request: request_id,

    type,

    startDate,
    endDate,

    numberNeeded
  }

  return leanDocument
}

export async function taskRequestToDocument(
  request: ITaskRequest,
  request_id: ObjectId, // request
  _id?: ObjectId
): Promise<Document & ITask> {
  return new TaskModel(await taskRequestToLeanDocument(request, request_id, _id))
}

export async function taskDocumentToResponse(
  document: Document & ITask
): Promise<ITaskResponse> {
  const { _id, _at, request, type, startDate, endDate, numberNeeded } = document

  const response: ITaskResponse = {
    _id: _id,
    _at: new Date(_at!).getTime(),

    request: request.toString(),

    type,

    startDate,
    endDate,

    numberNeeded
  }

  return response
}
