import { ClientSession } from 'mongoose'
import { createReadStream } from 'fs'

import { KoaController } from '../../lib/koa-controller'
import { IOrganizationRequest, IOrganizationResponse } from './organization.apiv'
import { add } from '../../lib/crud'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import {
  organizationDocumentToResponse,
  organizationRequestToDocument
} from './organization.filter'
import { OrganizationApplicationModel } from '../../models/organization-application/organization-application.model'
import { email } from '../../lib/email'
import { KoaError } from '../../lib/koa-error'

export class OrganizationController extends KoaController {
  async apply(
    session?: ClientSession,
    data: IOrganizationRequest = JSON.parse(
      super.getRequestBody<{ data: string }>().data
    ),
    logoPath = super.getContext() &&
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
    const document = await add(
      OrganizationApplicationModel,
      await organizationRequestToDocument(data),
      {
        session,
        preSave: async doc => {
          if (!data.account.password)
            throw new KoaError(
              'Password is required to create a new account.',
              400,
              'NO_PASSWORD'
            )

          await doc.setAccountPassword(data.account.password, session)
          return doc
        }
      }
    )

    await email({
      subject: `Organization Application for "${data.account.displayName}"`,
      to: data.account.email,
      text: `Hello,\n\nWe have received your application, and is currently under review. We will email you again after we finish reviewing your application.\n\nSincerely,\nThe SPVA Team`
    })

    if (session && session.inTransaction()) await session.commitTransaction() // todo

    if (logoPath) {
      const grid = new Grid(serverApp, OrganizationApplicationModel, document._id, 'logo')
      await grid.set(logoPath, logoType)
    }

    return organizationDocumentToResponse(document)
  }
}
