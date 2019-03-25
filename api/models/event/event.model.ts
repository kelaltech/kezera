import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { eventPaths } from './event.path'

type ObjectId = Schema.Types.ObjectId | string | number

export interface IEvent extends Document {
  _at: Date | number
  title: string
  description: string
  interestedVolunteers: ObjectId[]
  attendedVolunteers: ObjectId[]
  goinngVolunteers: ObjectId[]
  startDate: Date
  endDate: Date
  location: string
  likes: ObjectId[]
  comments: ObjectId[]
  organizationId: ObjectId
  amountOfPeople: Number
}

export const eventModelFactory = new ModelFactory<IEvent>({
  name: 'event',
  paths: eventPaths
})

eventModelFactory.schema.index({
  title: 'text',
  description: 'text'
})
export const EventModel = eventModelFactory.model
