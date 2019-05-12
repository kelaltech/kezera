// todo: refactor this to meseret v1.8... to be executed right after the dbConn creation

import { pluralize } from 'mongoose'
// todo: also pluralize the name before generating a model in the ModelFactory

import { serverApp } from '../'

setTimeout(async () => {
  // db should be connected by now

  try {
    for (const model of serverApp.config.models || []) {
      serverApp.dbConn!.collection(pluralize()(model.modelName))
    }
  } catch (e) {
    console.error(e)
  }
}, 5000) // 5 seconds
