import React, { useEffect, useState } from 'react'

import axios from 'axios'

import './request-card.scss'
import FundCard from '../fundraising/fund-card'
import TaskCard from '../task/task-card'

interface IRequestCard {
  request: any
}
function RequestCard({ request }: IRequestCard) {
  switch (request.type) {
    case 'Fundraising':
      return <FundCard request={request} />
    case 'Task':
      return <TaskCard request={request} />
    case 'Material':
      return <TaskCard request={request} />
    case 'Organ':
      return <TaskCard request={request} />
    default:
      return null
  }
}
export default RequestCard
