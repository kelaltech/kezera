import { IActivityTypes } from '../../models/activity/activity.model'
import { Schema } from 'mongoose'

export interface IActivityResponse {
  activityTypes: IActivityTypes
  data: string
  date: Date
  accountId: Schema.Types.ObjectId
}
