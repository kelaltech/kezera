import { Document, Schema } from 'mongoose'

import { IFundraisingRequest, IFundraisingResponse } from './fundraising.apiv'
import {
  FundraisingModel,
  IFundraising
} from '../../models/fundraising/fundraising.model'

type ObjectId = Schema.Types.ObjectId | string

export async function fundraisingRequestToLeanDocument(
  request: IFundraisingRequest,
  request_id: ObjectId, // request
  _id?: ObjectId,
  _at: Date | number = Date.now()
): Promise<IFundraising & { _id?: ObjectId }> {
  const { target } = request

  const leanDocument: IFundraising & { _id?: ObjectId } = {
    _id,
    _at,

    request: request_id,

    target
  }

  return leanDocument
}

export async function fundraisingRequestToDocument(
  request: IFundraisingRequest,
  request_id: ObjectId, // request
  _id?: ObjectId,
  _at: Date | number = Date.now()
): Promise<Document & IFundraising> {
  return new FundraisingModel(
    await fundraisingRequestToLeanDocument(request, request_id, _id, _at)
  )
}

export async function fundraisingDocumentToResponse(
  document: Document & IFundraising
): Promise<IFundraisingResponse> {
  const { _id, _at, target } = document

  const response: IFundraisingResponse = {
    _id: _id,
    _at: new Date(_at!).getTime(),

    target
  }

  return response
}
