import { edit } from '../lib/crud'
import { RequestModel } from '../models/request/request.model'
import { transact } from '../lib/transact'

setInterval(async () => {
  console.log(`Running 'close-expired-requests' runner.`)
  await transact(session =>
    edit(
      RequestModel,
      null,
      { status: 'CLOSED' },
      {
        session,
        conditions: { expires: { $lte: Date.now() } }
      },
      { overwrite: false }
    )
  )
}, 1000 * 60 * 15)
