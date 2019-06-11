import { Schema } from 'mongoose'

import { IOrganRequest, IOrganResponse } from './organ.apiv'
import { add, edit, get, list, remove } from '../../lib/crud'
import { OrganModel } from '../../models/organ/organ.model'

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

export async function getOrganFromRequest(request_id: ObjectId): Promise<IOrganResponse> {
  return get(OrganModel, null, { conditions: { request: request_id } }) as any // todo: filter?
}

export async function editOrgan(id: ObjectId, data: IOrganRequest): Promise<any> {
  return await edit(OrganModel, id, data)
}

export async function deleteOrgan(id: ObjectId): Promise<any> {
  return await remove(OrganModel, id)
}
