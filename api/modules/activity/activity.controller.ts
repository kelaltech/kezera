import { ActivityModel, IActivity } from '../../models/activity/activity.model'
import { add, list } from '../../lib/crud'
import { Schema } from 'mongoose'

export async function AddActivity(body: IActivity): Promise<IActivity> {
  return await add(ActivityModel, body)
}

export async function GetActivity(id: Schema.Types.ObjectId): Promise<IActivity[]> {
  let activities = await list(ActivityModel, {
    preQuery: model => model.find({ accountId: id })
  })
  return activities
}
