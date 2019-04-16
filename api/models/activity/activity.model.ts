import { ActivityPaths } from './activity.path'
import { ModelFactory } from 'meseret/lib'
import { Schema } from 'mongoose'

export type IActivityTypes =
  | 'COMMENT_NEWS'
  | 'COMMENT_EVENT'
  | 'LIKE_NEWS'
  | 'LIKE_EVENT'
  | 'DONATE'
  | 'SUBSCRIBE'
  | 'EVENT_GOING'
  | 'EVENT_ATTEND'
  | 'PROFILE_CHANGED'
  | 'INTEREST_EVENT'
  | 'INTEREST_NEWS'

export const activityData = [
  'Commented on an event',
  'Liked an event',
  'Liked a news',
  'Donated to an organization',
  'Subscribed to be an organization',
  'Going to an event',
  'Attended in an event',
  'Updated  account information'
]

export const activityTypes: IActivityTypes[] = [
  'COMMENT_EVENT',
  'COMMENT_NEWS',
  'LIKE_NEWS',
  'LIKE_EVENT',
  'DONATE',
  'SUBSCRIBE',
  'EVENT_GOING',
  'EVENT_ATTEND',
  'PROFILE_CHANGED'
]

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
  activityTypes: IActivityTypes
  data: string
  date: Date
  accountId: ObjectId
}

export const activityModelFactory = new ModelFactory<IActivity>({
  name: 'activity',
  paths: ActivityPaths
})

export const ActivitySchema = activityModelFactory.schema

export const ActivityModel = activityModelFactory.model
