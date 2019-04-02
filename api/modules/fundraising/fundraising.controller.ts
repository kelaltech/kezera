import { add, list } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { FundModel } from '../../models/fundraising/fundraising.model'

export async function AddFund(body: any, id: Schema.Types.ObjectId): Promise<void> {
  body.organizationId = id
  await add(FundModel, body)
}

export async function ListFunds(): Promise<Document[]> {
  return await list(FundModel)
}
