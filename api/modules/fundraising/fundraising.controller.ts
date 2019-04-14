import { add, edit, get, list } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { FundModel } from '../../models/fundraising/fundraising.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'

type ObjectId = Schema.Types.ObjectId | string

export async function AddFund(body: any, id: Schema.Types.ObjectId): Promise<void> {
  await add(FundModel, { ...body, requestId: id })
}

export async function ListFunds(): Promise<Document[]> {
  return await list(FundModel)
}

export async function getFund(requestId: ObjectId): Promise<any> {
  const fundraising = await FundModel.findOne({ requestId })
  return fundraising
}

export async function editFund(
  id: Schema.Types.ObjectId,
  body: any,
  pic: Stream
): Promise<any> {
  await get(FundModel, id)
  await edit(FundModel, id, body)
  await new Grid(serverApp, FundModel, id).remove()
  await new Grid(serverApp, FundModel, id).set(pic)
}
