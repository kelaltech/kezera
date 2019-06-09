import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { VolunteerPaths } from './volunteer.path'

type ObjectId = Schema.Types.ObjectId | string | number

export interface IVolunteer extends Document {
  _at: Date | number
  account: ObjectId
  country: string
  gender: string
  location: string
  username: string
  privacy: {
    certificate: boolean
    event: boolean
    material: boolean
    task: boolean
    money: boolean
  }
  portfolio: {
    events: ObjectId[]
    tasks: ObjectId[]
    certificate: ObjectId[]
    material: ObjectId[]
    money: ObjectId[]
    organ: ObjectId[]
  }
}

export const volunteerModelFactory = new ModelFactory<IVolunteer>({
  name: 'volunteer',
  paths: VolunteerPaths
})

export const VolunteerModel = volunteerModelFactory.model

VolunteerModel.collection.ensureIndex(
  {
    'account.displayName': 'text',
    'account.email' : 'text',
    'account.phoneNumber': 'text'
  },
  {
    name: 'volunteer_search'
  }
)
