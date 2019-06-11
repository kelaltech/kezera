import { IRequestStatus, IRequestType } from '../../models/request/request.model'

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
      fundraising: any
    }
  | IRequestRequestCommons & {
      type: 'Material'
      material: any
    }
  | IRequestRequestCommons & {
      type: 'Organ'

      organ: any
    }
  | IRequestRequestCommons & {
      type: 'Task'
      task: any
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
      fundraising: any
    }
  | IRequestResponseCommons & {
      type: 'Material'
      material: any
    }
  | IRequestResponseCommons & {
      type: 'Organ'
      organ: any
    }
  | IRequestResponseCommons & {
      type: 'Task'
      task: any
    }
