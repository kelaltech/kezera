import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Icon, Image } from 'react-native-elements'
import eventCardStyle from './event-card-style'
import {
  NavigationActions,
  NavigationParams,
  NavigationProp,
  NavigationScreenProp,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import EventDetail from '../../screens/event-detail/event-detail'
import {
  IVolunteerEventRequest,
  IVolunteerEventResponse
} from '../../../../../api/modules/event/event.apiv'
import Axios from 'axios'
import { baseUrl } from '../../../app/configs/setup-axios'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'

const primary = '#3f51b5'

type Params = {
  id?: string
}
interface IEventCardProps {
  event: IVolunteerEventRequest
  key?: number
}
/*

const events=[
  {
    image:"../../../assets/images/event.jpg",
    title:"Jorka",
    description:"this is the description of the event. this is the description of the event. this is the description of the event. this is the description of the event." +
                "this is the description of the event. this is the description of the event. this is the description of the event.",
    likes:1,
    interested:20,
    location:"Addis Ababa",
    startDate:"Friday, May 2 2019",
    endDate:"25 May,2019"
  }
]
*/

function EventCard(props: NavigationInjectedProps<Params> & IEventCardProps) {
  return (
    <View>
      <Card
        image={{ uri: `${baseUrl}/api/event/${props.event._id}/picture` }}
        containerStyle={{ width: 200, margin: 10 }}
      >
        <Text
          style={eventCardStyle.eventTitle}
          onPress={() => {
            props.navigation!.dispatch(
              NavigationActions.navigate({
                routeName: 'EventDetail',
                params: { id: props.event._id }
              })
            )
          }}
        >
          {' '}
          {props.event.title}{' '}
        </Text>
        <View>
          <View style={eventCardStyle.eventFields}>
            <Text style={eventCardStyle.fontSmall}>
              {' '}
              {new Date(props.event.startDate).toLocaleDateString()}
            </Text>
            <Text style={eventCardStyle.fontSmall}>
              at{' '}
              {props.event.location!.address
                ? props.event.location!.address
                : props.event.location!.geo.coordinates}
            </Text>
          </View>

          <View style={eventCardStyle.eventActionButtons}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon
                size={12}
                name="heart"
                type="font-awesome"
                color={primary}
                onPress={() => console.log('hello')}
              />
              <Text style={eventCardStyle.fontSmall}>
                {' '}
                {props.event.likes.length == 0 ? '' : props.event.likes.length}{' '}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon
                size={15}
                name="mood"
                type="material"
                color={primary}
                onPress={() => console.log('hello')}
              />
              <Text style={eventCardStyle.fontSmall}>
                {' '}
                {props.event.interestedVolunteers.length == 0
                  ? ''
                  : props.event.interestedVolunteers.length}{' '}
              </Text>
            </View>
            <View>
              <Icon
                size={15}
                name="comments"
                type="font-awesome"
                color={primary}
                onPress={() => console.log('hello')}
              />
            </View>
          </View>
        </View>
      </Card>
    </View>
  )
}

function EventCardSecondx(props: NavigationInjectedProps<Params> & IEventCardProps) {
  let [name, setName] = useState('')
  let getOrganization = function(id: string) {
    Axios.get(`${baseUrl}/api/organization/get/${id}`)
      .then(resp => {
        const org: IOrganizationResponse = resp.data
        setName(org.account.displayName)
      })
      .catch(console.error)
  }
  useEffect(() => {
    // getOrganization(props.event.organizationId);
  }, [])
  return (
    <View style={second.cardContainer}>
      <View style={second.card}>
        <Image
          source={{ uri: `${baseUrl}/api/event/${props.event._id}/picture` }}
          style={eventCardStyle.eventCardImage}
        />
        <Text style={second.text} onPress={() => {}}>
          {' '}
          &nbsp; {props.event.title}
        </Text>
        <Text
          style={second.eventTitle}
          onPress={() => {
            props.navigation!.dispatch(
              NavigationActions.navigate({
                routeName: 'EventDetail',
                params: { id: props.event._id }
              })
            )
          }}
        >
          {' '}
          {props.event.title}
        </Text>
        <Text>&emsp; {new Date(props.event.startDate).toLocaleDateString()}</Text>
      </View>
    </View>
  )
}

function getOrganizationName(eventId: string) {
  Axios.get('/api/account/')
}

export default withNavigation(EventCard)
export const EventCardSecond = withNavigation(EventCardSecondx)

const second = StyleSheet.create({
  eventTitle: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '400',
    color: primary
  },
  card: {
    margin: 5,
    borderRadius: 5
  },
  cardContainer: {
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    position: 'relative',
    marginTop: -30,
    color: 'white',
    borderColor: 'black'
  }
})
