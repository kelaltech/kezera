import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { commentPaths } from './comment.path'

type ObjectId = Schema.Types.ObjectId

export interface IComment extends Document {
  _at: Date | number
  _by: ObjectId
  body: String
  replies: ObjectId[]
}

export const commentModelFactory = new ModelFactory<IComment>({
  name: 'comment',
  paths: commentPaths
})

export const commentModel = commentModelFactory.model
