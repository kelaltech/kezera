import { Document, Schema } from 'mongoose'

type ObjectId = Schema.Types.ObjectId

export interface ICommentResponse extends Document {
  _by: ObjectId
  body: string
  replies: ObjectId[]
}
export interface ICommentRequest extends Document {
  _at: Date
  _by: ObjectId
  body: string
  displayName: String
  replies: ObjectId[]
}
