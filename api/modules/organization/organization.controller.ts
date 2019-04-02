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
      { session }
    )

    if (session && session.inTransaction()) await session.commitTransaction()

    if (logoPath) {
      const grid = new Grid(serverApp, OrganizationApplicationModel, document._id)
      await grid.set(logoPath, logoType)
    }

    return organizationDocumentToResponse(document)
  }
}
