import { Schema } from 'mongoose'

export type IOrganizationMaterialRequest = {
  type: Number
  orgainzationId: Schema.Types.ObjectId
}

export type IOrganizationMaterialResponse = {
  type: Number
  orgainzationId: Schema.Types.ObjectId
}

export type IVolunteerMaterialRequest = {
  type: Number
  orgainzationId: Schema.Types.ObjectId
}

export type IVolunteerMaterialResponse = {
  type: Number
  orgainzationId: Schema.Types.ObjectId
}
