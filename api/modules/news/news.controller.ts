import { add, edit, get, list, remove, search } from '../../lib/crud'
import { Grid } from '../../lib/grid'
import { NewsModel } from '../../models/news/news.model'
import { commentModel } from '../../models/comment/comment.model'
import { IAccount } from '../../models/account/account.model'
import { Document, Schema } from 'mongoose'
import { serverApp } from '../../index'
import { Stream } from 'stream'

type ObjectId = Schema.Types.ObjectId | string

export async function addNews(data: any): Promise<any> {
  return await add(NewsModel, data)
}

export async function getAllNews(since: number, count: number): Promise<any> {
  return await list(NewsModel, { since: since, count: count })
}

export async function listAllNews() {
  const docs = await list(NewsModel)

  return docs
}
export async function addNewsWithPicture(
  data: any,
  account: Document & IAccount,
  pic: Stream
): Promise<any> {
  data._by = await account._id
  const news = await add(NewsModel, data)

  const grid = new Grid(serverApp, NewsModel, news._id)

  await grid.set(pic)

  return news
}

export async function addPictureForNews(pic: Stream, _newsId: ObjectId): Promise<any> {
  const grid = new Grid(serverApp, NewsModel, _newsId)

  return await grid.set(pic)
}

export async function getPictureFromNews(
  _newsId: ObjectId,
  pictureID = 'default'
): Promise<any> {
  const grid = new Grid(serverApp, NewsModel, _newsId)

  return await grid.get(pictureID)
}

export async function getLikes(_newsId: ObjectId): Promise<any> {
  // const docs = (await get(NewsModel,_newsId)).populate('likes')
  const docs = await get(NewsModel, _newsId, {
    postQuery: q => q.populate('likes')
  })

  return docs.likes
}
export async function toggleLike(
  _newsId: ObjectId,
  account: Document & IAccount
): Promise<{
  likes: number
}> {
  const doc = await get(NewsModel, _newsId)

  if (doc.likes.length == 0) {
    doc.likes.push(account._id)
    await doc.save()
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
  await doc.save()

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
  return await edit(NewsModel, _newsId, data)
}

export async function searchNews(term: string): Promise<any> {
  return search(NewsModel, term)
}
export async function recentNews(count: number): Promise<any> {
  return await list(NewsModel, {
    since: Date.now(),
    count
  })
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
  account: Document & IAccount,
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
