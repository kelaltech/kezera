import { randomBytes } from 'crypto'
import { IKey, KeyModel, IKeyPurpose } from './key.model'
import { add } from '../../lib/crud'
import { KoaError } from '../../lib/koa-error'
import { ClientSession } from 'mongoose'

export const keyStatics = {
  async cleanup({ session }: { session?: ClientSession } = {}): Promise<void> {
    await KeyModel.findOneAndRemove({ expiry: { $lt: Date.now() } }).session(
      session || null
    )
  },

  async add(
    purpose: IKeyPurpose,
    email: string,
    length = 64,
    expiry?: Date,
    { session }: { session?: ClientSession } = {}
  ): Promise<string> {
    await this.cleanup({ session })

    const data: IKey = new KeyModel({
      purpose,
      email,
      randomKey: randomBytes(length).toString('hex'),
      expiry
    })
    return (await add(KeyModel, data, { session })).randomKey
  },

  async match(
    purpose: IKeyPurpose,
    email: string,
    randomKey: string,
    { session }: { session?: ClientSession } = {}
  ): Promise<boolean> {
    await this.cleanup({ session })

    if (!purpose) throw new KoaError('"purpose" parameter not found.', 500, 'NO_PURPOSE')
    if (!email) throw new KoaError('"email" parameter not found.', 400, 'NO_EMAIL')
    if (!randomKey)
      throw new KoaError('"randomKey" parameter not found.', 400, 'NO_RANDOM_KEY')

    return !!(await KeyModel.findOne({ purpose, randomKey, email }).session(
      session || null
    ))
  },

  async delete(
    randomKey: string,
    { session }: { session?: ClientSession } = {}
  ): Promise<void> {
    await KeyModel.cleanup({ session })

    if (!randomKey)
      throw new KoaError('"randomKey" parameter not found.', 400, 'RANDOM_KEY_INVALID')

    await KeyModel.findOneAndRemove({ randomKey }).session(session || null)
  }
}
