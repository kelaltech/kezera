import { ModelFactory } from 'meseret'
import { Document, Schema } from 'mongoose'
import { donationPaths } from './donation.path'

type ObjectId = Schema.Types.ObjectId

export type IDonationType = 'Fundraising' | 'Material' | 'Organ' | 'Task'

export const donationTypes: IDonationType[] = ['Fundraising', 'Material', 'Organ', 'Task']

export interface IDonation extends Document {
  _at: Date | number
  _by: ObjectId
  name: String
  description: String
  startDate: Date | number
  endDate?: Date | number
  type: IDonationType
}

export const donationModelFactory = new ModelFactory<IDonation>({
  name: 'donation',
  paths: donationPaths
})

export const donationModel = donationModelFactory.model
