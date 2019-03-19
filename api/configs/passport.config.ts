import * as KoaPassport from 'koa-passport'
import * as PassportLocal from 'passport-local'
import { Document } from 'mongoose'

import { AccountModel, IAccount } from '../models/account/account.model'
import { KoaError } from '../lib/koa-error'

// account serialization and deserialization in/from context.state.user
KoaPassport.serializeUser((account: Document & IAccount, done) => done(null, account._id))
KoaPassport.deserializeUser((_id, done) => {
  AccountModel.findById(_id, (err, account) => done(err || null, account || undefined))
})

// configure local strategy
KoaPassport.use(
  'local',
  new PassportLocal.Strategy({ usernameField: 'email' }, (email, password, done) => {
    if (!email)
      return done(new KoaError('"email" parameter is not found.', 400, 'NO_EMAIL'))
    if (!password)
      return done(new KoaError('"password" parameter is not found.', 400, 'NO_PASSWORD'))

    AccountModel.findOne({ email }, (err, account) => {
      if (err) return done(err)
      if (!account) return done(null, false)

      // check password
      account
        .isPasswordCorrect(password)
        .then(correct => done(null, correct ? account : false))
        .catch(reason => done(reason))
    })
  })
)
