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
  likes: ObjectId[]
  comments: ObjectId[]
  organizationId: ObjectId
}

export const eventModelFactory = new ModelFactory<IEvent>({
  name: 'event',
  paths: eventPaths
})

eventModelFactory.schema.index({
  Title: 'text',
  Description: 'text'
})
export const EventModel = eventModelFactory.model
