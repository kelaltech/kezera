import { IRequestStatus, IRequestType } from '../../models/request/request.model'
import {
  IFundraisingRequest,
  IFundraisingResponse
} from '../fundraising/fundraising.apiv'
import { IMaterialRequest, IMaterialResponse } from '../material/material.apiv'
import { IOrganRequest, IOrganResponse } from '../organ/organ.apiv'
import { ITaskRequest, ITaskResponse } from '../task/task.apiv'

export type IRequestRequestCommons = {
  name: string
  description: string

  status: IRequestStatus
  type: IRequestType

  expires?: Date | number
}

export type IRequestRequest =
  | IRequestRequestCommons & {
      type: 'Fundraising'
      fundraising: IFundraisingRequest
    }
  | IRequestRequestCommons & {
      type: 'Material'
      material: IMaterialRequest
    }
  | IRequestRequestCommons & {
      type: 'Organ'
      organ: IOrganRequest
    }
  | IRequestRequestCommons & {
      type: 'Task'
      task: ITaskRequest
    }

export type IRequestResponseCommons = {
  _id: string
  _at: Date | number

  _by: string

  name: string
  description: string

  status: IRequestStatus
  type: IRequestType

  expires?: Date | number

  donations: {
    _at: Date | number
    volunteer_id: string
    approved?: boolean
    data?: string // a number string for .type === 'Fundraising'
  }[]

  coverUri?: string
  fileUris?: string[]
}

export type IRequestResponse =
  | IRequestResponseCommons & {
      type: 'Fundraising'
      fundraising: IFundraisingResponse
    }
  | IRequestResponseCommons & {
      type: 'Material'
      material: IMaterialResponse
    }
  | IRequestResponseCommons & {
      type: 'Organ'
      organ: IOrganResponse
    }
  | IRequestResponseCommons & {
      type: 'Task'
      task: ITaskResponse
    }
