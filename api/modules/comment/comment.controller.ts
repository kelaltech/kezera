import { IComment, commentModel } from '../../models/comment/comment.model'
import { Schema } from 'mongoose'
import { add, get, edit, remove } from '../../lib/crud'
import { KoaError } from '../../lib/koa-error'
import { getName } from './comment.methods'
import { EventModel, IEvent } from '../../models/event/event.model'
import { INews, NewsModel } from '../../models/news/news.model'

export async function addComment(
  body: IComment,
  id: Schema.Types.ObjectId,
  type: String,
  TypeID: Schema.Types.ObjectId
): Promise<void> {
  body._by = id
  let comment = await add(commentModel, body)
  if (type == 'EVENT') {
    let event: IEvent = await get(EventModel, TypeID)
    event.comments.push(comment._id)
    event.save()
  }
  if (type == 'NEWS') {
    let news: INews = await get(NewsModel, TypeID)
    news.comments.push(comment._id)
    news.save()
  }
}

export async function getComment(id: Schema.Types.ObjectId): Promise<IComment[]> {
  let comments: any = await get(commentModel, id)
  for (let i = 0; i < comments.length; i++) {
    comments[i]['displayName'] = await getName(comments[i]._by)
  }
  return comments
}

export async function updateComment(
  body: any,
  userId: Schema.Types.ObjectId,
  id: Schema.Types.ObjectId
): Promise<void> {
  let comment = await get(commentModel, id)
  if (comment._by.toString() == userId.toString()) {
    await edit(commentModel, id, body)
  } else {
    throw new KoaError('Not your comment to edit', 401)
  }
}

export async function deleteComment(
  id: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  type: string,
  typeId: String & Schema.Types.ObjectId,
  ParentId: Schema.Types.ObjectId
): Promise<void> {
  let comment = await get(commentModel, ParentId)
  if (comment._by.toString() == userId.toString()) {
    if (type == 'EVENT') {
      let event = await get(EventModel, typeId)
      await remove(commentModel, id)
      event.comments.splice(event.comments.indexOf(id), 1)
      event.save()
    }
    if (type == 'NEWS') {
      let news = await get(NewsModel, typeId)
      await remove(commentModel, id)
      news.comments.splice(news.comments.indexOf(id), 1)
      news.save()
    }
    if (type == 'REPLY') {
      await remove(commentModel, id)
      comment.replies.splice(comment.replies.indexOf(id), 1)
      comment.save()
    }
  } else {
    throw new KoaError('Not Authorized', 401)
  }
}

export async function getReplies(id: Schema.Types.ObjectId): Promise<IComment[]> {
  let comment = await get(commentModel, id)
  let replies: any = []
  for (let i = 0; i < comment.replies.length; i++) {
    replies.push(JSON.parse(JSON.stringify(await get(commentModel, comment.replies[i]))))
  }
  for (let i = 0; i < replies.length; i++) {
    replies[i]['displayName'] = await getName(replies[i]._by)
  }
  return replies
}

export async function addReply(
  id: Schema.Types.ObjectId,
  body: IComment,
  userId: Schema.Types.ObjectId
): Promise<void> {
  body._by = userId
  let reply = await add(commentModel, body)
  let comment = await get(commentModel, id)
  comment.replies.push(reply._id)
  comment.save()
}
