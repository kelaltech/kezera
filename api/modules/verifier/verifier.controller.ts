import { ClientSession, Document } from 'mongoose'
import { Stream } from 'stream'
import * as sharp from 'sharp'

import { KoaController } from '../../lib/koa-controller'
import { add, get, remove, search } from '../../lib/crud'
import { OrganizationApplicationModel } from '../../models/organization-application/organization-application.model'
import { AccountModel, IAccount, IAccountRole } from '../../models/account/account.model'
import {
  IOrganization,
  OrganizationModel
} from '../../models/organization/organization.model'
import { email } from '../../lib/email'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { IOrganizationResponse } from '../organization/organization.apiv'
import { organizationDocumentToResponse } from '../organization/organization.filter'
import { KoaError } from '../../lib/koa-error'
import { IOrganizationApplicationOfficialDocumentResponse } from './verifier.apiv'

export class VerifierController extends KoaController {
  /* GENERAL: */

  async getOrganizationApplication(
    session?: ClientSession,
    _id = super.getParam('_id')
  ): Promise<IOrganizationResponse> {
    const application = await get(OrganizationApplicationModel, _id, { session })
    return await organizationDocumentToResponse(application, application.account, true)
  }

  async getOrganizationApplicationLogo(
    session?: ClientSession,
    _id = super.getParam('_id'),
    size = Number(super.getQuery('size')) || 200,
    quality = Number(super.getQuery('quality')) || 80,
    ctx = super.getContext()
  ): Promise<Stream> {
    const application = await get(OrganizationApplicationModel, _id, { session })
    const applicationGrid = new Grid(
      serverApp,
      OrganizationApplicationModel,
      application._id,
      'logo',
      false
    )

    if (ctx) ctx.type = await applicationGrid.getType()

    const resize = sharp()
      .resize(size, size, { fit: 'cover' })
      .jpeg({ quality, chromaSubsampling: '4:4:4' })

    return (await applicationGrid.get()).pipe(resize)
  }

  async searchOrganizationApplications(
    session?: ClientSession,
    term = super.getQuery('term'),
    since = Number(super.getQuery('since')) || Date.now(),
    count = Number(super.getQuery('count')) || 10
  ): Promise<IOrganizationResponse[]> {
    const applications = await search(OrganizationApplicationModel, term, {
      session,
      since,
      count
    })
    return await Promise.all(
      applications.map(application =>
        organizationDocumentToResponse(application, application.account, true)
      )
    )
  }

  /* ORGANIZATION APPLICATION OFFICIAL DOCUMENTS */

  async listOrganizationApplicationOfficialDocuments(
    application_id = super.getParam('application_id')
  ): Promise<IOrganizationApplicationOfficialDocumentResponse[]> {
    const applicationGrid = new Grid(
      serverApp,
      OrganizationApplicationModel,
      application_id,
      'officialDocument'
    )

    return (await applicationGrid.listFilenames()).map((filename, i) => ({
      name: `Upload #${i + 1}`,
      download: `/api/verifier/download-organization-application-official-document/${application_id}/${filename}`
    }))
  }

  async downloadOrganizationApplicationOfficialDocument(
    application_id = super.getParam('application_id'),
    filename = super.getParam('filename'),
    ctx = super.getContext()
  ): Promise<Stream> {
    const applicationGrid = new Grid(
      serverApp,
      OrganizationApplicationModel,
      application_id,
      'officialDocument'
    )

    if (ctx) {
      const type = await applicationGrid.getType(filename)
      ctx.type = type

      const extension = (type.split('/').pop() || '').split('+')[0]
      ctx.attachment(`${filename}${extension ? '.' + extension : ''}`)
    }
    return await applicationGrid.get(filename)
  }

  /* ORGANIZATION APPLICATION REVIEW: */

  async approveOrganizationApplication(
    session?: ClientSession,
    _id = super.getParam('_id'),
    verifier_account = super.getUser()!
  ): Promise<IOrganizationResponse> {
    const allowedRoles: IAccountRole[] = ['VERIFIER', 'ADMIN']
    if (!allowedRoles.includes(verifier_account.role))
      throw new KoaError(
        `Role "${verifier_account.role}" is not allowed to approve Organization application requests.`,
        500,
        'ACCOUNT_ROLE_NOT_ALLOWED'
      )

    const application = await get(OrganizationApplicationModel, _id, { session })

    // save account
    const accountData: Document & IAccount = JSON.parse(
      JSON.stringify(application.account)
    )
    delete accountData._id
    const account = await add(AccountModel, accountData, { session })

    // save organization
    const applicationData: Document & IOrganization = JSON.parse(
      JSON.stringify(application)
    )
    applicationData.account = account._id
    applicationData.verifier = verifier_account._id
    const organization = await add(OrganizationModel, applicationData, { session })

    // delete application
    await remove(OrganizationApplicationModel, application._id, { session })

    // send email
    await email({
      subject: 'Welcome to SPVA! (Application Accepted)',
      to: account.email,
      text: `Hello,\n\nWe have completed reviewing your organization application and have accepted you to the system. Welcome! You can start by logging into your account.\n\nSincerely,\nThe SPVA Team`
    })

    // commit changes
    if (session) await session.commitTransaction()

    // swap logo
    const applicationGrid = new Grid(
      serverApp,
      OrganizationApplicationModel,
      application._id,
      'logo',
      false
    )
    if (await applicationGrid.has()) {
      // save organization logo
      const organizationGrid = new Grid(serverApp, AccountModel, account._id, 'photo')
      await organizationGrid.set(
        await applicationGrid.get(),
        await applicationGrid.getType()
      )

      // delete application logo
      // await applicationGrid.remove() // remove this line. Also, todo: log in ActivityModule
    }

    // return organization response
    return await organizationDocumentToResponse(organization)
  }

  async rejectOrganizationApplication(
    session?: ClientSession,
    _id = super.getParam('_id'),
    verifier_account = super.getUser()!
  ): Promise<void> {
    const allowedRoles: IAccountRole[] = ['VERIFIER', 'ADMIN']
    if (!allowedRoles.includes(verifier_account.role))
      throw new KoaError(
        `Role "${verifier_account.role}" is not allowed to approve Organization application requests.`,
        500,
        'ACCOUNT_ROLE_NOT_ALLOWED'
      )

    const application = await get(OrganizationApplicationModel, _id, { session })

    // delete logo?
    const applicationGrid = new Grid(
      serverApp,
      OrganizationApplicationModel,
      application._id,
      'logo',
      false
    )
    await applicationGrid.remove()

    // delete application
    await remove(OrganizationApplicationModel, application._id, { session })

    // email rejection
    await email({
      subject: 'Regarding Your Application to SPVA',
      to: application.account.email,
      text: `Hello,\n\nWe regret to inform you that, after thoroughly reviewing your application, we have decided not to accept it onto our system. You can forward any questions you may have regarding this or any other matter to our team at any time. You will find our contact information on the official website.\n\nSincerely,\nThe SPVA Team`
    })
  }
}
