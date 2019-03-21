import '../../index'
import { IAccountRequest } from './account.apiv'
import { transact } from '../../lib/transact'
import { AccountController } from './account.controller'

const data: IAccountRequest = {
  email: 'abebe@gmail.com',
  password: 'Abebe1234',

  displayName: 'Abebe Balcha',
  phoneNumber: '+251 911 123 456'
}

setTimeout(() => {
  // db should be connected by now

  transact(session => {
    return new AccountController().add(session, data, 'VOLUNTEER')
  })
    .then(() => {
      console.log(`\nTransaction completed successfully.`)
      process.exit(0)
    })
    .catch(console.error)
}, 5000) // 5 seconds
