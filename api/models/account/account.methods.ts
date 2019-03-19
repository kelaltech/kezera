import { compare, hash } from 'bcrypt'

import { accountModelFactory } from './account.model'
import { KoaError } from '../../lib/koa-error'

export const accountMethods = {
  async isPasswordCorrect(pass: string): Promise<boolean> {
    if (!pass) throw new KoaError('"pass" parameter not found', 400, 'NO_PASS')

    const doc = accountModelFactory.documentify(this)
    if (!doc) throw new KoaError(`No document.`, 404, 'DOCUMENT_NOT_FOUND')

    if (!doc.password) throw new KoaError('Password not set.', 500, 'PASSWORD_NOT_SET')

    return compare(pass, doc.password)
  },

  async setPassword(pass: string): Promise<void> {
    if (!pass) throw new KoaError('"pass" parameter not found', 400, 'NO_PASS')

    if (pass.length > 72)
      throw new KoaError(
        'Password cannot be longer than 72 characters.',
        400,
        'PASSWORD_VALIDATION_FAILED'
      )

    if (!pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
      throw new KoaError(
        'Password needs to be at least 8 characters long and contain at least one of capital letters, small letters and numbers each.',
        400,
        'PASSWORD_VALIDATION_FAILED'
      )

    const doc = accountModelFactory.documentify(this)
    if (!doc) throw new KoaError(`No document.`, 404, 'DOCUMENT_NOT_FOUND')

    doc.password = await hash(pass, 14)

    await doc.save()
  },

  async changePassword(oldPass: string, newPass: string): Promise<void> {
    if (!oldPass) throw new KoaError('"oldPass" parameter not found', 400, 'NO_OLD_PASS')
    if (!newPass) throw new KoaError('"newPass" parameter not found', 400, 'NO_NEW_PASS')

    const doc = accountModelFactory.documentify(this)
    if (!doc) throw new KoaError(`No document.`, 404, 'DOCUMENT_NOT_FOUND')

    if (!(await doc.isPasswordCorrect(oldPass)))
      throw new KoaError('Incorrect password.', 401, 'INCORRECT_PASSWORD')

    return doc.setPassword(newPass)
  }
}
