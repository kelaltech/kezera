import { ClientSession } from 'mongoose'
import { createReadStream } from 'fs'

import { KoaController } from '../../lib/koa-controller'
import { IOrganizationRequest, IOrganizationResponse } from './organization.apiv'
import { add, get, list } from '../../lib/crud'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import {
  organizationDocumentToResponse,
  organizationRequestToLeanDocument
} from './organization.filter'
import { OrganizationApplicationModel } from '../../models/organization-application/organization-application.model'
import { email } from '../../lib/email'
import { KoaError } from '../../lib/koa-error'
import { OrganizationModel } from '../../models/organization/organization.model'
import { IRequest, RequestModel } from '../../models/request/request.model'
import { EventModel, IEvent } from '../../models/event/event.model'
import { INews, NewsModel } from '../../models/news/news.model'

export class OrganizationController extends KoaController {
  async apply(
    session?: ClientSession,
    data: IOrganizationRequest = JSON.parse(
      super.getRequestBody<{ data: string }>().data
    ),
    logoStream = super.getContext() &&
    super.getContext()!.request &&
    super.getContext()!.request.files &&
    super.getContext()!.request.files!.logo &&
    super.getContext()!.request.files!.logo.path
      ? createReadStream(super.getContext()!.request.files!.logo!.path)
      : undefined,
    logoType = super.getContext() &&
    super.getContext()!.request &&
    super.getContext()!.request.files &&
    super.getContext()!.request.files!.logo &&
    super.getContext()!.request.files!.logo.type
      ? super.getContext()!.request.files!.logo!.type
      : undefined
  ): Promise<IOrganizationResponse> {
    const application = await add(
      OrganizationApplicationModel,
      new OrganizationApplicationModel(await organizationRequestToLeanDocument(data)),
      {
        session,
        preSave: async (doc, session) => {
          if (!data.account.password)
            throw new KoaError(
              'Password is required to create a new account.',
              400,
              'NO_PASSWORD'
            )

          await doc.setAccountPassword(data.account.password, session || undefined)
          return doc
        }
      }
    )

    await email({
      subject: `Organization Application for "${data.account.displayName}"`,
      to: data.account.email,
      text: `Hello,\n\nWe have received your application, and is currently under review. We will email you again after we finish reviewing your application.\n\nSincerely,\nThe SPVA Team`
    })

    if (session) await session.commitTransaction()

    if (logoStream) {
      const grid = new Grid(
        serverApp,
        OrganizationApplicationModel,
        application._id,
        'logo'
      )
      await grid.set(logoStream, logoType)
    }

    return await organizationDocumentToResponse(application, application.account)
  }

  async me(
    session?: ClientSession,
    account_id = super.getUser()!._id
  ): Promise<IOrganizationResponse> {
    const document = await get(OrganizationModel, null, {
      conditions: { account: account_id },
      session
    })
    return await organizationDocumentToResponse(document)
  }

  async get(
    session?: ClientSession,
    _id = super.getParam('_id')
  ): Promise<IOrganizationResponse> {
    const document = await get(OrganizationModel, _id, { session })
    return await organizationDocumentToResponse(document)
  }

  async requests(
    session?: ClientSession,
    organization_id = super.getParam('organization_id'),
    since = super.getQuery('since') ? Number(super.getQuery('since')) : undefined,
    count = super.getQuery('count') ? Number(super.getQuery('count')) : 42
  ): Promise<IRequest[]> {
    // todo: filter?
    // todo: attach type-specific fields using a refactored method from Request Module
    return await list(RequestModel, {
      session,
      since,
      count,
      conditions: { _by: organization_id }
    })
  }

  async events(
    session?: ClientSession,
    organization_id = super.getParam('organization_id'),
    since = super.getQuery('since') ? Number(super.getQuery('since')) : undefined,
    count = super.getQuery('count') ? Number(super.getQuery('count')) : 14
  ): Promise<IEvent[]> {
    // todo: filter?
    return await list(EventModel, {
      session,
      since,
      count,
      conditions: { organizationId: organization_id }
    })
  }

  async news(
    session?: ClientSession,
    organization_id = super.getParam('organization_id'),
    since = super.getQuery('since') ? Number(super.getQuery('since')) : undefined,
    count = super.getQuery('count') ? Number(super.getQuery('count')) : 14
  ): Promise<INews[]> {
    // todo: filter?
    return await list(NewsModel, {
      session,
      since,
      count,
      conditions: { _by: organization_id }
    })
  }
}
