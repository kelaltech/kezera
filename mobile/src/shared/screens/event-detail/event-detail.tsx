import React, { useEffect, useState } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { View, Image, Text, ScrollView, Switch } from 'react-native'
import { Button, Divider, Icon } from 'react-native-elements'
import { eventDetailStyle } from './event-detail-style'
import useLocale from '../../hooks/use-locale/use-locale'
import Axios from 'axios'
import { Comment } from './comment/comment'
import { baseUrl } from '../../../app/configs/setup-axios'
import { HandleLike } from '../../../layout-default/stores/events/events.action'
import { IVolunteerEventResponse } from '../../../../../api/modules/event/event.apiv'
import { useAccountState } from '../../../app/stores/account/account-provider'

const primary = '#3f51b5'

interface IEventDetailProps {}

type Params = {
  id?: string
}

function EventDetail({ navigation }: NavigationInjectedProps<Params>) {
  let id = navigation.getParam('id')
  const { loading, t } = useLocale(['event'])
  let [liked, setLiked] = useState(false)
  let [going, setGoing] = useState(false)
  let [event, setEvent] = useState()
  let { account } = useAccountState()

  let FetchEvent = function() {
    Axios.get(`/api/event/${id}`)
      .then(resp => {
        console.log(resp.data)
        setEvent(resp.data)
      })
      .catch(console.error)
  }

  let HandleLike = function(id: string) {
    Axios.put('/api/event/' + id + '/like')
      .then(() => FetchEvent())
      .catch()
  }

  let HandleGoing = function(id: string) {
    Axios.put(`/api/event/${id}/going`)
      .then(resp => setGoing(!going))
      .catch(console.error)
  }

  let IsGoing = function() {
    Axios.get(`/api/event/${id}/isGoing`)
      .then(resp => setGoing(resp.data.going))
      .catch()
  }

  let IsLiked = function() {
    Axios.get(`/api/event/${id}/isLiked`)
      .then(resp => setLiked(resp.data.liked))
      .catch()
  }

  useEffect(() => {
    FetchEvent()
    IsGoing()
    IsLiked()
  }, [])

  return (
    loading ||
    (event ? (
      <>
        <ScrollView>
          <Image
            source={{ uri: `${baseUrl}/api/event/${id}/picture` }}
            style={eventDetailStyle.eventImage}
          />
          <View style={eventDetailStyle.right}>
            <View style={eventDetailStyle.toggleLike}>
              <Icon
                name={'heart'}
                type={'font-awesome'}
                color={event.likes.includes(account!._id) ? 'red' : 'white'}
                onPress={() => {
                  setLiked(!liked)
                  HandleLike(id!.toString())
                }}
              />
            </View>
          </View>
          <View>
            <View style={eventDetailStyle.inlineBlock}>
              <Text style={eventDetailStyle.eventTitle}> {event.title}</Text>
              <View style={eventDetailStyle.eventAttendSwitch}>
                <Text style={eventDetailStyle.eventAttendText}>{t`event:going`}</Text>
                <Switch
                  value={going}
                  onValueChange={() => {
                    setGoing(!going)
                    HandleGoing(id!.toString())
                  }}
                />
              </View>
            </View>
            <View>
              <Text style={eventDetailStyle.eventDescription}> {event.description}</Text>
            </View>
            <View style={eventDetailStyle.inlineBlock}>
              <View style={eventDetailStyle.iconFields}>
                <Icon name={'calendar'} type={'font-awesome'} color={primary} size={18} />
                <Text> &emsp;{new Date(event.startDate).toLocaleDateString()} </Text>
              </View>
              <View style={eventDetailStyle.iconFields}>
                <Icon
                  name="heart"
                  type="font-awesome"
                  size={18}
                  color={primary}
                  onPress={() => console.log('hello')}
                />
                <Text>
                  {' '}
                  &emsp;{' '}
                  {event.likes.length == 0 ? (
                    <Text>&nbsp;</Text>
                  ) : (
                    event.likes.length
                  )}{' '}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={eventDetailStyle.iconFields}>
                <Icon name={'users'} type={'font-awesome'} color={primary} size={18} />
                <Text>&emsp; {event.amountOfPeople} </Text>
              </View>
              <View style={eventDetailStyle.iconFields}>
                <Icon
                  name={'map-marker'}
                  type={'font-awesome'}
                  color={primary}
                  size={18}
                />
                <Text>&emsp; {event.location} </Text>
              </View>
            </View>
          </View>
          <Divider />
          <View>
            <Text style={eventDetailStyle.commentText}> {t`event:comments`} </Text>
            <Comment id={id} />
          </View>
        </ScrollView>
      </>
    ) : (
      <Text> {t`event:event not found`} </Text>
    ))
  )
}

export default withNavigation(EventDetail)
