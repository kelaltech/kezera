import { ClientSession } from 'mongoose'
import { Stream } from 'stream'
import * as sharp from 'sharp'
import * as fs from 'fs'

import { KoaController } from '../../lib/koa-controller'
import { ICertificateRequest, ICertificateResponse } from './certificate.apiv'
import { add, edit, get, list } from '../../lib/crud'
import {
  CertificateModel,
  ICertificatePrivacy
} from '../../models/certificate/certificate.model'
import { IVolunteer, VolunteerModel } from '../../models/volunteer/volunteer.model'
import {
  certificateDocumentToResponse,
  certificateRequestToDocument
} from './certificate.filter'
import { IAccount } from '../../models/account/account.model'
import {
  IOrganization,
  OrganizationModel
} from '../../models/organization/organization.model'
import { KoaError } from '../../lib/koa-error'

export class CertificateController extends KoaController {
  /* ISSUES */

  async issue(
    session?: ClientSession,
    data = super.getRequestBody<ICertificateRequest>(),
    account_id = super.getUser()!._id
  ): Promise<ICertificateResponse[]> {
    const certificateResponses: ICertificateResponse[] = []

    for (const issuedTo of data.issueTo) {
      const organization = await get(OrganizationModel, null, {
        session,
        conditions: { account: account_id }
      })
      const volunteer = await get(VolunteerModel, issuedTo, { session })

      const certificate = await add(
        CertificateModel,
        await certificateRequestToDocument(
          data,
          organization._id,
          issuedTo,
          volunteer.privacy.certificate ? 'PUBLIC' : 'PRIVATE'
        ),
        { session }
      )

      volunteer.portfolio.certificate.push(certificate._id)
      await edit(VolunteerModel, volunteer._id, volunteer, { session })

      certificateResponses.push(await certificateDocumentToResponse(certificate))
    }

    return certificateResponses
  }

  /* GENERAL */

  async list(
    session?: ClientSession,
    volunteer_id = super.getParam('volunteer_id'),
    account = super.getUser()
  ): Promise<ICertificateResponse[]> {
    const volunteer = await get(VolunteerModel, volunteer_id, { session })

    const conditions: any = { issuedTo: volunteer._id }
    if (!(account && account._id.toString() === volunteer.account.toString()))
      conditions.privacy = 'PUBLIC'

    const certificates = await list(CertificateModel, { session, conditions })
    return await Promise.all(
      certificates.map(certificate => certificateDocumentToResponse(certificate))
    )
  }

  async print(
    session?: ClientSession,
    _id = super.getParam('_id'),
    ctx = this.getContext()
  ): Promise<Stream> {
    const certificate = await get(CertificateModel, _id, {
      session,
      postQuery: query =>
        query
          .populate({ path: 'issuedBy', populate: { path: 'account' } })
          .populate({ path: 'issuedTo', populate: { path: 'account' } })
    })

    let description = ''
    const descriptionWords = certificate.description.split(' ')
    for (let i = 0; i < descriptionWords.length; i++) {
      description += descriptionWords[i] + ' '
      if ((i + 1) % 13 == 0) description += '\n'
    }

    return new Promise<Stream>(async (resolve, reject) => {
      fs.readFile(
        'api/modules/certificate/templates/default/default.svg',
        { encoding: 'utf8', flag: 'r' },
        async (err, data) => {
          if (err) return reject(err)

          const svg = data
            // data entry...
            .replace(/{PURPOSE}/g, certificate.purpose.replace(/_/g, ' ').toUpperCase())
            .replace(/{DATE}/g, new Date(certificate._at!).toDateString().substr(3))
            .replace(
              /{DISPLAY_NAME}/,
              ((((certificate.issuedTo as any) as IVolunteer).account as any) as IAccount)
                .displayName
            )
            .replace(/{DESCRIPTION}/, description)
            .replace(
              /{ORGANIZATION_NAME}/,
              ((((certificate.issuedBy as any) as IOrganization)
                .account as any) as IAccount).displayName
            )

          const jpegStream = await sharp(Buffer.from(svg, 'utf8')).jpeg({
            quality: 100
          })

          if (ctx) ctx.type = 'jpeg'
          return resolve(jpegStream)
        }
      )
    })
  }

  /* PRIVACY */

  async setPrivacy(
    privacy: ICertificatePrivacy,
    session?: ClientSession,
    _id = super.getParam('_id'),
    account_id = super.getUser()!._id
  ): Promise<ICertificateResponse> {
    let certificate = await get(CertificateModel, _id, { session })

    await edit(
      CertificateModel,
      certificate._id,
      { ...certificate, privacy },
      {
        session,
        preUpdate: async doc => {
          if (certificate.issuedTo.toString() !== account_id)
            throw new KoaError(
              `Cannot update somebody else's certificate privacy options.`,
              403,
              'NOT_AUTHORIZED'
            )
          return doc
        }
      }
    )

    certificate = await get(CertificateModel, _id, { session })
    return await certificateDocumentToResponse(certificate)
  }
}
