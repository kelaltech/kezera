import { hash } from 'bcrypt'
import { ClientSession } from 'mongoose'

import { organizationApplicationModelFactory } from './organization-application.model'
import { KoaError } from '../../lib/koa-error'

export const organizationApplicationMethods = {
  async setAccountPassword(password: string, session?: ClientSession): Promise<void> {
    if (!password) throw new KoaError('"password" parameter not found', 400, 'NO_PASS')

    if (password.length > 72)
      throw new KoaError(
        'Password cannot be longer than 72 characters.',
        400,
        'PASS_TOO_LONG'
      )

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
      throw new KoaError(
        'Password needs to be at least 8 characters long and contain at least one of capital letters, small letters and numbers each.',
        400,
        'PASS_VALIDATION_FAILED'
      )

    const doc = organizationApplicationModelFactory.documentify(this)
    if (!doc) throw new KoaError(`No document.`, 404, 'DOCUMENT_NOT_FOUND')

    doc.account.password = await hash(password, 14)
    doc.account.passwordSetOn = Date.now()

    await doc.save({ session, validateBeforeSave: true })
  }
}
