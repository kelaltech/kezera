import { IMaterial, MaterialModel } from '../../models/material/material.model'
import { add, edit, remove, get } from '../../lib/crud'
import { Schema } from 'mongoose'
import { RequestModel } from '../../models/request/request.model'
import { KoaError } from '../../lib/koa-error'

export async function AddMaterial(body: any, id: Schema.Types.ObjectId): Promise<void> {
  body.organizationId = id
  await add(MaterialModel, body)
}

export async function GetMaterial(id: Schema.Types.ObjectId): Promise<IMaterial> {
  return await get(MaterialModel, id)
}
export async function DeleteMaterial(
  id: Schema.Types.ObjectId,
  orgId: Schema.Types.ObjectId
): Promise<void> {
  let donation = RequestModel.find({ organizationId: orgId })
  if (donation) await remove(MaterialModel, id)
  else throw new KoaError('Not Authorized for this action', 401)
}

export async function UpdateMaterial(
  id: Schema.Types.ObjectId,
  body: any
): Promise<void> {
  let material = {
    status: body.status,
    materialType: body.materialType,
    organizationId: body.organizationId
  }
  await edit(MaterialModel, id, material)
}

export async function ListMaterials(orgId: Schema.Types.ObjectId): Promise<any> {
  let donations = await RequestModel.find({ type: 'MATERIAL' })
  let material: any = []
  for (let i = 0; i < donations.length; i++) {
    if (donations[i]._by.toString() == orgId.toString()) {
      // @ts-ignore
      let mat: IMaterial = await MaterialModel.find({ donationId: donations[i]._id })
      donations[i]['status'] = await mat.status
      donations[i]['materialType'] = await mat.materialType
      console.log(donations[i])
      material.push(donations[i])
    }
  }
  return material
}
