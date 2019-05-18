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
  _by: ObjectId
  share:ObjectId[]
}

export const newsModelFactory = new ModelFactory<INews>({
  name: 'news',
  paths: newPaths
})

export const NewsModel = newsModelFactory.model

NewsModel.collection.ensureIndex(
  {
    title: 'text',
    description: 'text',
    article: 'text'
  },
  {
    name: 'news_search',
    weights: {
      title: 10,
      description: 8,
      article: 7
    }
  }
)
