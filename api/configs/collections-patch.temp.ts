// todo: refactor this to meseret v1.8... to be executed right after the dbConn creation

import { pluralize } from 'mongoose'
// todo: also pluralize the name before generating a model in the ModelFactory

import { serverApp } from '../'

setTimeout(async () => {
  // db should be connected by now

  const dbConn = serverApp.dbConn
  const creations: Promise<any>[] = []

  for (const model of serverApp.config.models || []) {
    const name = pluralize()(model.modelName)
    creations.push(dbConn!.createCollection(name))
  }

  await Promise.all(creations)
}, 5000) // 5 seconds
