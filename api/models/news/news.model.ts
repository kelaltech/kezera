import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { newPaths } from './news.path'

type ObjectId = Schema.Types.ObjectId | string | number

export interface INews extends Document {
  _at: Date | number
  title: string
  description: string
  article: string
  likes: ObjectId[]
  comments: ObjectId[]
}

export const newsModelFactory = new ModelFactory<INews>({
  name: 'news',
  paths: newPaths
})

export const newsModel = newsModelFactory.model
