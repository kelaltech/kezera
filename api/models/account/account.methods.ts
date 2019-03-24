import { compare, hash } from 'bcrypt'

import { accountModelFactory } from './account.model'
import { KoaError } from '../../lib/koa-error'

export const accountMethods = {
  async isPasswordCorrect(password: string): Promise<boolean> {
    if (!password) throw new KoaError('"password" parameter not found', 400, 'NO_PASS')

    const doc = accountModelFactory.documentify(this)
    if (!doc) throw new KoaError(`No document.`, 404, 'DOCUMENT_NOT_FOUND')

    if (!doc.password) throw new KoaError('Password not set.', 500, 'PASSWORD_NOT_SET')

    return compare(password, doc.password)
  },

  async setPassword(password: string): Promise<void> {
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

    const doc = accountModelFactory.documentify(this)
    if (!doc) throw new KoaError(`No document.`, 404, 'DOCUMENT_NOT_FOUND')

    doc.password = await hash(password, 14)
    doc.passwordSetOn = Date.now()

    await doc.save()
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    if (!currentPassword)
      throw new KoaError('"currentPassword" parameter not found', 400, 'NO_CURRENT_PASS')
    if (!newPassword)
      throw new KoaError('"newPassword" parameter not found', 400, 'NO_NEW_PASS')

    const doc = accountModelFactory.documentify(this)
    if (!doc) throw new KoaError(`No document.`, 404, 'DOCUMENT_NOT_FOUND')

    if (!(await doc.isPasswordCorrect(currentPassword)))
      throw new KoaError('Incorrect password.', 401, 'INCORRECT_PASSWORD')

    return doc.setPassword(newPassword)
  }
}
