import { IAccountPublicResponse, IAccountRequest } from '../account/account.apiv'

export type IVolunteerResponse = {
  _id: string
  account: IAccountPublicResponse
  birthdate: Date
  country: string
  gender: string
  location: string
  username: string
  privacy : {
    certificate: boolean,
    event: boolean,
    material:boolean,
    task:boolean,
    money:boolean
  }
}

export type IVolunteerRequest = {
  account: IAccountRequest
  birthdate?: Date
  country?: string
  gender?: string
  location?: string
  username?: string
  privacy ?: {
    certificate: boolean,
    event: boolean,
    material:boolean,
    task:boolean,
    money:boolean
  }
}
