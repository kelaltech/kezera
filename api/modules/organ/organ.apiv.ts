import { IOrganType, ObjectId } from '../../models/organ/organ.model'

export type IOrganRequest = {
  organType: IOrganType
  requestId: ObjectId

  quantity: number
}

export type IOrganResponse = {
  organType: IOrganType
  requestId: ObjectId

  pledges: ObjectId[]

  quantity: number
}
