import { add, list } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { FundModel } from '../../models/fundraising/fundraising.model'

type ObjectId = Schema.Types.ObjectId | string

export async function AddFund(body: any, id: Schema.Types.ObjectId): Promise<void> {
  body.requestId = id
  await add(FundModel, body)
}

export async function ListFunds(): Promise<Document[]> {
  return await list(FundModel)
}

export async function getFund(requestId: ObjectId): Promise<any> {
  const fundraising = await FundModel.find({ requestId })
  return fundraising
}
