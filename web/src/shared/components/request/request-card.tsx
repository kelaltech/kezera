import React, { useEffect, useState } from 'react'

import axios from 'axios'

import './request-card.scss'
import FundCard from '../fundraising/fund-card'
import TaskCard from '../task/task-card'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../hooks/use-locale/use-locale'
import { Anchor, Button, Card, Content, Flex, FlexSpacer, Title } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IRequestCard {
  request: any
  type?:string
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

// @ts-ignore
export default RequestCard
