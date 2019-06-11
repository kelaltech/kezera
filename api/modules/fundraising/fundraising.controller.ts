import { add, edit, get, list } from '../../lib/crud'
import { Document, Schema } from 'mongoose'
import { FundraisingModel } from '../../models/fundraising/fundraising.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'

type ObjectId = Schema.Types.ObjectId | string

export async function AddFund(body: any, id: Schema.Types.ObjectId): Promise<void> {
  await add(FundraisingModel, { ...body, request: id })
}

export async function ListFunds(): Promise<Document[]> {
  return await list(FundraisingModel)
}

export async function getFund(requestId: ObjectId): Promise<any> {
  const fundraising = await FundraisingModel.findOne({ requestId })
  return fundraising
}

export async function editFund(
  id: Schema.Types.ObjectId,
  body: any,
  pic: Stream
): Promise<any> {
  await get(FundraisingModel, id)
  await edit(FundraisingModel, id, body)
  await new Grid(serverApp, FundraisingModel, id).remove()
  await new Grid(serverApp, FundraisingModel, id).set(pic)
}
