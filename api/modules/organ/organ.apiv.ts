import { IOrganType, ObjectId } from '../../models/organ/organ.model'
import { IRequestResponse } from '../request/request.apiv'

export type IOrganRequest = {
  type: IOrganType
  request: ObjectId
}

export type IOrganResponse = {
  type: IOrganType
  request: IRequestResponse
  pledges: ObjectId[]
}
