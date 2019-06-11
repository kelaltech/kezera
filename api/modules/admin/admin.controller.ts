import { AccountModel, IAccount } from '../../models/account/account.model'
import { edit, get, list, remove, search } from '../../lib/crud'
import { EventModel } from '../../models/event/event.model'
import { NewsModel } from '../../models/news/news.model'
import { TaskModel } from '../../models/task/task.model'
import { MaterialModel } from '../../models/material/material.model'
import { Schema } from 'mongoose'
import { IAccountRequest, IAccountResponse } from '../account/account.apiv'
import {
  IOrganization,
  OrganizationModel
} from '../../models/organization/organization.model'
import { AccountController } from '../account/account.controller'
import { ClientSession } from 'mongodb'
import { FundraisingModel } from '../../models/fundraising/fundraising.model'
import { Stream } from 'stream'
import { Grid } from '../../lib/grid'
import { serverApp } from '../..'
import { ParameterizedContext } from 'koa'
import { accountDocumentToPublicResponse } from '../account/account.filter'
import { organizationDocumentToResponse } from '../organization/organization.filter'

export async function GetAllVerifiers(): Promise<any[]> {
  let veriifiers = await list(AccountModel, {
    preQuery: model => model.find({ role: 'VERIFIER' })
  })
  return Promise.all(
    veriifiers.map(verifier => accountDocumentToPublicResponse(verifier))
  )
}
export async function AddVerifier(
  session: ClientSession,
  body: IAccountRequest,
  ctx: ParameterizedContext<any, any>
): Promise<IAccountResponse> {
  let controller = new AccountController()
  let acc = await controller.add(session, body, 'ACTIVE', 'VERIFIER')
  session && (await session.commitTransaction())
  acc = await controller.addPhoto(undefined, ctx, await get(AccountModel, acc._id))
  return acc
}

export async function GetVerifierPicture(id: Schema.Types.ObjectId): Promise<Stream> {
  return new Grid(serverApp, AccountModel, id).get()
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

export async function GetVerifier(id: Schema.Types.ObjectId): Promise<any> {
  return accountDocumentToPublicResponse(await get(AccountModel, id))
}

export async function GetAllOrganizations(): Promise<Number> {
  const organizations = await list(AccountModel, {
    preQuery: model => model.find({ role: 'ORGANIZATION' })
  })
  return organizations.length
}

export async function SearchVerifier(term: string): Promise<any> {
  console.log(term)
  let result = await search(AccountModel, term)
  return Promise.all(result.map(result => accountDocumentToPublicResponse(result)))
  // return await Promise.all(((await search(AccountModel, term))).map(accountDocumentToPublicResponse)
}

export async function GetGovernmentalOrganization(): Promise<Number> {
  let gov = await list(OrganizationModel, {
    preQuery: model => model.find({ type: 'GOVERNMENTAL' })
  })
  return gov.length
}
export async function GetNGOOrganization(): Promise<Number> {
  let ngo = await list(OrganizationModel, {
    preQuery: model => model.find({ type: 'NGO' })
  })
  return ngo.length
}

export async function GetPrivateOrganization(): Promise<Number> {
  let pri = await list(OrganizationModel, {
    preQuery: model => model.find({ type: 'PRIVATE' })
  })
  return pri.length
}

export async function GetHospital(): Promise<Number> {
  let hosp = await list(OrganizationModel, {
    preQuery: model => model.find({ type: 'HOSPITAL' })
  })
  return hosp.length
}

export async function GetVolunteers(): Promise<Number> {
  let vol = await list(AccountModel, {
    preQuery: model => model.find({ role: 'VOLUNTEER' })
  })
  return vol.length
}

export async function GetEvents(): Promise<Number> {
  let event = await list(EventModel)
  return event.length
}

export async function GetNews(): Promise<Number> {
  let news = await list(NewsModel)
  return news.length
}

export async function GetMaterial(): Promise<Number> {
  let mat = await list(MaterialModel)
  return mat.length
}

export async function GetTask(): Promise<Number> {
  let task = await list(TaskModel)
  return task.length
}

export async function GetFundraising(): Promise<Number> {
  let fund = await list(FundraisingModel)
  return fund.length
}

export async function GetOrgan(): Promise<Number> {
  let organ = await list(TaskModel)
  return organ.length
}

export async function GetNewsLikes(): Promise<Number> {
  let news = await list(NewsModel)
  let likes: number = 0
  for (let i = 0; i < news.length; i++) {
    likes = likes + news[i].likes.length
  }
  return likes
}

export async function GetNewsComments(): Promise<Number> {
  let news = await list(NewsModel)
  let comments: number = 0
  for (let i = 0; i < news.length; i++) {
    comments = comments + news[i].comments.length
  }
  return comments
}

export async function GetEventsComments(): Promise<Number> {
  let events = await list(EventModel)
  let comments: number = 0
  for (let i = 0; i < events.length; i++) {
    comments = comments + events[i].comments.length
  }
  return comments
}

export async function GetEventsLikes(): Promise<Number> {
  let events = await list(EventModel)
  let likes: number = 0
  for (let i = 0; i < events.length; i++) {
    likes = likes + events[i].likes.length
  }
  return likes
}

export async function GetEventsGoingUsers(): Promise<Number> {
  let events = await list(EventModel)
  let going: number = 0
  for (let i = 0; i < events.length; i++) {
    going = going + events[i].goingVolunteers.length
  }
  return going
}

export async function GetEventsInterestedUsers(): Promise<Number> {
  let events = await list(EventModel)
  let interested: number = 0
  for (let i = 0; i < events.length; i++) {
    interested = interested + events[i].interestedVolunteers.length
  }
  return interested
}

export async function GetEventsAttendedUsers(): Promise<Number> {
  let events = await list(EventModel)
  let attended: number = 0
  for (let i = 0; i < events.length; i++) {
    attended = attended + events[i].attendedVolunteers.length
  }
  return attended
}

export async function GetJoinedDates(): Promise<Number[]> {
  let vol: IAccount[] = await list(AccountModel, {
    preQuery: model => model.find({ role: 'VOLUNTEER' })
  })
  let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let i = 0; i < vol.length; i++) {
    months[new Date(vol[i]._at!).getMonth()]++
  }
  return months
}

export async function GetVerifiedOrganization(
  id: Schema.Types.ObjectId
): Promise<IAccount[]> {
  const org: IOrganization[] = await list(OrganizationModel, {
    preQuery: model => model.find({ verifier: id })
  })
  let acc: IAccount[] = []
  for (let i = 0; i < org.length; i++) {
    acc.push(await get(AccountModel, org[i].account))
  }
  console.log(acc)
  return acc
}

export async function GetOrganizationLocationStatistics(): Promise<any> {
  console.log('This fetches all the organization location and displays it.')
  let organizations = await list(OrganizationModel)
  let counter: number[] = []
  let location: any = []
  for (let i = 0; i < organizations.length; i++) {
    let org = await organizationDocumentToResponse(organizations[i])
    if (!location.includes(org.locations[0].address)) {
      location.push(org.locations[0].address)
      counter.push(1)
    } else {
      counter[location.indexOf(org.locations[0].address)]++
    }
  }
  return locationStatistics(location, counter, organizations.length)
}

function locationStatistics(location: string[], counter: number[], total: number) {
  let organizations: ILocation[] = []
  for (let i = 0; i < location.length; i++) {
    organizations.push({ address: location[i], percent: (counter[i] / total) * 100 })
  }
  return organizations
}

interface ILocation {
  address: string | undefined
  percent: number
}
