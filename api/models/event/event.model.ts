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
  goingVolunteers: ObjectId[]
  startDate: Date
  endDate: Date
  mapURL: string
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

eventModelFactory.model.collection.ensureIndex({
  title: 'text',
  description: 'text'
})
export const EventModel = eventModelFactory.model
