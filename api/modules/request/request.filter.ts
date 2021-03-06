import { Document, Schema } from 'mongoose'

import { IRequestRequest, IRequestResponse } from './request.apiv'
import { RequestModel, IRequest } from '../../models/request/request.model'
import { organizationDocumentToResponse } from '../organization/organization.filter'
import { get } from '../../lib/crud'
import { OrganizationModel } from '../../models/organization/organization.model'
import { getTaskFromRequest } from '../task/task.controller'
import { getFundraisingFromRequest } from '../fundraising/fundraising.controller'
import { getOrganFromRequest } from '../organ/organ.controller'
import { GetMaterialFromRequest } from '../material/material.controller'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'

type ObjectId = Schema.Types.ObjectId | string

export async function requestRequestToLeanDocument(
  request: IRequestRequest,
  _by: ObjectId,
  donations: {
    _at?: Date | number
    volunteer: ObjectId
    approved?: boolean
    data?: string
  }[] = [],
  _id?: ObjectId,
  _at: Date | number = Date.now()
): Promise<IRequest & { _id?: ObjectId }> {
  const { name, description, status, type, expires } = request

  const leanDocument: IRequest & { _id?: ObjectId } = {
    _id,
    _at,

    _by,

    name,
    description,

    status,
    type,

    expires,

    donations
  }

  return leanDocument
}

export async function requestRequestToDocument(
  request: IRequestRequest,
  _by: ObjectId,
  donations: {
    _at?: Date | number
    volunteer: ObjectId
    approved?: boolean
    data?: string
  }[] = [],
  _id?: ObjectId,
  _at: Date | number = Date.now()
): Promise<Document & IRequest> {
  return new RequestModel(
    await requestRequestToLeanDocument(request, _by, donations, _id, _at)
  )
}

export async function requestDocumentToResponse(
  document: Document & IRequest,
  coverUri?: string | null,
  fileUris?: string[] | null
): Promise<IRequestResponse> {
  const { _id, _at, _by, name, description, status, type, expires, donations } = document

  const response: IRequestResponse = {
    _id,
    _at: new Date(_at!).getTime(),

    _by: undefined as any, // to be defined later

    name,
    description,

    status,
    type,

    expires,

    donations: (donations as any) as {
      _at: Date | number
      volunteer: string
      approved?: boolean
      data?: string
    }[]
  } as any // to disable the .fundraising, .material, .organ & .task

  response._by = await organizationDocumentToResponse(
    await get(OrganizationModel, null, { conditions: { account: _by } })
  )

  switch (response.type) {
    case 'Fundraising':
      response.fundraising = await getFundraisingFromRequest(_id)
      break
    case 'Material':
      response.material = (await GetMaterialFromRequest(_id)) as any // todo: filters?
      break
    case 'Organ':
      response.organ = await getOrganFromRequest(_id)
      break
    case 'Task':
      response.task = await getTaskFromRequest(_id)
      break
  }

  if (coverUri !== null) {
    if (coverUri !== undefined) {
      response.coverUri = coverUri
    } else if (response._id) {
      const has = await new Grid(
        serverApp,
        RequestModel,
        response._id,
        undefined,
        false
      ).has()

      if (has) response.coverUri = `/api/request/get-cover/${response._id}`
    }
  }

  if (fileUris !== null) {
    if (fileUris !== undefined) {
      response.fileUris = fileUris
    } else if (response._id) {
      const grid = new Grid(serverApp, RequestModel, response._id, 'file', false)

      response.fileUris = (await grid.listFilenames()).map(
        filename => `/api/request/get-file/${response._id}/${filename}`
      )
    }
  }

  return response
}
