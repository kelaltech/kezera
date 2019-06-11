import { ModelFactory } from 'meseret'
import { Schema } from 'mongoose'

import { taskPaths } from './task.path'

type ObjectId = Schema.Types.ObjectId | string

export type ITaskType =
  | 'Advocacy & Human Rights '
  | 'Animal'
  | 'Art & Culture'
  | 'Children & Youth'
  | 'Community'
  | 'Computer & Technology'
  | 'Crisis Support'
  | 'Disaster Relief'
  | 'Education & Literacy'
  | 'Hunger'
  | 'Faith-Based'
  | 'Environment'
  | 'Employment'
  | 'Emergency & Safety'
  | 'Media & Broadcasting'
  | 'People with Disability'
  | 'Politics'
  | 'Women'
  | 'Sport & Recreation'
export const taskTypes: ITaskType[] = [
  'Advocacy & Human Rights ',
  'Animal',
  'Art & Culture',
  'Children & Youth',
  'Community',
  'Computer & Technology',
  'Crisis Support',
  'Disaster Relief',
  'Education & Literacy',
  'Hunger',
  'Faith-Based',
  'Environment',
  'Employment',
  'Emergency & Safety',
  'Media & Broadcasting',
  'People with Disability',
  'Politics',
  'Women',
  'Sport & Recreation'
]

export interface ITask {
  _at?: Date | number

  request: ObjectId // request

  type: ITaskType

  startDate: Date | number
  endDate: Date | number

  numberNeeded: number
}

export const taskModelFactory = new ModelFactory<ITask>({
  name: 'task',
  paths: taskPaths,
  options: { typeKey: '$type' }
})

export const TaskModel = taskModelFactory.model

TaskModel.collection.ensureIndex(
  {
    type: 'text',
    numberNeeded: 'text',

    'request.name': 'text',
    'request.description': 'text',
    'request.status': 'text',
    'request.type': 'text',
    'request.donations.volunteer.username': 'text',
    'request.donations.volunteer.account.displayName': 'text',
    'request.donations.volunteer.account.email': 'text',
    'request.donations.volunteer.account.phoneNumber': 'text',
    'request.donations.data': 'text'
  },
  {
    name: 'request_search',
    weights: {
      // default is 1
      type: 15,
      numberNeeded: 5,

      'request.name': 10,
      'request.description': 5,
      'request.status': 15,
      'request.type': 15
    }
  }
)
