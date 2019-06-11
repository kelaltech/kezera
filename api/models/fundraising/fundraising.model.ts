import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { fundraisingPaths } from './fundraising.path'

type ObjectId = Schema.Types.ObjectId | string

export interface IFundraising {
  _at?: Date | number

  request: ObjectId // request

  target: number
}

export const fundraisingModelFactory = new ModelFactory<IFundraising>({
  name: 'fundraising',
  paths: fundraisingPaths,
  options: { typeKey: '$type' }
})

export const FundraisingModel = fundraisingModelFactory.model

FundraisingModel.collection.ensureIndex(
  {
    target: 'text',

    'request.name': 'text',
    'request.description': 'text',
    'request.status': 'text',
    'request.type': 'text',
    'request.donations.volunteer.username': 'text',
    'request.donations.volunteer.account.displayName': 'text',
    'request.donations.volunteer.account.email': 'text',
    'request.donations.volunteer.account.phoneNumber': 'text',
    'request.donations.data': 'text'
  },
  {
    name: 'request_search',
    weights: {
      // default is 1
      target: 15,

      'request.name': 10,
      'request.description': 5,
      'request.status': 15,
      'request.type': 15
    }
  }
)
