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
}

export const volunteerModelFactory = new ModelFactory<IVolunteer>({
  name: 'volunteer',
  paths: VolunteerPaths
})

export const VolunteerModel = volunteerModelFactory.model
