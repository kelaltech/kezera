import { ClientSession } from 'mongoose'
import * as sharp from 'sharp'

import { KoaController } from '../../lib/koa-controller'
import {
  IOrganizationRequest,
  IOrganizationResponse,
  IOrganizationStats
} from './organization.apiv'
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
import { RequestModel } from '../../models/request/request.model'
import { EventModel, IEvent } from '../../models/event/event.model'
import { INews, NewsModel } from '../../models/news/news.model'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { populateRequest } from '../request/request.controller'
import { IRequestResponse } from '../request/request.apiv'

export class OrganizationController extends KoaController {
  /* GENERAL: */

  async apply(
    session?: ClientSession,
    data: IOrganizationRequest = JSON.parse(
      super.getRequestBody<{ data: string }>().data
    ),
    ctx = super.getContext()
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

    const logo = ctx && ctx.request.files && ctx.request.files['photo']
    if (logo) {
      const stream = sharp(logo.path)
        .resize(1080, 1080, { fit: 'cover' })
        .jpeg({ quality: 100 })

      const grid = new Grid(
        serverApp,
        OrganizationApplicationModel,
        application._id,
        'logo'
      )
      await new Promise<void>(async (resolve, reject) => {
        stream.on('error', reject)

        await grid.set(stream, 'image/jpeg')
        resolve()
      })
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
        conditions.subscribers = { $ne: account._id }
      }
    }

    const organizations = await list(OrganizationModel, {
      session,
      conditions,
      since,
      count,
      postQuery: (query, s) => {
        if (
          !account ||
          !account.lastLocation.coordinates ||
          !account.lastLocation.coordinates.length
        )
          return query

        return query
          .find({
            'locations.geo': {
              $nearSphere: {
                $geometry: {
                  type: 'Point',
                  coordinates: account.lastLocation.coordinates
                }
              }
            }
          })
          .session(s)
      }
    })
    return await Promise.all(
      organizations.map(organization => organizationDocumentToResponse(organization))
    )
  }

  async stats(
    session?: ClientSession,
    organization_id = super.getParam('organization_id')
  ): Promise<IOrganizationStats> {
    const organization = await get(OrganizationModel, organization_id, { session })
    const account_id = organization.account

    const now = Date.now()

    return {
      requests: {
        total: await RequestModel.find({ _by: account_id }).count(),
        active: await RequestModel.find({ _by: account_id, status: true }).count(),

        tasks: {
          total: await RequestModel.find({ _by: account_id, type: 'Task' }).count(),
          active: await RequestModel.find({
            _by: account_id,
            type: 'Task',
            status: true
          }).count()
        },

        materialDonation: {
          total: await RequestModel.find({ _by: account_id, type: 'Material' }).count(),
          active: await RequestModel.find({
            _by: account_id,
            type: 'Material',
            status: true
          }).count()
        },

        fundraising: {
          total: await RequestModel.find({
            _by: account_id,
            type: 'Fundraising'
          }).count(),
          active: await RequestModel.find({
            _by: account_id,
            type: 'Fundraising',
            status: true
          }).count()
        },

        organDonation: {
          total: await RequestModel.find({ _by: account_id, type: 'Organ' }).count(),
          active: await RequestModel.find({
            _by: account_id,
            type: 'Organ',
            status: true
          }).count()
        }
      },

      events: {
        total: await EventModel.find({
          organizationId: account_id /* todo: Check if this is correct after Anteneh pushes */
        }).count(),
        ongoing: await EventModel.find({
          organizationId: account_id /* todo: Check if this is correct after Anteneh pushes */,
          startDate: { $gte: now },
          endDate: { $lte: now }
        }).count(),
        upcoming: await EventModel.find({
          organizationId: account_id /* todo: Check if this is correct after Anteneh pushes */,
          startDate: { $gt: now },
          endDate: { $gt: now }
        }).count()
      },

      news: {
        total: await NewsModel.find({ _by: organization._id }).count()
      }
    }
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

  async searchRequests(
    session?: ClientSession,
    organization_id = super.getParam('organization_id'),
    term = super.getQuery('term'),
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10
  ): Promise<IRequestResponse[]> {
    // todo: remove the next line when Event.organizationId gets fixed
    const organization = await get(OrganizationModel, organization_id)
    return Promise.all(
      (await search(RequestModel, term, {
        session,
        since,
        count,
        conditions: { _by: organization.account }
      })).map(request => populateRequest(request))
    )
  }

  async searchEvents(
    session?: ClientSession,
    organization_id = super.getParam('organization_id'),
    term = super.getQuery('term'),
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10
  ): Promise<IEvent[]> {
    // todo: remove the next line when Event.organizationId gets fixed
    const organization = await get(OrganizationModel, organization_id)
    // todo: filter?
    return await search(EventModel, term, {
      session,
      since,
      count,
      conditions: { organizationId: organization.account }
    })
  }

  async searchNews(
    session?: ClientSession,
    organization_id = super.getParam('organization_id'),
    term = super.getQuery('term'),
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 14
  ): Promise<INews[]> {
    // todo: filter?
    return await search(NewsModel, term, {
      session,
      since,
      count,
      conditions: { _by: organization_id }
    })
  }
}
