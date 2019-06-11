import React, { useEffect, useState } from 'react'
import { NavigationActions, NavigationInjectedProps, withNavigation } from 'react-navigation'
import { View, Image, Text, ScrollView, Switch, Button } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { Style } from '../detail-style'
import Axios from 'axios'
import { useAccountState } from '../../../app/stores/account/account-provider'
import useLocale from '../../../shared/hooks/use-locale/use-locale'

import { Dimensions, StyleSheet } from 'react-native'
import OrganizationCard from '../../../shared/components/organization-card/organization-card'
import classes from '../../../assets/styles/classes'
import { baseUrl } from '../../../app/configs/setup-axios'
const dimension = Dimensions.get('screen')

const primary = '#3f51b5'

type Params = {
  id?: string
}

function FundMobileDetail({ navigation }: NavigationInjectedProps<Params>) {
  let id = navigation.getParam('id')
  const { loading, t } = useLocale(['request'])
  let [request, setRequest] = useState()
  let [volunteers, setVolunteers] = useState()
  let { account } = useAccountState()

  let getGoing = function() {
    Axios.get(`/api/request/list-request-volunteers/${id}`)
      .then((resp: any) => setVolunteers(resp.data))
      .catch(console.error)
  }

  let isGoing = function() {
    Axios.put(`/api/request/toggle-request-volunteer/${id}`)
      .then(resp => setRequest(resp.data))
      .catch()
  }
  let getRequest = function() {
    Axios.get(`/api/request/${id}`)
      .then(res => {
        setRequest(res.data)
        console.log('successfully retrieved')
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    getRequest()
    getGoing()
  }, [])

  return (
    loading ||
    (request ? (
      <>
        <ScrollView>
          <Image
            source={{ uri: `${baseUrl}${request.coverUri}` }}
            style={Style.requestImage}
          />
          <View style={Style.requestTitle}>
            <Text style={Style.requestTitle}>
              {request.name}
            </Text>
          </View>
          <Divider />
          <View>
            <View style={Style.description}>
              <Text style={Style.description}>{request.description}</Text>
            </View>
          </View>
          <View style={Style.inlineBlock}>
            <Text style={Style.requestedTitle}>Requested Amount: </Text>
            <Text style={Style.requestedAmount}>{request.fundraising.amount}{' '}ETB</Text>
          </View>

          <View style={Style.button}>
            <Button title={'donate'} onPress={() => {}}>
              Donate
            </Button>
          </View>
          <Divider />

          <View style={Style.inlineBlock}>
            <Text style={Style.byTitle}>Requested By {' '}</Text>
            <Text style={classes.link} onPress={() => navigation.dispatch(
              NavigationActions.navigate({
                routeName: 'OrganizationDetail',
                params: {
                  id: request._by._id
                }
              })
            )}>{request._by.acount.displayName}</Text>
          </View>
        </ScrollView>
      </>
    ) : (
      <View>
        <Text>No Detail Available</Text>
      </View>
    ))
  )
}

export default withNavigation(FundMobileDetail)
