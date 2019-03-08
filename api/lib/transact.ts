import { ClientSession } from 'mongoose'
import { serverApp } from '..'
import { KoaError } from './koa-error'

export async function transact<ReturnType>(
  operation: (session: ClientSession) => ReturnType
) {
  // get db connection
  const db = serverApp.dbConn
  if (!db) throw new KoaError('Database connection not found.', 500, 'NO_DB_CONN')

  // start session and transaction
  const session = await db.startSession()
  session.startTransaction()

  try {
    // try to execute operation
    const returnValue = await operation(session)

    // commit transaction and end session
    if (session.inTransaction()) await session.commitTransaction()
    await session.endSession()

    // return the executed operation's returned value
    return returnValue
  } catch (error) {
    // if error:

    // abort transaction and end session
    if (session.inTransaction()) await session.abortTransaction()
    await session.endSession()

    // rethrow error
    throw error
  }
}
