import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { fundPaths } from './fundraising.path'

type ObjectId = Schema.Types.ObjectId

export interface IFundraising extends Document {
  amount: number
  type: ObjectId
  startTime: Date | number
  endTime: Date | number
}

export const FundModelFactory = new ModelFactory<IFundraising>({
  name: 'fundraising',
  paths: fundPaths
})

export const FundModel = FundModelFactory.model
