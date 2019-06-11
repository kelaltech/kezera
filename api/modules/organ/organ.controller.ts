import { Schema } from 'mongoose'

import { IOrganResponse } from './organ.apiv'
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
  return get(OrganModel, null, { conditions: { requestId: request_id } }) as any // todo: filter?
}

export async function editOrgan(data: any): Promise<any> {
  let org = {
    _id: data._id,
    organType: data.organType,
    quantity: data.quantity
  }
  let organ = await get(OrganModel, org._id)
  return await edit(OrganModel, organ._id, org)
}

export async function deleteOrgan(id: ObjectId): Promise<any> {
  return await remove(OrganModel, id)
}
