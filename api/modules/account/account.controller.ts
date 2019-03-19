import { ClientSession } from 'mongoose'

import { KoaController } from '../../lib/koa-controller'

export class AccountController extends KoaController {
  async test(session: ClientSession): Promise<string> {
    console.log('In transaction?', session.inTransaction())
    return 'Hello, World!'
  }
}
