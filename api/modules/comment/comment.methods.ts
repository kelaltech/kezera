import { Schema } from 'mongoose'
import { AccountModel, IAccount } from '../../models/account/account.model'
import { get } from '../../lib/crud'
import { IComment, commentModel } from '../../models/comment/comment.model'

export async function getName(id: Schema.Types.ObjectId): Promise<String> {
  let user: IAccount = await get(AccountModel, id)
  return user.displayName
}
export async function getComment(id: any): Promise<IComment[]> {
  let comments: any = JSON.parse(JSON.stringify(await get(commentModel, id)))
  comments['displayName'] = await getName(comments._by)
  return comments
}
