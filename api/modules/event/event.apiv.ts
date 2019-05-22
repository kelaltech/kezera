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
  location: {
    geo: {
      type: 'Point'
      coordinates: [number, number]
    }
    address?: string
  }
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
  location: {
    geo: {
      type: 'Point'
      coordinates: [number, number]
    }
    address?: string
  }
  interestedVolunteers: Schema.Types.ObjectId[]
  goingVolunteers: Schema.Types.ObjectId[]
  attendedVolunteers: Schema.Types.ObjectId[]
}

export type IVolunteerEventRequest = {
  _id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  likes: Schema.Types.ObjectId[]
  amountOfPeople: Number
  comments: Schema.Types.ObjectId[]
  location: {
    geo: {
      type: 'Point'
      coordinates: [number, number]
    }
    address?: string
  }
  interestedVolunteers: Schema.Types.ObjectId[]
  organizationId: string
}

export type IVolunteerEventResponse = {
  _id: string
  likes: Schema.Types.ObjectId[]
  comments: Schema.Types.ObjectId[]
  interestedVolunteers: Schema.Types.ObjectId[]
  goingVolunteers: Schema.Types.ObjectId[]
}
