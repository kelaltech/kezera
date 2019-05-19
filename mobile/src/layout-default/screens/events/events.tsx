import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { Divider } from 'react-native-elements'
import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { eventStyle } from './events-style'
import values from '../../../assets/styles/values'
import { Icon } from 'react-native-elements'
import Header from '../../../shared/components/header/header'
import { func } from 'prop-types'
import Axios from 'axios'
import EventCard, {
  EventCardSecond
} from '../../../shared/components/event-card/event-card'

interface IEventsProps {}

function Events({ navigation }: NavigationInjectedProps) {
  const [events, setEvents] = useState([])
  const { loading, t } = useLocale(['event'])
  return (
    loading || (
      <>
        <Header title={t`event:events`} />
        <ScrollView style={{ backgroundColor: 'rgb(240,240,240)' }}>
          <UpcomingEvents navigation={navigation} />
          <Divider style={{ margin: 10 }} />
          <NewEvents navigation={navigation} />
          <Divider style={{ margin: 10 }} />
          <EventsNear navigation={navigation} />
        </ScrollView>
      </>
    )
  )
}

function EventsNear({ navigation }: NavigationInjectedProps) {
  let [events, setEvents] = useState([])
  const { loading, t } = useLocale(['event'])

  useEffect(() => {
    Axios.get('/api/event/all')
      .then(resp => {
        setEvents(resp.data)
        console.log(resp.data)
      })
      .catch(console.error)
  }, [])
  return (
    <>
      <View style={eventStyle.sectionTitle}>
        <Text style={eventStyle.sections}> {t`events near you`}</Text>
        <TouchableWithoutFeedback
          onPress={() => console.log('Clicked view more')}
          style={{ width: 80, justifyContent: 'flex-end', padding: 5 }}
        >
          <Text
            onPress={() => {
              navigation!.dispatch(
                NavigationActions.navigate({
                  routeName: 'EventList',
                  params: { url: '/api/event/all', title: 'Nearby events' }
                })
              )
            }}
            style={eventStyle.viewMoreButton}
          >
            {t`view more`}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal={true}>
        {events.map((event, index) => (
          <EventCard event={event} key={index} />
        ))}
      </ScrollView>
    </>
  )
}

function NewEvents({ navigation }: NavigationInjectedProps) {
  let [events, setEvents] = useState([])
  const { loading, t } = useLocale(['event'])
  useEffect(() => {
    Axios.get('/api/event/latest')
      .then(resp => {
        setEvents(resp.data)
        console.log(resp.data)
      })
      .catch(console.error)
  }, [])
  return (
    <>
      <View style={eventStyle.sectionTitle}>
        <Text style={eventStyle.sections}> {t`new events`} </Text>
        <TouchableWithoutFeedback
          onPress={() => console.log('Clicked view more')}
          style={{ width: 80, justifyContent: 'flex-end', padding: 5 }}
        >
          <Text
            onPress={() => {
              navigation!.dispatch(
                NavigationActions.navigate({
                  routeName: 'EventList',
                  params: { url: '/api/event/latest', title: 'New events' }
                })
              )
            }}
            style={eventStyle.viewMoreButton}
          >
            {t`view more`}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      {events.map((event, index) => (
        <EventCardSecond event={event} key={index} />
      ))}
    </>
  )
}

function UpcomingEvents({ navigation }: NavigationInjectedProps) {
  let [events, setEvents] = useState([])
  const { loading, t } = useLocale(['event'])
  //todo change this
  useEffect(() => {
    Axios.get('/api/event/upcoming')
      .then(resp => {
        setEvents(resp.data)
        console.log(resp.data)
      })
      .catch(console.error)
  }, [])
  return (
    <>
      <View style={eventStyle.sectionTitle}>
        <Text style={eventStyle.sections}> {t`upcoming events`} </Text>
        <TouchableWithoutFeedback
          onPress={() => console.log('Clicked view more')}
          style={{ width: 80, justifyContent: 'flex-end' }}
        >
          <Text
            style={eventStyle.viewMoreButton}
            onPress={() => {
              navigation!.dispatch(
                NavigationActions.navigate({
                  routeName: 'EventList',
                  params: {
                    url: '/api/event/upcoming',
                    title: t`upcoming events:upcoming events`
                  }
                })
              )
            }}
          >
            {t`view more`}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal={true}>
        {events.map((event, index) => (
          <EventCard event={event} key={index} />
        ))}
      </ScrollView>
    </>
  )
}

Events.navigationOptions = {
  tabBarIcon: ({ focused }: any) => (
    <Icon
      name={'event'}
      color={focused ? values.color.secondary : values.color.primary}
    />
  )
}

export default withNavigation(Events)
