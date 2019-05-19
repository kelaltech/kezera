import { ActivityPaths } from './activity.path'
import { ModelFactory } from 'meseret/lib'
import { Schema } from 'mongoose'

export const volunteerActivity: IVolunteerActivity[] = [
  'SUBSCRIPTION',
  'GOING_TO_EVENT',
  'DONATION',
  'PROFILE_CHANGED'
]

export type IVolunteerActivity =
  | 'SUBSCRIPTION'
  | 'GOING_TO_EVENT'
  | 'DONATION'
  | 'PROFILE_CHANGED'

export const organizationActivity: IOrganizationActivity[] = [
  'CREATED_EVENT',
  'EDITED_EVENT',
  'CREATE_NEWS',
  'EDITED_NEWS',
  'PROFILE_CHANGED',
  'REQUESTED_DONATION'
]

export type IOrganizationActivity =
  | 'CREATED_EVENT'
  | 'EDITED_EVENT'
  | 'CREATE_NEWS'
  | 'EDITED_NEWS'
  | 'PROFILE_CHANGED'
  | 'REQUESTED_DONATION'

export const verifierActivity = [
  'VERIFIED_ORGANIZATION',
  'REMOVED_ORGANIZATION',
  'PROFILE_CHANGED',
  'SPAM_HANDLED'
]

export type IVerifierActivity = [
  'VERIFIED_ORGANIZATION' | 'REMOVED_ORGANIZATION' | 'PROFILE_CHANGED' | 'SPAM_HANDLED'
]

type ObjectId = Schema.Types.ObjectId

export interface IActivity {
  __v: number
  _at: Date
  activityTypes?: IVolunteerActivity | IOrganizationActivity | IVerifierActivity
  data: string
  link: string
  accountId: ObjectId
}

export const activityModelFactory = new ModelFactory<IActivity>({
  name: 'activity',
  paths: ActivityPaths
})

export const ActivitySchema = activityModelFactory.schema

export const ActivityModel = activityModelFactory.model
