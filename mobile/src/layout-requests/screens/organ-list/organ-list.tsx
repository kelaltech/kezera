import React, { useEffect, useState } from 'react'

import { View, Text, ScrollView, RefreshControl } from 'react-native'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import Axios from 'axios'
import RequestCard from '../../components/request-card/request-card'

function OrganList({  }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['request']) //todo change language mapping

  const [organs, setOrgans] = useState([])
  const [refresh, setRefresh] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    listOrgans()
  }, [])

  const listOrgans = () => {
    setRefresh(true)
    Axios.get(`/api/request/list/bytype?type=Organ`)
      .then(organs => {
        setOrgans(organs.data)
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
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={listOrgans} />}
        >
          {organs.map((o, k) => (
            <RequestCard key={k} {...o} />
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(OrganList)
