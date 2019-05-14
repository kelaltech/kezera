import { IAccountPublicResponse, IAccountRequest } from '../account/account.apiv'
import { IOrganizationType } from '../../models/organization/organization.model'

export type IOrganizationRequest = {
  account: IAccountRequest

  type: IOrganizationType

  motto?: string
  bio: string
  locations: {
    geo: {
      type: 'Point'
      coordinates: [number, number]
    }
    address?: string
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
  _at: number
  _id: string

  account: IAccountPublicResponse

  type: IOrganizationType

  logoUri?: string
  motto?: string
  bio: string
  locations: {
    geo: {
      type: 'Point'
      coordinates: [number, number]
    }
    address?: string
  }[]
  website?: string

  subscribersCount: number

  licensedNames: string[]
  registrations: {
    issuer: string
    type: string
    id: string
  }[]
}
