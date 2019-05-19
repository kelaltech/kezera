import { Schema } from 'mongoose'

type ObjectId = Schema.Types.ObjectId | string

export type INewsRequest = {
  title: string
  description: string
  article: string
  _by: ObjectId
}

export type INewsResponse = {
  _id: ObjectId
  _at: Date | Number
  title: string
  description: string
  article: string
  likes: ObjectId[]
  share: ObjectId[]
  comments: []
}
