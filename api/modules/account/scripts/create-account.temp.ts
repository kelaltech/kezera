import '../../..'
import { IAccountRequest } from '../account.apiv'
import { transact } from '../../../lib/transact'
import { AccountController } from '../account.controller'

const data: IAccountRequest = {
  email: 'Temp@gmail.com',
  password: 'Temp1234',

  displayName: 'Temp Account',
  phoneNumber: '+251 914 857496'
}

setTimeout(() => {
  // db should be connected by now

  transact(session => {
    return new AccountController().add(session, data, 'ACTIVE', 'VERIFIER')
  })
    .then(() => {
      console.log(`\nTransaction completed successfully.`)
      process.exit(0)
    })
    .catch(console.error)
}, 5000) // 5 seconds
