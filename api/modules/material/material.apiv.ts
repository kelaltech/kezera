import { Schema } from 'mongoose'

export type IMaterialRequest = {
  type: string
  quantity: number
  organizationId: Schema.Types.ObjectId
}

export type IMaterialResponse = {
  materialType: string
  quantity: number
  organizationId: Schema.Types.ObjectId
}
