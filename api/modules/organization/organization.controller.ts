import { ClientSession } from 'mongoose'
import { createReadStream } from 'fs'

import { KoaController } from '../../lib/koa-controller'
import { IOrganizationRequest, IOrganizationResponse } from './organization.apiv'
import { add, edit, get, list, search } from '../../lib/crud'
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
import { VolunteerModel } from '../../models/volunteer/volunteer.model'

export class OrganizationController extends KoaController {
  /* GENERAL: */

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
      new OrganizationApplicationModel(
        await organizationRequestToLeanDocument(data, undefined as any)
      ),
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

  async get(
    session?: ClientSession,
    _id = super.getParam('_id')
  ): Promise<IOrganizationResponse> {
    const organization = await get(OrganizationModel, _id, { session })
    return await organizationDocumentToResponse(organization)
  }

  async me(
    session?: ClientSession,
    account_id = super.getUser()!._id // organization account _id
  ): Promise<IOrganizationResponse> {
    const organization = await get(OrganizationModel, null, {
      conditions: { account: account_id },
      session
    })
    return await organizationDocumentToResponse(organization)
  }

  async list(
    session?: ClientSession,
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10
  ): Promise<IOrganizationResponse[]> {
    const organizations = await list(OrganizationModel, { session, since, count })
    return await Promise.all(
      organizations.map(organization => organizationDocumentToResponse(organization))
    )
  }

  async search(
    session?: ClientSession,
    term = super.getQuery('term'),
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10
  ): Promise<IOrganizationResponse[]> {
    const organizations = await search(OrganizationModel, term, { session, since, count })
    return await Promise.all(
      organizations.map(organization => organizationDocumentToResponse(organization))
    )
  }

  async discover(
    session?: ClientSession,
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10,
    account = super.getUser()
  ): Promise<IOrganizationResponse[]> {
    const conditions: any = {}
    if (account) {
      const volunteer = await VolunteerModel.findOne({ account: account._id })
      if (volunteer) {
        conditions.subscribers = { $not: volunteer._id }
      }
    }

    const organizations = await list(OrganizationModel, {
      session,
      conditions,
      since,
      count
    })
    return await Promise.all(
      organizations.map(organization => organizationDocumentToResponse(organization))
    )
  }

  async stats(): Promise<void> {
    // todo
  }

  async editMe(
    session?: ClientSession,
    account_id = super.getUser()!._id, // organization account _id
    data = super.getRequestBody<IOrganizationRequest>()
  ): Promise<IOrganizationResponse> {
    let organization = await get(OrganizationModel, null, {
      conditions: { account: account_id },
      session
    })

    const request = await organizationRequestToLeanDocument(
      data,
      organization.verifier,
      organization._id
    )
    // no updates for:
    request.account = organization.account as any
    request.licensedNames = organization.licensedNames
    request.registrations = organization.registrations

    await edit(OrganizationModel, organization._id, request, { session })

    organization = await get(OrganizationModel, organization._id, { session })
    return await organizationDocumentToResponse(organization)
  }

  /* SUBSCRIPTIONS: */

  async subscriptions(
    session?: ClientSession,
    account_id = super.getUser()!._id // volunteer account _id
  ): Promise<IOrganizationResponse[]> {
    const organizations = await list(OrganizationModel, {
      conditions: { subscribers: account_id },
      session
    })
    return await Promise.all(
      organizations.map(organization => organizationDocumentToResponse(organization))
    )
  }

  async subscribe(
    session?: ClientSession,
    _id = super.getParam('_id'),
    account_id = super.getUser()!._id // volunteer account _id
  ): Promise<void> {
    const organization = await get(OrganizationModel, _id, { session })

    if (!(organization.subscribers || []).includes(account_id)) {
      if (!organization.subscribers) organization.subscribers = []
      organization.subscribers.push(account_id)
      await edit(OrganizationModel, _id, organization, { session })
    }
  }

  async unsubscribe(
    session?: ClientSession,
    _id = super.getParam('_id'),
    account_id = super.getUser()!._id // volunteer account _id
  ): Promise<void> {
    const organization = await get(OrganizationModel, _id, { session })

    if (!organization.subscribers) organization.subscribers = []
    organization.subscribers = organization.subscribers.filter(
      subscriber => subscriber.toString() !== account_id.toString()
    )
    await edit(OrganizationModel, _id, organization, { session })
  }

  /* LINKS TO OTHER MODULES: */

  async requests(
    session?: ClientSession,
    organization_id = super.getParam('organization_id'),
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10
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
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10
  ): Promise<IEvent[]> {
    // todo: remove the next line when Event.organizationId gets fixed
    const organization = await get(OrganizationModel, organization_id)
    // todo: filter?
    return await list(EventModel, {
      session,
      since,
      count,
      conditions: { organizationId: organization.account }
    })
  }

  async news(
    session?: ClientSession,
    organization_id = super.getParam('organization_id'),
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 14
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
