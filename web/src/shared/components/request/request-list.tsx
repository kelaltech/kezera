import React, { useEffect, useState } from 'react'
import { Content, Title, Yoga } from 'gerami'
import axios from 'axios'

import './request-card.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import RequestCard from '../../../shared/components/request/request-card'
import RichPage from '../rich-page/rich-page'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        title={t`request:donation-requests`}
        actions={
          (account &&
            ((account.role === 'VOLUNTEER' && [{}]) ||
              (account.role === 'ORGANIZATION' && [
                {
                  to: '/organization/request/add',
                  primary: true,
                  children: (
                    <>
                      <FontAwesomeIcon
                        icon={'plus'}
                        className={'margin-right-normal font-S'}
                      />
                      {t`request:make-a-request`}
                    </>
                  )
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
