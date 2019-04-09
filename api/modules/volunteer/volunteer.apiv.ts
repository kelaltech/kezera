import { IAccountPublicResponse } from '../account/account.apiv'

export type IVolunteerResponse = {
  _id:string
  account: IAccountPublicResponse
  birthdate: Date
  country:string
  gender:string
  location:string
  username:string
}