import { Document, Schema } from 'mongoose'

import { IOrganizationRequest, IOrganizationResponse } from './organization.apiv'
import {
  IOrganization,
  OrganizationModel
} from '../../models/organization/organization.model'
import {
  accountDocumentToPublicResponse,
  accountRequestToDocument
} from '../account/account.filter'
import { AccountModel, IAccount } from '../../models/account/account.model'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { OrganizationApplicationModel } from '../../models/organization-application/organization-application.model'
import Axios from 'axios'

type ObjectId = Schema.Types.ObjectId | string

export async function organizationRequestToLeanDocument(
  request: IOrganizationRequest,
  verifier: ObjectId,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<
  IOrganization & {
    _id?: ObjectId
    account: Document & IAccount
  }
> {
  const leanDocument = {
    _id,
    _last,

    // handle account manually
    account: (await accountRequestToDocument(
      request.account,
      'ACTIVE',
      'ORGANIZATION',
      undefined as any,
      undefined as any
    )) as any,

    type: request.type,

    motto: request.motto,
    bio: request.bio,
    locations: await Promise.all(
      request.locations.map(async location => {
        const log = process.env.NODE_ENV !== 'production'
        const accessToken = process.env.MAPBOX_ACCESS_TOKEN

        if (accessToken && location.geo && location.geo.coordinates) {
          const [lat, lng] = location.geo.coordinates
          const accuracy = 'place' // see: https://docs.mapbox.com/api/search/#data-types

          try {
            if (log) console.info(`Trying to geocoding ${lat},${lng} using Mapbox...`)

            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?types=${accuracy}&access_token=${accessToken}`
            const { data } = await Axios.get(url)

            if (data.features && data.features.length) {
              location.address = data.features[0].place_name
              if (log)
                console.info(
                  `Reverse geocoding ${lat},${lng} complete: ${location.address}`
                )
            } else {
              console.error(
                `Reverse geocoding ${lat},${lng} failed: unknown response format from Mapbox`
              )
            }
          } catch (e) {
            console.error(`Reverse geocoding ${lat},${lng} failed: ${e.message}`)
          }
        }
        return location
      })
    ),
    website: request.website,

    licensedNames: request.licensedNames,
    registrations: request.registrations,
    verifier
  }

  if (!leanDocument.motto) delete leanDocument.motto
  if (!leanDocument.website) delete leanDocument.website

  return leanDocument
}

export async function organizationRequestToDocument(
  request: IOrganizationRequest,
  verifier: ObjectId,
  _id?: ObjectId,
  _last: Date | number = Date.now()
): Promise<Document & IOrganization> {
  return new OrganizationModel(
    await organizationRequestToLeanDocument(request, verifier, _id, _last)
  )
}

export async function organizationDocumentToResponse(
  document: Document & IOrganization,
  account?: Document & IAccount,
  isApplication = false
): Promise<IOrganizationResponse> {
  const populatedAccount: Document & IAccount =
    account ||
    ((await document.populate('account').execPopulate()).account as any).toJSON()

  const hasLogo = await new Grid(
    serverApp,
    !isApplication ? AccountModel : OrganizationApplicationModel,
    !isApplication ? populatedAccount._id : document._id,
    'logo',
    false
  ).has()

  return {
    _at: new Date(document._at!).getTime(),
    _id: document._id,

    account: await accountDocumentToPublicResponse(populatedAccount),

    type: document.type,

    logoUri: !hasLogo
      ? undefined
      : !isApplication
      ? `/api/account/get-photo/${populatedAccount._id}`
      : `/api/verifier/get-organization-application-logo/${document._id}`,
    motto: document.motto,
    bio: document.bio,
    locations: document.locations,
    website: document.website,

    subscribersCount: (document.subscribers || []).length,

    licensedNames: document.licensedNames || [],
    registrations: document.registrations || []
  }
}
