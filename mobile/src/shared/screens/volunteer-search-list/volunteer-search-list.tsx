import React, { useEffect, useState } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { RefreshControl, ScrollView } from 'react-native'
import Header from '../../../shared/components/header/header'
import useLocale from '../../hooks/use-locale/use-locale'
import Axios from 'axios'
import VolunteerCard from '../../../shared/components/volunteer-card/volunteer-card'

function VolunteerSearchList({ navigation }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['volunteer'])
  const [volunteer, setVolunteer] = useState([])
  const [error, setError] = useState<any>()
  const term = navigation.getParam('term')
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    searchVolunteer()
  }, [])

  const searchVolunteer = () => {
    setRefresh(true)
    Axios.get(`/api/volunteer/search?term=${term}`)
      .then(data => data.data)
      .then(o => {
        setVolunteer(o)
        setRefresh(false)
      })
      .catch(e => {
        setError(e)
      })
  }
  return (
    loading || (
      <>
        <Header showBack title={'Volunteer search list'} />
        <ScrollView
          style={{
            marginBottom: 10
          }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={searchVolunteer} />
          }
        >
          {volunteer.map((o, k) => (
            <VolunteerCard {...o} />
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(VolunteerSearchList)
