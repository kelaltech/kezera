import React, { useEffect, useState } from 'react'

import axios from 'axios'

import './request-card.scss'
import TaskCard from '../task-card/task-card'

interface IRequestCard {
  request: any
}
function RequestMobileCard({ request }: IRequestCard) {
  switch (request.type) {
    case 'Organ':
      return <TaskCard request={request} />
    case 'Task':
      return <TaskCard request={request} />
    default:
      return null
  }
}
export default RequestMobileCard
