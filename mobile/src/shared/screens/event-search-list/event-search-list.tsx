import React, { useEffect, useState } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { ScrollView } from 'react-native'
import Header from '../../../shared/components/header/header'
import useLocale from '../../hooks/use-locale/use-locale'
import Axios from 'axios'
import { EventCardSecond } from '../../components/event-card/event-card'
function EventSearchList({ navigation }: NavigationInjectedProps) {
  const { loading, t } = useLocale(['volunteer'])
  const [event, setEvent] = useState([])
  const [error, setError] = useState<any>()
  const term = navigation.getParam('term')

  useEffect(() => {
    Axios.get(`/api/event/search?term=${term}`)
      .then(data => data.data)
      .then(e => {
        setEvent(e)
      })
      .catch(e => {
        setError(e)
      })
  }, [])

  return (
    loading || (
      <>
        <Header showBack title={'Event search list'} />
        <ScrollView
          style={{
            marginBottom: 10
          }}
        >
          {event.map((e, k) => (
            <EventCardSecond event={e} key={k} />
          ))}
        </ScrollView>
      </>
    )
  )
}

export default withNavigation(EventSearchList)
