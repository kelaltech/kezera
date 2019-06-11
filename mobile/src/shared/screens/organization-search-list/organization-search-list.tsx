import React, { useEffect, useState } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { RefreshControl, ScrollView } from 'react-native'
import Header from '../../../shared/components/header/header'
import useLocale from '../../hooks/use-locale/use-locale'
import Axios from 'axios'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'

function OrganizationSearchList({ navigation }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['volunteer'])
  const [organization, setOrganization] = useState([])
  const [error, setError] = useState<any>()
  const term = navigation.getParam('term')
  const [refresh, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    searchOrganization()
  }, [])

  const searchOrganization = () => {
    setRefreshing(true)
    Axios.get(`/api/organization/search?term=${term}`)
      .then(data => data.data)
      .then(o => {
        setOrganization(o)
        setRefreshing(false)
      })
      .catch(e => {
        setError(e)
      })
  }
  return (
    loading || (
      <>
        <Header showBack title={'Organization search list'} />
        <ScrollView
          style={{
            marginBottom: 10
          }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={searchOrganization} />
          }
        >
          {organization.map((o, k) => (
            <OrganizationCard {...o} />
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(OrganizationSearchList)
