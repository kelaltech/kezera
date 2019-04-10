import { ClientSession } from 'mongoose'

import { KoaController } from '../../lib/koa-controller'
import { add, get, remove } from '../../lib/crud'
import { OrganizationApplicationModel } from '../../models/organization-application/organization-application.model'
import { AccountModel } from '../../models/account/account.model'
import { OrganizationModel } from '../../models/organization/organization.model'
import { email } from '../../lib/email'
import { Grid } from '../../lib/grid'
import { serverApp } from '../../index'
import { IOrganizationResponse } from '../organization/organization.apiv'
import { organizationDocumentToResponse } from '../organization/organization.filter'

export class VerifierController extends KoaController {
  async approveOrganizationApplication(
    session: ClientSession,
    _id = super.getParam('_id')
  ): Promise<IOrganizationResponse> {
    const application = await get(OrganizationApplicationModel, _id, { session })

    // save account
    const accountData = JSON.parse(JSON.stringify(application.account))
    delete accountData._id
    const account = await add(AccountModel, accountData, { session })

    // save organization
    const applicationData = JSON.parse(JSON.stringify(application))
    applicationData.account = account._id
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
      await applicationGrid.remove()
    }

    // return organization response
    return await organizationDocumentToResponse(organization)
  }
}
