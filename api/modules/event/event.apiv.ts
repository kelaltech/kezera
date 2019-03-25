import { Schema } from 'mongoose'

export type IEventRequest = {
  title: string
  description: string
  startDate: Date
  endtDate: Date
  likes: Schema.Types.ObjectId[]
  amountOfPeople: Number
  comments: Schema.Types.ObjectId[]
  location?: string
  interestedVolunteers: Schema.Types.ObjectId[]
}

export type IEventResponse = {
  _id: string

  title: string
  description: string
  startDate: Date
  amountOfPeople: Number
  attendedVolunteers: Schema.Types.ObjectId[]
  endtDate: Date
  likes: Schema.Types.ObjectId[]
  comments: Schema.Types.ObjectId[]
  location?: string
  interestedVolunteers: Schema.Types.ObjectId[]
}
