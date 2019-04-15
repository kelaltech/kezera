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

export default function RequestList() {
  const [requests, setRequests] = useState<any[]>([])

  const { account } = useAccountState()
  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(res => {
        setRequests(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const handleSearch = () => {
    ;<>
      <RequestSearch />
    </>
  }

  return (
    <Page>
      <Block>
        <Flex>
          <Title size={'XL'}>Requests</Title>
          <FlexSpacer />
          {(account &&
            (account.role === 'VOLUNTEER' && (
              <Button to={`/organization/request/add`}>Make a Request</Button>
            ))) ||
            (account && account.role === 'ORGANIZATION' && (
              <Input
                onChange={handleSearch}
                placeholder={'Search Requests'}
                className={'white'}
              />
            ))}
        </Flex>
      </Block>

      <Content transparent size={'3XL'}>
        <hr />
      </Content>

      {!requests.length && <Content size={'3XL'}>No requests found.</Content>}

      <Yoga size={'3XL'} maxCol={3} className={'request-list-yoga'}>
        {requests.map((request, i) => {
          switch (request.type) {
            case 'Fundraising':
              return <FundCard key={i} request={request} />
            case 'Task':
              return <TaskCard key={i} request={request} />
          }
        })}
      </Yoga>
    </Page>
  )
}
