import {
  activityData,
  ActivityModel,
  activityTypes,
  IActivity,
  IActivityTypes
} from '../../models/activity/activity.model'
import { add, list } from '../../lib/crud'
import { Schema } from 'mongoose'

export async function AddActivity(
  id: Schema.Types.ObjectId,
  type: IActivityTypes
): Promise<void> {
  await add(ActivityModel, {
    activityType: type,
    accountId: id,
    data: activityData[activityTypes.indexOf(type)]
  })
}

export async function GetActivity(id: Schema.Types.ObjectId): Promise<IActivity[]> {
  let activities = await list(ActivityModel, {
    preQuery: model => model.find({ accountId: id })
  })
  return activities
}
