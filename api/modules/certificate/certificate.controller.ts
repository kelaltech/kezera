import { ClientSession } from 'mongoose'
import { Stream } from 'stream'

import { KoaController } from '../../lib/koa-controller'
import { ICertificateResponse } from './certificate.apiv'
import { get, list } from '../../lib/crud'
import { CertificateModel } from '../../models/certificate/certificate.model'
import { VolunteerModel } from '../../models/volunteer/volunteer.model'
import { certificateDocumentToResponse } from './certificate.filter'

export class CertificateController extends KoaController {
  /* ISSUES */

  async issue(session?: ClientSession): Promise<ICertificateResponse> {
    // todo
    throw Error(JSON.stringify(session))
  }

  /* GENERAL */

  async list(
    session?: ClientSession,
    volunteer_id = super.getParam('volunteer_id'),
    account = super.getUser()
  ): Promise<ICertificateResponse[]> {
    const volunteer = await get(VolunteerModel, volunteer_id, { session })

    const certificates = await list(CertificateModel, {
      session,
      conditions: {
        issuedTo: volunteer._id,
        public: !(account && account._id.toString() === volunteer.account.toString())
      }
    })
    return await Promise.all(
      certificates.map(certificate => certificateDocumentToResponse(certificate))
    )
  }

  async print(session?: ClientSession): Promise<Stream> {
    // todo
    throw Error(JSON.stringify(session))
  }

  async setPrivacy(session?: ClientSession): Promise<ICertificateResponse[]> {
    // todo
    throw Error(JSON.stringify(session))
  }
}
