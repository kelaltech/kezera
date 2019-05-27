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

export type IOrganizationStats = {
  requests: {
    total: number
    active: number

    tasks: {
      total: number
      active: number
    }
    materialDonation: {
      total: number
      active: number
    }
    fundraising: {
      total: number
      active: number
    }
    organDonation: {
      total: number
      active: number
    }
  }

  events: {
    total: number
    ongoing: number
    upcoming: number
  }

  news: {
    total: number
    today: number
  }
}

export type IOrganizationSubscriber = IAccountPublicResponse & {
  volunteerId: string
}
