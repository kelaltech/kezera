import { IMaterial, MaterialModel } from '../../models/material/material.model'
import { add, edit, remove, list, get } from '../../lib/crud'
import { Schema } from 'mongoose'
import { RequestModel } from '../../models/request/request.model'
import { KoaError } from '../../lib/koa-error'

export async function AddMaterial(body: any, id: Schema.Types.ObjectId): Promise<void> {
  await add(MaterialModel, { ...body, requestId: id })
}

export async function GetMaterialFromRequest(
  request_id: Schema.Types.ObjectId
): Promise<IMaterial | IMaterial[]> {
  return await list(MaterialModel, {
    preQuery: model => model.find({ requestId: request_id })
  })
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
  body: any
): Promise<void> {
  let material = {
    _id:body._id,
    status: body.status,
    quantity:body.quantity,
    materialType: body.materialType,
  }
  let mat=await get(MaterialModel,material._id);
  await edit(MaterialModel, mat._id, material)
}

export async function ListMaterials(orgId: Schema.Types.ObjectId): Promise<any> {
  let donations = await RequestModel.find({ type: 'MATERIAL' })
  let material: any = []
  for (let i = 0; i < donations.length; i++) {
    if (donations[i]._by.toString() == orgId.toString()) {
      // @ts-ignore
      let mat: IMaterial = await MaterialModel.find({ donationId: donations[i]._id })
      /*donations[i]['status'] = await mat.status
      donations[i]['materialType'] = await mat.materialType*/
      console.log(donations[i])
      material.push(donations[i])
    }
  }
  return material
}
