import { Schema } from 'mongoose'

export type IOrganizationEventRequest = {
  _id: Schema.Types.ObjectId
  title: string
  description: string
  startDate: Date
  endDate: Date
  likes: Schema.Types.ObjectId[]
  amountOfPeople: Number
  comments: Schema.Types.ObjectId[]
  location?: string
  interestedVolunteers: Schema.Types.ObjectId[]
  goingVolunteers: Schema.Types.ObjectId[]
  attendedVolunteers: Schema.Types.ObjectId[]
}

export type IOrganizationEventResponse = {
  _id: Schema.Types.ObjectId
  title: string
  description: string
  startDate: Date
  endDate: Date
  likes: Schema.Types.ObjectId[]
  amountOfPeople: Number
  comments: Schema.Types.ObjectId[]
  location?: string
  interestedVolunteers: Schema.Types.ObjectId[]
  goingVolunteers: Schema.Types.ObjectId[]
  attendedVolunteers: Schema.Types.ObjectId[]
}

export type IVolunteerEventRequest = {
  title: string
  description: string
  startDate: Date
  endDate: Date
  likes: Schema.Types.ObjectId[]
  amountOfPeople: Number
  comments: Schema.Types.ObjectId[]
  location?: string
  interestedVolunteers: Schema.Types.ObjectId[]
}

export type IVolunteerEventResponse = {
  _id: string
  likes: Schema.Types.ObjectId[]
  comments: Schema.Types.ObjectId[]
  interestedVolunteers: Schema.Types.ObjectId[]
  goingVolunteers: Schema.Types.ObjectId[]
}
