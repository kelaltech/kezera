import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { Button, Card, Divider, Icon } from 'react-native-elements'
import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'
import Axios from 'axios'
import { useAccountState } from '../../../app/stores/account/account-provider'
import { style } from './organization-detail-style'
import values from '../../../assets/styles/values'
import { IOrganizationResponse } from '../../../../../api/modules/organization/organization.apiv'
import { eventStyle } from '../../../layout-default/screens/events/events-style'
import { EventCardSecond } from '../../components/event-card/event-card'
import { baseUrl } from '../../../app/configs/setup-axios'

type param = {
  id: string
}

function OrganizationDetail({ navigation }: NavigationInjectedProps<param>) {
  const { loading, t } = useLocale(['organization'])
  let id = navigation.getParam('id')
  let [organization, setOrganization] = useState()
  let { account } = useAccountState()
  let vol = function() {}
  let FetchOrganization = function() {
    Axios.get('/api/organization/get/' + id)
      .then(resp => {
        setOrganization(resp.data)
      })
      .catch(console.error)
  }

  let handleSubscribe = (): void => {
    Axios.put(`/api/organization/subscribe/${organization!._id}`, undefined, {
      withCredentials: true
    })
      .then()
      .then()
      .catch()
  }

  let handleUnsubscribe = (): void => {
    Axios.put(`/api/organization/unsubscribe/${id}`, undefined, {
      withCredentials: true
    })
      .then()
      .catch(console.error)
  }

  useEffect(() => {
    FetchOrganization()
  }, [])

  return (
    loading || (
      <ScrollView>
        <Header title={t`organization:organization`} showBack />
        <Image
          source={{ uri: `${baseUrl}${organization.logoUri}` }}
          style={{ width: Dimensions.get('screen').width, height: 150 }}
        />
        <View style={style.inline}>
          <View style={style.nameContainer}>
            <Text style={style.title}> {organization.account.displayName} </Text>
          </View>
          <View style={style.subscribedButtonContainer}>
            <TouchableHighlight
              onPress={() => {
                handleUnsubscribe()
              }}
            >
              <Text> {t`organization:unsubscribe`} </Text>
            </TouchableHighlight>
          </View>
        </View>
        <Bio organization={organization} />

        <Contact organization={organization} />

        <NewEvents navigation={navigation} />

        {/*{account!.subscriptions.map(((subscription:any)=>subscription._id)).includes(organization._id)?
          []:[]}*/}
      </ScrollView>
    )
  )
}

function NewEvents({ navigation }: NavigationInjectedProps<param>) {
  let [events, setEvents] = useState([])
  const { loading, t } = useLocale(['event'])

  useEffect(() => {
    Axios.get('/api/event/organization/' + navigation.getParam('id'))
      .then(resp => {
        setEvents(resp.data)
        console.log('events: ', resp.data)
      })
      .catch(console.error)
  }, [])
  return events.length > 0 ? (
    <>
      <View style={eventStyle.sectionTitle}>
        <Text style={eventStyle.sections}> {t`events`} </Text>
        <TouchableWithoutFeedback
          onPress={() => console.log('Clicked view more')}
          style={{ width: 80, justifyContent: 'flex-end', padding: 5 }}
        >
          <Text
            onPress={() => {
              navigation!.dispatch(
                NavigationActions.navigate({
                  routeName: 'EventList',
                  params: {
                    url: '/api/event/organization/' + navigation.getParam('id'),
                    title: t`event:events`
                  }
                })
              )
            }}
            style={eventStyle.viewMoreButton}
          >
            {t`view more`}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <Divider />
      {events.map((event, index) => (
        <EventCardSecond event={event} key={index} />
      ))}
    </>
  ) : (
    <View>
      <Text style={eventStyle.sections}> {t`events`} </Text>
      <View>
        <Text>&emsp;&emsp; {t`no events found`} </Text>
      </View>
    </View>
  )
}

function Bio(props: { organization: IOrganizationResponse }) {
  const { loading, t } = useLocale(['organization'])

  return (
    <Card>
      <View style={style.descriptionContainer}>
        <View style={style.paddingBottomMeduim}>
          <Text style={style.title}> {t`organization:bio`}. </Text>
        </View>
        <Divider />
        <Text> {props.organization.bio} </Text>
      </View>
    </Card>
  )
}

function Contact(props: { organization: IOrganizationResponse }) {
  const { loading, t } = useLocale(['organization'])

  return (
    <Card>
      <View style={style.paddingMedium}>
        <View style={style.paddingBottomMeduim}>
          <Text style={style.title}> {t`contact`} </Text>
        </View>
        <Divider />
        <View style={style.contact}>
          <Icon name={'email'} color={values.color.primary} />
          <Text>
            &emsp;&emsp;
            {props.organization.account.email}
          </Text>
        </View>
        <View style={style.contact}>
          <Icon name={'phone'} color={values.color.primary} />
          <Text>
            &emsp;&emsp;
            {props.organization.account.phoneNumber}
          </Text>
        </View>
        <View style={style.contact}>
          <Icon name={'map-marker'} type={'font-awesome'} color={values.color.primary} />
          <Text>&emsp;&emsp; Addis Ababa {/*//todo change these*/}</Text>
        </View>
      </View>
    </Card>
  )
}

export default withNavigation(OrganizationDetail)
