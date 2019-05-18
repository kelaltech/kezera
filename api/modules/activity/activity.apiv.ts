import {
  IVerifierActivity,
  IOrganizationActivity,
  IVolunteerActivity
} from '../../models/activity/activity.model'
import { Schema } from 'mongoose'

export interface IActivityResponse {
  _at: Date
  activityTypes: IOrganizationActivity | IVolunteerActivity | IVerifierActivity
  data: string
  link: string
  accountId: Schema.Types.ObjectId
}

export interface IActivityRequest {
  activityTypes: IOrganizationActivity | IVolunteerActivity | IVerifierActivity
  data: string
  link: string
  accountId: Schema.Types.ObjectId
}
