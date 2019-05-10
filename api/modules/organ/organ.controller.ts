import { IOrganRequest } from './organ.apiv'
import { add, edit, list, remove } from '../../lib/crud'
import { OrganModel } from '../../models/organ/organ.model'
import { Schema } from 'mongoose'

type ObjectId = Schema.Types.ObjectId | string

export async function AddOrgan(body: any, id: Schema.Types.ObjectId): Promise<void> {
  await add(OrganModel, { ...body, requestId: id })
}

export async function listOrganRequest(count = 5, since = Date.now()): Promise<any> {
  return await list(OrganModel, {
    count: count,
    since: since,
    postQuery: p => p.populate('request')
  })
}

export async function getOrgan(requestId: ObjectId): Promise<any> {
  const organ = await OrganModel.findOne({ requestId })
  return organ
}

export async function editOrgan(id: ObjectId, data: IOrganRequest): Promise<any> {
  return await edit(OrganModel, id, data)
}

export async function deleteOrgan(id: ObjectId): Promise<any> {
  return await remove(OrganModel, id)
}
