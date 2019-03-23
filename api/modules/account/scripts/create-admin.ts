import '../../..'
import { IAccountRequest } from '../account.apiv'
import { transact } from '../../../lib/transact'
import { AccountController } from '../account.controller'

const data: IAccountRequest = {
  email: 'admin@spva.com',
  password: 'Pass1234',

  displayName: 'SPVA Admin',
  phoneNumber: '+251 923 772 839'
}

setTimeout(() => {
  // db should be connected by now

  transact(session => {
    // todo: switch to the admin module, when ready
    return new AccountController().add(session, data, 'ADMIN')
  })
    .then(() => {
      console.log(`\nTransaction completed successfully.`)
      process.exit(0)
    })
    .catch(console.error)
}, 5000) // 5 seconds
