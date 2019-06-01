import React, { useEffect, useState } from 'react'

import axios from 'axios'

import './request-card.scss'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { View } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import FundMobileCard from '../../components/fund-card/fund-card'

export default function FundMobileList() {
  const [funds, setFunds] = useState<any[]>([])
  const { loading, t } = useLocale(['request'])

  let { account } = useAccountState()
  useEffect(() => {
    axios
      .get('/api/request/list')
      .then(res => {
        setFunds(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    loading || (
      <View>
        {funds.map((fund, i) => (
          <FundMobileCard request={fund} key={i} />
        ))}
      </View>
    )
  )
}
