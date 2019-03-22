import { add, get, list } from '../../lib/crud'
import { NewsModel } from '../../models/news/news.model'
import { IAccount } from '../../models/account/account.model'
import { Schema } from 'mongoose'

type ObjectId = Schema.Types.ObjectId | string

export async function addNews(data: any, account: IAccount): Promise<any> {
  data._by = account._id
  const doc = await add(NewsModel, data)

  return doc
}

export async function getAllNews(since: number, count: number): Promise<any> {
  const docs = await list(NewsModel, { since: since, count: count })

  return docs
}

export async function toggleLike(
  _newsId: ObjectId,
  account: IAccount
): Promise<{
  likes: number
}> {
  const doc = await get(NewsModel, _newsId)

  if (doc.likes.length == 0) {
    doc.likes.push(account._id)
    return {
      likes: doc.likes.length
    }
  }

  for (let i = 0; i < doc.likes.length; i++) {
    if (account._id.toString() === doc.likes[i].toString()) {
      await doc.likes.splice(i, 1)
    } else {
      doc.likes.push(account._id)
    }
  }

  return { likes: doc.likes.length }
}
