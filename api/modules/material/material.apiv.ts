import { Schema } from 'mongoose'

export type IMaterialRequest = {
  type: Number
  quantity: Number
  orgainzationId: Schema.Types.ObjectId
}

export type IMaterialResponse = {
  type: Number
  quantity: Number
  orgainzationId: Schema.Types.ObjectId
}
