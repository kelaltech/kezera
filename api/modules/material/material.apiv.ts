import { Schema } from 'mongoose'

export type IMaterialRequest = {
  type: Number
  orgainzationId: Schema.Types.ObjectId
}

export type IMaterialResponse = {
  type: Number
  orgainzationId: Schema.Types.ObjectId
}
