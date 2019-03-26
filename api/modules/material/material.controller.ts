import { MaterialModel, IMaterial } from '../../models/material/material.model'
import { add, remove, edit, get, list } from '../../lib/crud'
import { Schema, Document } from 'mongoose'
import { KoaError } from '../../lib/koa-error'

export async function AddMaterial(body: any, id: Schema.Types.ObjectId): Promise<void> {
  body.organizationId = id
  await add(MaterialModel, body)
}

export async function DeleteMaterial(
  id: Schema.Types.ObjectId,
  organizationId: Schema.Types.ObjectId
): Promise<void> {
  let material = await get(MaterialModel, id)
  if (material.organizationId.toString() == organizationId.toString())
    await remove(MaterialModel, id)
  else {
    throw new KoaError('Not Authorized for this action', 401)
  }
}
export async function UpdateMaterial(
  id: Schema.Types.ObjectId,
  body: any,
  organizationId: Schema.Types.ObjectId
): Promise<void> {
  let material = await get(MaterialModel, id)
  if (material.organizationId.toString() == organizationId.toString())
    await edit(MaterialModel, body, id)
  else {
    throw new KoaError('Not Authorized for this action', 401)
  }
}

export async function ListMaterials(): Promise<Document[] & IMaterial[]> {
  return await list(MaterialModel)
}
