import { add, edit, get, list, remove, search } from '../../lib/crud'
import { NewsModel } from '../../models/news/news.model'
import { commentModel } from '../../models/comment/comment.model'
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

export async function removeNews(_newsId: ObjectId): Promise<any> {
  const docs = await remove(NewsModel, _newsId)
  return docs
}

export async function getNews(_newsId: ObjectId): Promise<any> {
  const docs = await get(NewsModel, _newsId)
  return docs
}

export async function editNews(data: any, _newsId: ObjectId): Promise<any> {
  const doc = await edit(NewsModel, _newsId, data)

  return doc
}

export async function searchNews(term: string): Promise<any> {
  return search(NewsModel, term)
}

/*export async function addNewsWithPicture(
  data: any,
  orgId: Schema.Types.ObjectId,
  pic: Stream
):Promise<any>{

  data._by = await orgId
  const news = await add(NewsModel,data)
  const grid = new Grid (serverApp, NewsModel, news._id)

//TODO

}*/

export async function addComment(
  account: IAccount,
  _newsId: ObjectId,
  data: any
): Promise<any> {
  data._by = await account._id
  const comment = await add(commentModel, data)
  const news = await get(NewsModel, _newsId)

  news.comments.push(comment._id)
  await news.save()
  return comment
}
