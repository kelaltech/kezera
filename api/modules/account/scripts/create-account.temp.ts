import '../../..'
import { IAccountRequest } from '../account.apiv'
import { transact } from '../../../lib/transact'
import { AccountController } from '../account.controller'

const data: IAccountRequest = {
  email: 'Kaleab@gmail.com',
  password: 'Kaleab1234',

  displayName: 'Kaleab Sereke',
  phoneNumber: '+251 924 322 656'
}

setTimeout(() => {
  // db should be connected by now

  transact(session => {
    return new AccountController().add(session, data, 'ACTIVE', 'VOLUNTEER')
  })
    .then(() => {
      console.log(`\nTransaction completed successfully.`)
      process.exit(0)
    })
    .catch(console.error)
}, 5000) // 5 seconds
