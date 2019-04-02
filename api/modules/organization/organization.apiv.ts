import { IAccountRequest, IAccountResponse } from '../account/account.apiv'
import { IOrganizationType } from '../../models/organization/organization.model'

export type IOrganizationRequest = {
  account: IAccountRequest

  type: IOrganizationType

  motto?: string
  bio: string
  locations: {
    latitude?: number
    longitude?: number
    address: string
  }[]
  website?: string

  licensedNames: string[]
  registrations: {
    issuer: string
    type: string
    id: string
  }[]
}

export type IOrganizationResponse = {
  _id: string

  account: IAccountResponse

  type: IOrganizationType

  logoUri?: string
  motto?: string
  bio: string
  locations: {
    latitude?: number
    longitude?: number
    address: string
  }[]
  website?: string

  subscribers: string[] // account

  licensedNames: string[]
  registrations: {
    issuer: string
    type: string
    id: string
  }[]
}
