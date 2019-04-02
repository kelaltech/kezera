import { AccountModel, IAccount } from '../../models/account/account.model'
import { edit, get, list, remove } from '../../lib/crud'
import { EventModel, IEvent } from '../../models/event/event.model'
import { INews, NewsModel } from '../../models/news/news.model'
import { ITask, TaskModel } from '../../models/task/task.model'
import { IMaterial, MaterialModel } from '../../models/material/material.model'
import { Schema } from 'mongoose'
import { AccountController } from '../account/account.controller'
import { IAccountRequest } from '../account/account.apiv'
import {
  IOrganization,
  OrganizationModel
} from '../../models/organization/organization.model'

export async function GetAllVerifiers(): Promise<IAccount[]> {
  return await list(AccountModel, {
    preQuery: model => model.find({ role: 'VERIFIERS' })
  })
}

export async function AddVerifier(body: IAccountRequest): Promise<void> {
  await new AccountController().add(undefined, body)
}

export async function DeleteVerifier(id: Schema.Types.ObjectId): Promise<void> {
  await remove(AccountModel, id)
}

export async function UpdateVerifier(
  id: Schema.Types.ObjectId,
  body: IAccountRequest
): Promise<void> {
  await edit(AccountModel, id, body)
}

export async function GetVerifier(id: Schema.Types.ObjectId): Promise<IAccount> {
  return get(AccountModel, id)
}
export async function GetAllOrganizations(): Promise<IOrganization[]> {
  return list(OrganizationModel, {
    preQuery: model => model.find({ role: 'ORGANIZATION' })
  })
}

export async function GetGovernmentalOrganization(): Promise<IOrganization[]> {
  return list(OrganizationModel, {
    preQuery: model => model.find({ type: 'GOVERNMENTAL' })
  })
}
export async function GetNGOOrganization(): Promise<IOrganization[]> {
  return list(OrganizationModel, {
    preQuery: model => model.find({ type: 'NGO' })
  })
}

export async function GetPrivateOrganization(): Promise<IOrganization[]> {
  return list(OrganizationModel, {
    preQuery: model => model.find({ type: 'PRIVATE' })
  })
}

export async function GetHospital(): Promise<IOrganization[]> {
  return list(OrganizationModel, {
    preQuery: model => model.find({ type: 'HOSPITAL' })
  })
}

export async function GetVolunteers(): Promise<IAccount[]> {
  return list(AccountModel, {
    preQuery: model => model.find({ role: 'VOLUNTEER' })
  })
}

export async function GetEvents(): Promise<IEvent[]> {
  return list(EventModel)
}

export async function GetNews(): Promise<INews[]> {
  return list(NewsModel)
}

export async function GetMaterial(): Promise<IMaterial[]> {
  return list(MaterialModel)
}

export async function GetTask(): Promise<ITask[]> {
  return list(TaskModel)
}

export async function GetFundraising(): Promise<ITask[]> {
  // todo change these
  return list(TaskModel)
}

export async function GetOrgan(): Promise<ITask[]> {
  // todo change these
  return list(TaskModel)
}
