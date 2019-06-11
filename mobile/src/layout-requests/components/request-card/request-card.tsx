import React, { useEffect, useState } from 'react'

import axios from 'axios'

import TaskCard from '../task-card/task-card'
import FundMobileCard from '../fund-card/fund-card'

interface IRequestCard {
  request: any
}
function RequestMobileCard({ request }: IRequestCard) {
  switch (request.type) {
    case 'Organ':
      return <FundMobileCard request={request} />
    case 'Task':
      return <TaskCard request={request} />
    default:
      return null
  }
}
export default RequestMobileCard
