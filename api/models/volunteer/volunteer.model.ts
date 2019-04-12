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
    certificate: boolean,
    event: boolean,
    material:boolean,
    task:boolean,
    money:boolean
  }
}

export const volunteerModelFactory = new ModelFactory<IVolunteer>({
  name: 'volunteer',
  paths: VolunteerPaths
})

export const VolunteerModel = volunteerModelFactory.model
