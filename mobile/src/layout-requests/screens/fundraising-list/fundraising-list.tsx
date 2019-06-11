import React, { useState } from 'react'

import { View, Text, ScrollView, RefreshControl } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import Axios from 'axios'
import RequestCard from '../../components/request-card/request-card'

function FundraisingList({  }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['request']) //todo change language mapping

  const [refresh, setRefresh] = useState<boolean>(false)
  const [funds, setFunds] = useState([])
  const [error, setError] = useState<any>(null)

  const listFunds = () => {
    setRefresh(true)
    Axios.get(`/api/request/list/bytype?type=Fundraising`)
      .then(funds => {
        setFunds(funds.data)
        setRefresh(false)
      })
      .catch(e => {
        setError(e)
      })
  }

  return (
    loading || (
      <>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={listFunds} />}
        >
          {funds.map((f, k) => (
            <RequestCard key={k} {...f} />
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(FundraisingList)
