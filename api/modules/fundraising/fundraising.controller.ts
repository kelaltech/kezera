import { add, edit, get, list } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { FundraisingModel } from '../../models/fundraising/fundraising.model'
import { IFundraisingResponse } from './fundraising.apiv'
import { fundraisingDocumentToResponse } from './fundraising.filter'

type ObjectId = Schema.Types.ObjectId | string

export async function AddFund(body: any, id: Schema.Types.ObjectId): Promise<void> {
  await add(FundraisingModel, { ...body, request: id })
}

export async function ListFunds(): Promise<Document[]> {
  return await list(FundraisingModel)
}

export async function getFundraisingFromRequest(
  request_id: ObjectId
): Promise<IFundraisingResponse> {
  return fundraisingDocumentToResponse(
    await get(FundraisingModel, null, { conditions: { request: request_id } })
  )
}

export async function editFund(
  body: any,
): Promise<any> {
  let funds= {
    _id: body._id,
    target: body.target,
  }
  let fundraising=await get(FundraisingModel,funds._id);
  console.log(fundraising._id)
  await edit(FundraisingModel, fundraising._id, funds)

}
