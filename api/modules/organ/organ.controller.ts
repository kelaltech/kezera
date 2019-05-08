import { IOrganRequest, IOrganResponse } from './organ.apiv'
import { add, edit, get, list, remove } from '../../lib/crud'
import { IOrgan, OrganModel } from '../../models/organ/organ.model'
import { Document, Schema } from 'mongoose'
import { IAccount } from '../../models/account/account.model'

type ObjectId = Schema.Types.ObjectId | string
export async function AddOrgan(data: IOrganRequest): Promise<any> {
  return await add(OrganModel, data)
}
export async function listOrganRequest(count = 5, since = Date.now()): Promise<any> {
  return await list(OrganModel, {
    count: count,
    since: since,
    postQuery: p => p.populate('request')
  })
}

export async function getOrgan(id: ObjectId): Promise<any> {
  return await get(OrganModel, id)
}

export async function editOrgan(id: ObjectId, data: IOrganRequest): Promise<any> {
  return await edit(OrganModel, id, data)
}

export async function deleteOrgan(id: ObjectId): Promise<any> {
  return await remove(OrganModel, id)
}


export async function newPledge(
  _organId: ObjectId,
  account: Document & IAccount
): Promise<IOrganResponse | any> {
  const doc:IOrgan = await get(OrganModel, _organId)

  if (doc.pledges.length == 0) {
    doc.pledges.push(account._id)
    await doc.save()
    return {
      doc
    }
  }

  for (let i = 0; i < doc.pledges.length; i++) {
    if (account._id.toString() === doc.pledges[i].toString()) {
      await doc.pledges.splice(i, 1)
    } else {
      doc.pledges.push(account._id)
    }
  }
  await doc.save()

  return { doc }
}

export async function getPledges(_organId: ObjectId):Promise<any> {
  const doc:IOrgan = await get(OrganModel,_organId, {
    postQuery: q=> q.populate('pledges')
  })
  return doc
}