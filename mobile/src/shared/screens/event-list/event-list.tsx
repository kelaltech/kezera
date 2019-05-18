import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import values from '../../../assets/styles/values'
import { Icon } from 'react-native-elements'
import Header from '../../components/header/header'
import { func } from 'prop-types'
import Axios from 'axios'
import EventCard, { EventCardSecond } from '../../components/event-card/event-card'
import useLocale from '../../hooks/use-locale/use-locale'

type params = {
  url: string
  title: string
}
function EventList({ navigation }: NavigationInjectedProps<params>) {
  const url = navigation.getParam('url')
  const title = navigation.getParam('title')
  const [events, setEvents] = useState([])
  const { loading, t } = useLocale(['event'])
  let listEvents = function() {
    Axios.get(url)
      .then(resp => {
        setEvents(resp.data)
      })
      .catch(console.error)
  }
  useEffect(() => {
    listEvents()
  }, [])
  return (
    loading || (
      <>
        <Header title={t`event:${title}`} />
        <ScrollView style={{ backgroundColor: 'rgb(240,240,240)' }}>
          {events.map((event, index) => (
            <EventCardSecond key={index} event={event} />
          ))}
        </ScrollView>
      </>
    )
  )
}

EventList.navigationOptions = {
  tabBarIcon: ({ focused }: any) => (
    <Icon
      name={'event'}
      color={focused ? values.color.secondary : values.color.primary}
    />
  )
}

export default withNavigation(EventList)
