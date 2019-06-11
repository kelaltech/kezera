import React, { useEffect, useState } from 'react'
import {
  Block,
  Button,
  Content,
  Flex,
  FlexSpacer,
  Input,
  Page,
  Title,
  Yoga
} from 'gerami'
import axios from 'axios'

import './request-card.scss'
import RequestCard from '../../../shared/components/request/request-card'
import promo from '../../../assets/images/login/promo-1.jpg'
import FundCard from '../fundraising/fund-card'
import TaskCard from '../task/task-card'
import RichPage from '../rich-page/rich-page'
import Search from '../search/search'
import { useAccountState } from '../../../app/stores/account/account-provider'
import RequestSearch from '../../pages/request-search/request-search'
import useLocale from '../../hooks/use-locale/use-locale'

export default function RequestList() {
  const [requests, setRequests] = useState<any[]>([])
  const { loading, t } = useLocale(['request'])

  let { account } = useAccountState()
  useEffect(() => {
    axios
      .get('/api/request/list-mine')
      .then(res => {
        setRequests(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    loading ||
    (!requests ? null : (
      <RichPage
        title={<Title size={'XL'}>{t`request:request`}</Title>}
        actions={
          (account &&
            ((account.role === 'VOLUNTEER' && [{}]) ||
              (account.role === 'ORGANIZATION' && [
                {
                  to: '/organization/request/add',
                  children: <>{t`request:make-a-request`}</>
                }
              ]))) ||
          []
        }
      >
        {!requests.length && (
          <Content size={'3XL'}>{t`request:no-request-found`}</Content>
        )}

        <Yoga size={'3XL'} maxCol={3} className={'request-list-yoga yoga-in-rich-page'}>
          {requests.map((request, i) => (
            <RequestCard request={request} key={i} />
          ))}
        </Yoga>
      </RichPage>
    ))
  )
}
